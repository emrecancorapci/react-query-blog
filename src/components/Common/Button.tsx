interface ButtonProperties {
  children: JSX.Element | string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
  hidden?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type,
  className,
  onClick,
  hidden = false,
  disabled = false,
}: ButtonProperties): JSX.Element {
  return (
    <button
      type={type}
      className={`rounded-md bg-purple px-4 py-2 font-semibold text-white hover:bg-purple-dark ${className ?? ''}`}
      onClick={onClick}
      hidden={hidden}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
