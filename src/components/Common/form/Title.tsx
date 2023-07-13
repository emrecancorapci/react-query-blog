export default function Title({ children, className = '' }: { children: string; className?: string }): JSX.Element {
  return <h3 className={`pb-2 ps-2 text-base font-semibold ${className}`}>{children}</h3>;
}
