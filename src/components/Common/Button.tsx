import { type Ref, type ButtonHTMLAttributes, forwardRef } from 'react';
import { Button as ButtonUI } from '../../libraries/shadcn/components/ui/button';

interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
  reference?: Ref<HTMLButtonElement> | null | undefined;
  background?: { default: string; hover?: string; active?: string };
}

const Button = forwardRef<HTMLButtonElement, ButtonProperties>(
  ({ children, type = 'button', className = '', background, ...properties }, reference) => {
    const bgDefault = `bg-${background?.default ?? 'purple-dark'}`;
    const bgHover = `hover:bg-${background?.hover ?? 'purple'}`;
    return (
      <ButtonUI
        type={type}
        ref={reference}
        className={`${bgDefault} font-semibold text-white ${bgHover} ${className}`}
        {...properties}
      >
        {children}
      </ButtonUI>
    );
  },
);

Button.displayName = 'Button';

export default Button;
