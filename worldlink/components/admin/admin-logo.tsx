import Image from "next/image";

export default function AdminLogo() {
  return (
    <Image
      src="/logo.png"
      alt="World Link Technical Training Institute Logo"
      width={180}
      height={60}
      className="h-10 w-auto object-contain"
    />
  );
} 