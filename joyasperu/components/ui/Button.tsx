import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost" | "light";
};

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-none px-6 text-sm font-semibold uppercase tracking-[0.14em] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2";
  const styles = {
    solid: "bg-[var(--ink)] text-[var(--porcelain)] hover:bg-[var(--gold)] hover:text-[var(--ink)]",
    ghost: "border border-[var(--gold)] text-[var(--ink)] hover:bg-[var(--gold-soft)]",
    light: "bg-white text-[var(--ink)] shadow-[0_18px_48px_rgba(0,0,0,0.16)] hover:bg-[var(--gold)]",
  }[variant];

  return (
    <Link className={`${base} ${styles} ${className}`} href={href} {...props}>
      {children}
    </Link>
  );
}
