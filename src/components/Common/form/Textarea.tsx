import { forwardRef } from 'react';
import type { Ref, TextareaHTMLAttributes } from 'react';

interface TextareaProperties extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: JSX.Element | boolean | string;
  reference?: Ref<HTMLTextAreaElement> | null | undefined;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProperties>(
  ({ className, id, rows, placeholder, hidden, disabled, ...register }, reference) => {
    return (
      <>
        <textarea
          className={`w-full rounded-lg px-4 py-2 font-medium ${
            className ?? 'bg-purple-dark text-white hover:bg-purple'
          }`}
          style={{ backgroundImage: 'none' }}
          id={id}
          rows={rows}
          ref={reference}
          placeholder={placeholder}
          hidden={hidden}
          disabled={disabled}
          {...register}
        />
      </>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
