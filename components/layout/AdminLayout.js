import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

function AdminLayout({ children }) {
  const router = useRouter();

  const handleSignOut = async () => {};

  return (
    <div>
      <header>
        <nav className="bg-gray-50 border-b border-gray-200">
          <div className="px-4 py-2 max-w-screen-xl mx-auto">
            <div className="flex items-center justify-between gap-2">
              <ul className="flex items-center text-sm text-gray-600 font-medium">
                <li className="block lg:inline">
                  <Link
                    href="/topics"
                    className={clsx(
                      'inline-block px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100',
                      {
                        'bg-gray-100': router.pathname === '/topics'
                      }
                    )}>
                    Tópicos
                  </Link>
                </li>
                <li className="block lg:inline">
                  <Link
                    href="/resources"
                    className={clsx(
                      'inline-block px-3 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100',
                      {
                        'bg-gray-100': router.pathname === '/resources'
                      }
                    )}>
                    Recursos
                  </Link>
                </li>
              </ul>

              <Button color="danger" variant="light" onPress={handleSignOut}>
                Salir
              </Button>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1 py-4 px-6 space-y-4 max-w-screen-xl mx-auto">{children}</main>
    </div>
  );
}

export default AdminLayout;
