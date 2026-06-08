import Link from "next/link";
import Image from "next/image";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link
      aria-label="JoyasPeru inicio"
      className={`group block ${className}`}
      href="/"
    >
      <Image
        alt="JoyasPeru"
        className="h-auto w-24 object-contain drop-shadow-[0_14px_32px_rgba(0,0,0,0.35)] transition duration-300 group-hover:scale-[1.03] md:w-32"
        height={1782}
        priority
        src="/logo/logo2sinbg.png"
        width={2400}
      />
    </Link>
  );
}
