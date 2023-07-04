interface ButtonProperties {
  children: JSX.Element | string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
}

export default function Button({ children, type, className }: ButtonProperties): JSX.Element {
  return (
    <button
      type={type}
      className={`rounded-md bg-purple px-4 py-2 font-semibold text-white hover:bg-purple-dark ${className ?? ''}`}
    >
      {children}
    </button>
  );
}
