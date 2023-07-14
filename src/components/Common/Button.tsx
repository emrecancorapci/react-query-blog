import { type Ref, type ButtonHTMLAttributes, forwardRef } from 'react';
import { Button as ButtonUI } from '../../libraries/shadcn/components/ui/button';

interface ButtonProperties extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
  reference?: Ref<HTMLButtonElement> | null | undefined;
  background?: { default: string; hover?: string; active?: string };
}

const Button = forwardRef<HTMLButtonElement, ButtonProperties>(
  ({ children, type = 'button', className = '', background, ...properties }, reference) => {
    return (
      <ButtonUI
        type={type}
        ref={reference}
        className={`bg-purple-dark font-semibold text-white hover:bg-purple ${className}`}
        {...properties}
      >
        {children}
      </ButtonUI>
    );
  },
);

Button.displayName = 'Button';

export default Button;
