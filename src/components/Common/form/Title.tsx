interface Properties {
  children: string;
  className?: string;
}

export default function Title({ children, className }: Properties) {
  return <h3 className={`pb-2 ps-2 text-base font-semibold ${className}`}>{children}</h3>;
}
