import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header(): JSX.Element {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  return (
    <header>
      {pathname === '/' ? (
        <Link to="/Login">
          <button className="fixed right-4 top-4 rounded-md bg-purple px-4 py-2 font-semibold text-white hover:bg-purple-dark">
            Login
          </button>
        </Link>
      ) : (
        <Link to="/">
          <button className="fixed right-4 top-4 rounded-md bg-purple px-4 py-2 font-semibold text-white hover:bg-purple-dark">
            Back
          </button>
        </Link>
      )}
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
