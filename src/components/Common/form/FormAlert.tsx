export default function FormAlert({
  children,
}: {
  children: JSX.Element | boolean | string | Array<string | boolean>;
}): JSX.Element {
  return (
    <p role="alert" className="pt-2 text-xs text-red-600">
      {children}
    </p>
  );
}
