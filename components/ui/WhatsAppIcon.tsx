type WhatsAppIconProps = {
  className?: string;
  size?: number;
};

export function WhatsAppIcon({ className, size = 24 }: WhatsAppIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 32 32"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.04 4.3c-6.24 0-11.3 4.93-11.3 11.02 0 2.1.61 4.06 1.67 5.72L4.68 27.7l6.94-1.62a11.58 11.58 0 0 0 4.42.88c6.24 0 11.3-4.93 11.3-11.02S22.28 4.3 16.04 4.3Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
      />
      <path
        d="M12.58 10.2c-.26-.58-.53-.6-.78-.61h-.66c-.23 0-.6.08-.92.41-.32.34-1.2 1.15-1.2 2.8s1.23 3.25 1.4 3.47c.17.22 2.37 3.7 5.9 5.04 2.93 1.12 3.53.9 4.16.84.64-.06 2.06-.82 2.35-1.62.29-.79.29-1.47.2-1.62-.09-.14-.32-.22-.66-.39-.35-.17-2.06-.99-2.38-1.1-.32-.12-.55-.17-.78.16-.23.34-.9 1.1-1.1 1.33-.2.22-.4.25-.75.08-.35-.17-1.46-.52-2.78-1.66-1.03-.9-1.73-2-1.93-2.34-.2-.34-.02-.52.15-.69.16-.15.35-.4.52-.59.17-.2.23-.34.35-.56.12-.23.06-.42-.03-.59-.09-.17-.76-1.82-1.08-2.48Z"
        fill="currentColor"
      />
    </svg>
  );
}
