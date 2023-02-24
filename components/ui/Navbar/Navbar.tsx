import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import s from './Navbar.module.css';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Logo from 'components/icons/Logo';
import { useRouter } from 'next/router';
import Avatar from 'react-avatar';
import { useUser } from 'utils/useUser';
import Button from '../Button';

const Navbar = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);

    const handleItemClick = () => {
      setIsOpen(false);
    };

    return (
      <div className="relative inline-block text-left" ref={ref}>
        <div>
          <button
            type="button"
            className="inline-flex items-center justify-center focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Avatar size="40" name="Foo Bar" round="100px" />
          </button>
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <div className="py-1 divide-y-2">
              <Link href="/account">
                <a
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900 font-medium"
                  onClick={handleItemClick}
                >
                  My Account
                </a>
              </Link>
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900 font-medium"
                onClick={async () => {
                  await supabaseClient.auth.signOut();
                  handleItemClick;
                  router.push('/signin');
                }}
              >
                Sign Out
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between align-center flex-row py-4 md:py-6 relative">
          <div className="flex flex-1 items-center">
            <Link href="/">
              <a className={s.logo} aria-label="Logo">
                <Logo />
              </a>
            </Link>
            <nav className="space-x-2 ml-6 hidden lg:block">
              <Link href="/">
                <a className={s.link}>Pricing</a>
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end space-x-8">
            {user ? (
              <UserDropdown />
            ) : (
              <Link href="/signin" className={s.link}>
                <Button variant="slim" type="button">
                  Login
                </Button>
              </Link>
            )}
            {/* <MyMenu /> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
