import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './common/Button';
import useAuthStore from '../stores/AuthStore';

export default function Header(): JSX.Element {
  const { pathname } = useLocation();
  const [logout, user] = useAuthStore((state) => [state.logout, state.user]);

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
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
        <a className="text-purple-dark  hover:text-purple active:text-purple-light" href="https://dummyjson.com">
          DummyJSON
        </a>
      </h1>
      <nav className="flex justify-center gap-4">
        {pathname !== '/' && (
          <Link className="w-min" to="/">
            <Button>Home</Button>
          </Link>
        )}

        {user === undefined && pathname === '/Login' && (
          <Link className="w-min" to="/Register">
            <Button>Register</Button>
          </Link>
        )}

        {user === undefined && pathname !== '/Login' && (
          <Link className="w-min" to="/Login">
            <Button>Login</Button>
          </Link>
        )}

        {user !== undefined && (
          <>
            <Link to="/Post/Add">
              <Button>Add Post</Button>
            </Link>
            <Link to="/Profile">
              <Button>Profile</Button>
            </Link>
            <Button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
