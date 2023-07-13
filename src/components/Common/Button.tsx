import type { Ref, ButtonHTMLAttributes } from 'react';

interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
  background?: { default: string; hover?: string; active?: string };
  reference?: Ref<HTMLButtonElement> | null | undefined;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  hidden?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type = 'button',
  reference,
  className = '',
  background,
  onClick,
  hidden = false,
  disabled = false,
}: ButtonProperties): JSX.Element {
  const bgDefault = `bg-${background?.default ?? 'purple-dark'}`;
  const bgHover = `hover:bg-${background?.hover ?? 'purple'}`;
  return (
    <button
      type={type}
      ref={reference ?? undefined}
      className={`rounded-md ${bgDefault} px-4 py-2 font-semibold text-white ${bgHover} disabled:bg-neutral-800 ${className}`}
      onClick={onClick}
      hidden={hidden}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
