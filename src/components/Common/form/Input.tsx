import type { Ref, InputHTMLAttributes } from 'react';

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  children?: JSX.Element | boolean | string;
  inputTitle?: JSX.Element | string | undefined;
  ref?: Ref<HTMLInputElement> | null | undefined;
  className?: string;
}

export default function Input({
  id,
  ref,
  type = 'text',
  placeholder,
  className = 'bg-purple-dark text-white',
  hidden = false,
  disabled = false,
  ...register
}: InputProperties): JSX.Element {
  return (
    <>
      <input
        className={`w-full rounded-lg px-4 py-2 font-medium ${className}`}
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        hidden={hidden}
        disabled={disabled}
        {...register}
      />
    </>
  );
}
