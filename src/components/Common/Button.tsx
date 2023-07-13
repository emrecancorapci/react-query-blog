import type { Ref, ButtonHTMLAttributes } from 'react';

interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
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
  className,
  onClick,
  hidden = false,
  disabled = false,
}: ButtonProperties): JSX.Element {
  return (
    <button
      type={type}
      ref={reference ?? undefined}
      className={`rounded-md bg-purple px-4 py-2 font-semibold text-white hover:bg-purple-dark disabled:bg-neutral-800 ${
        className ?? ''
      }`}
      onClick={onClick}
      hidden={hidden}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
