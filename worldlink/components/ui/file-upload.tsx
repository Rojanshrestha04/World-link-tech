
"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { X, Upload, File, Image, FileText, Video, Music } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileSelect?: (file: File) => void
  onFileUpload?: (file: File, url: string) => void
  accept?: string
  maxSize?: number // in MB
  multiple?: boolean
  className?: string
  disabled?: boolean
  showPreview?: boolean
  uploadEndpoint?: string // API endpoint for file upload
}

interface UploadedFile {
  file: File
  url?: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

export default function FileUpload({
  onFileSelect,
  onFileUpload,
  accept = "*/*",
  maxSize = 10, // 10MB default
  multiple = false,
  className,
  disabled = false,
  showPreview = true,
  uploadEndpoint = "/api/upload"
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Get file icon based on file type
  const getFileIcon = (file: File) => {
    const type = file.type.toLowerCase()
    if (type.startsWith('image/')) return <Image className="h-8 w-8" />
    if (type.startsWith('video/')) return <Video className="h-8 w-8" />
    if (type.startsWith('audio/')) return <Music className="h-8 w-8" />
    if (type.includes('pdf') || type.includes('document') || type.includes('text')) 
      return <FileText className="h-8 w-8" />
    return <File className="h-8 w-8" />
  }

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Validate file
  const validateFile = (file: File): string | null => {
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`
    }
    return null
  }

  // Handle file selection
  const handleFileSelect = useCallback((selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = []
    
    Array.from(selectedFiles).forEach(file => {
      const error = validateFile(file)
      if (error) {
        newFiles.push({
          file,
          progress: 0,
          status: 'error',
          error
        })
      } else {
        newFiles.push({
          file,
          progress: 0,
          status: 'pending'
        })
        onFileSelect?.(file)
      }
    })

    if (multiple) {
      setFiles(prev => [...prev, ...newFiles])
    } else {
      setFiles(newFiles)
    }

    // Auto-upload if endpoint is provided
    if (uploadEndpoint) {
      newFiles.forEach(fileData => {
        if (fileData.status === 'pending') {
          uploadFile(fileData)
        }
      })
    }
  }, [maxSize, multiple, onFileSelect, uploadEndpoint])

  // Upload file to server
  const uploadFile = async (fileData: UploadedFile) => {
    const formData = new FormData()
    formData.append('file', fileData.file)

    try {
      setFiles(prev => prev.map(f => 
        f.file === fileData.file 
          ? { ...f, status: 'uploading', progress: 0 }
          : f
      ))

      const xhr = new XMLHttpRequest()
      
      // Track upload progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100)
          setFiles(prev => prev.map(f => 
            f.file === fileData.file 
              ? { ...f, progress }
              : f
          ))
        }
      })

      // Handle completion
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          setFiles(prev => prev.map(f => 
            f.file === fileData.file 
              ? { ...f, status: 'success', progress: 100, url: response.url }
              : f
          ))
          onFileUpload?.(fileData.file, response.url)
        } else {
          setFiles(prev => prev.map(f => 
            f.file === fileData.file 
              ? { ...f, status: 'error', error: 'Upload failed' }
              : f
          ))
        }
      })

      // Handle errors
      xhr.addEventListener('error', () => {
        setFiles(prev => prev.map(f => 
          f.file === fileData.file 
            ? { ...f, status: 'error', error: 'Upload failed' }
            : f
        ))
      })

      xhr.open('POST', uploadEndpoint)
      xhr.send(formData)
    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.file === fileData.file 
          ? { ...f, status: 'error', error: 'Upload failed' }
          : f
      ))
    }
  }

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return
    
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles)
    }
  }, [disabled, handleFileSelect])

  // Remove file
  const removeFile = (fileToRemove: UploadedFile) => {
    setFiles(prev => prev.filter(f => f.file !== fileToRemove.file))
  }

  // Open file picker
  const openFilePicker = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          if (e.target.files) {
            handleFileSelect(e.target.files)
          }
        }}
        className="hidden"
        disabled={disabled}
      />

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragOver 
            ? "border-primary bg-primary/5" 
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Drag and drop files here, or{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-medium text-primary"
              onClick={openFilePicker}
              disabled={disabled}
            >
              choose files
            </Button>
          </p>
          <p className="text-xs text-muted-foreground">
            {accept === "*/*" ? "Any file type" : `Accepted: ${accept}`}
            {maxSize && ` • Max size: ${maxSize}MB`}
            {multiple && " • Multiple files allowed"}
          </p>
        </div>
      </div>

      {/* File List */}
      {showPreview && files.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Selected Files</Label>
          <div className="space-y-2">
            {files.map((fileData, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 border rounded-lg bg-card"
              >
                <div className="text-muted-foreground">
                  {getFileIcon(fileData.file)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {fileData.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(fileData.file.size)}
                  </p>
                  
                  {/* Progress Bar */}
                  {fileData.status === 'uploading' && (
                    <Progress value={fileData.progress} className="mt-2 h-1" />
                  )}
                  
                  {/* Error Message */}
                  {fileData.status === 'error' && (
                    <p className="text-xs text-destructive mt-1">
                      {fileData.error}
                    </p>
                  )}
                  
                  {/* Success Message */}
                  {fileData.status === 'success' && (
                    <p className="text-xs text-green-600 mt-1">
                      Upload complete
                    </p>
                  )}
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2">
                  {fileData.status === 'success' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  )}
                  {fileData.status === 'error' && (
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                  )}
                  {fileData.status === 'uploading' && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(fileData)}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}