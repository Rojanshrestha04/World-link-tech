"use client"

import type { ReactNode, ReactElement } from "react"

// Export missing types for toast
export type ToastProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export type ToastActionElement = React.ReactElement;

export function Toaster() {
  // This file is now unused. Toasts are handled by sonner.
  return (
    <ToastProvider>
      {/* toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })} */}
      <ToastViewport className="fixed bottom-4 right-4 flex flex-col gap-2 z-50" />
    </ToastProvider>
  )
}

// Dummy exports to satisfy imports
export const Toast = ({ onOpenChange, ...props }: any) => <div {...props}>{props.children}</div>;
export const ToastProvider = (props: any) => <div>{props.children}</div>;
export const ToastClose = () => null;
export const ToastDescription = (props: any) => <div>{props.children}</div>;
export const ToastTitle = (props: any) => <div>{props.children}</div>;
export const ToastViewport = (props: any) => <div {...props} />;
