import Link from "next/link";
import Image from "next/image";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <Link
      aria-label="JoyaPerú inicio"
      className={`brand-logo group block ${className}`}
      href="/"
    >
      <Image
        alt="JoyaPerú"
        className="h-auto w-36 object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.30)] transition duration-300 group-hover:scale-[1.03] md:w-52"
        height={1782}
        priority
        src="/logo/logo4sinbg.png"
        width={2400}
      />
    </Link>
  );
}
