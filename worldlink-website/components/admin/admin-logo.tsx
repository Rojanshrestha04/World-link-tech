import Image from "next/image";

export default function AdminLogo() {
  return (
    <Image
      src="/logo.svg" // You might need to adjust this path to your actual logo
      alt="Admin Logo"
      width={32}
      height={32}
      className="h-8 w-8"
    />
  );
} 