export default function Header(): JSX.Element {
  return (
    <header>
      <h1 className="px-24 py-4 text-5xl font-black">
        A Blog Site using{' '}
        <a
          className="text-purple-dark hover:text-purple active:text-purple-light"
          href="https://tanstack.com/query/v4/"
        >
          Tanstack Query v4
        </a>{' '}
        and{' '}
        <a
          className="text-purple-dark hover:text-purple active:text-purple-light"
          href="https://jsonplaceholder.typicode.com/"
        >
          JSON Placeholder
        </a>
      </h1>
    </header>
  );
}
