export default function FormAlert({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="pt-2 text-xs text-red-600">
      {children}
    </p>
  );
}
