import { forwardRef, type InputHTMLAttributes, type Ref } from 'react';

interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
  children?: JSX.Element | boolean | string;
  inputTitle?: JSX.Element | string | undefined;
  reference?: Ref<HTMLInputElement> | null | undefined;
}

const formInputStyle = { backgroundImage: 'none' };

const Input = forwardRef<HTMLInputElement, InputProperties>(
  ({ id, type, placeholder, className, hidden = false, disabled = false, ...register }, reference) => {
    return (
      <>
        <input
          className={`w-full rounded-lg px-4 py-2 font-medium ${className ?? 'bg-purple-dark/90 text-white'}`}
          style={formInputStyle}
          id={id}
          ref={reference}
          type={type ?? 'text'}
          placeholder={placeholder}
          hidden={hidden}
          disabled={disabled}
          {...register}
        />
      </>
    );
  },
);

Input.displayName = 'Input';

export default Input;
