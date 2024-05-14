import { Link, useLocation } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuthStore from '@/stores/auth-store';

import Button from './common/button';

export default function Header() {
  const { pathname } = useLocation();
  const [logout, user] = useAuthStore((state) => [state.logout, state.user]);

  return (
    <header className="flex flex-col justify-center">
      <h1 className=" max-w-full px-2 py-4 text-center text-4xl font-black lg:px-16 lg:text-5xl">
        An Infinite Blog Site using{' '}
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
      <nav className="flex w-full max-w-2xl justify-between gap-4 self-center px-2">
        <div className="">
          {pathname !== '/' && (
            <Link className="w-min" to="/">
              <Button>Home</Button>
            </Link>
          )}
        </div>
        <div className="flex gap-2">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 rounded-lg bg-purple-light">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/Post/Add">
                    <DropdownMenuItem className="rounded-md bg-purple-dark font-semibold text-white">
                      Add Post
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link to={`/User/${user.id}`}>
                      <DropdownMenuItem className="rounded-md">Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      className="rounded-md"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
