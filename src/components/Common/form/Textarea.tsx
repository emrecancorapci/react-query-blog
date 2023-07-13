import type { Ref, TextareaHTMLAttributes } from 'react';

interface TextareaProperties extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: JSX.Element | boolean | string;
  ref?: Ref<HTMLTextAreaElement> | null | undefined;
  inputTitle?: JSX.Element | string | undefined;
  className?: string;
}

export default function Textarea({
  inputTitle,
  id,
  ref,
  rows,
  placeholder,
  className = 'bg-purple-dark text-white',
  hidden = false,
  disabled = false,
  ...register
}: TextareaProperties): JSX.Element {
  return (
    <>
      {inputTitle !== undefined && <p className="pb-2 ps-2 font-semibold">{inputTitle}</p>}
      <textarea
        className={`w-full rounded-lg px-4 py-2 font-medium ${className}`}
        id={id}
        rows={rows}
        ref={ref}
        placeholder={placeholder}
        hidden={hidden}
        disabled={disabled}
        {...register}
      />
    </>
  );
}
