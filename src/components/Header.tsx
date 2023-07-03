export default function Header(): JSX.Element {
  return (
    <header>
      <h1 className=" max-w-full px-2 py-4 text-center text-4xl font-black lg:px-16 lg:text-5xl">
        A Basic Blog Site using{' '}
        <a
          className="text-purple-dark hover:text-purple active:text-purple-light"
          href="https://tanstack.com/query/v4/"
        >
          Tanstack Query v4
        </a>{' '}
        and{' '}
        <a className="text-purple-dark hover:text-purple active:text-purple-light" href="https://dummyjson.com">
          DummyJSON
        </a>
      </h1>
    </header>
  );
}
