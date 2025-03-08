'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.svg';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding, FaBars, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import destroySession from '@/app/actions/destroySession';
import { useAuth } from '@/context/authContext';

const Header = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { success, error } = await destroySession();

    if (success) {
      setIsAuthenticated(false);
      router.push('/login');
    } else {
      toast.error(error);
    }
  };

  return (
    <header className='bg-green-300'>
      <nav className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/'>
              <Image className='w-12 h-12' src={logo} alt='Bookit' priority={true} />
            </Link>
            <div className='hidden md:block'>
              <div className='flex items-baseline ml-10 space-x-4'>
                <Link href='/' className='px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:bg-gray-700 hover:text-white'>
                Salles
                </Link>
                {isAuthenticated && (
                  <>
                    <Link href='/bookings' className='px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:bg-gray-700 hover:text-white'>
                    Réservations
                    </Link>
                    <Link href='/rooms/add' className='px-3 py-2 text-sm font-medium text-gray-800 rounded-md hover:bg-gray-700 hover:text-white'>
                      Ajouter Salle
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Menu */}
          <div className='flex items-center ml-auto'>
            {!isAuthenticated && (
              <>
                <Link href='/login' className='mr-3 text-gray-800 hover:text-gray-600'>
                  <FaSignInAlt className='inline mr-1' /> Connexion
                </Link>
                <Link href='/register' className='mr-3 text-gray-800 hover:text-gray-600'>
                  <FaUser className='inline mr-1' /> Inscription
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link href='/rooms/my' className='text-gray-800 hover:text-gray-600'>
                  <FaBuilding className='inline mr-1' /> Mes Salles
                </Link>
                <button onClick={handleLogout} className='mx-3 text-gray-800 hover:text-gray-600'>
                  <FaSignOutAlt className='inline mr-1' /> Déconnexion
                </button>
              </>
            )}

            {/* Mobile Menu Toggle Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-gray-800 md:hidden hover:text-gray-600'>
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='bg-gray-200 md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            <Link href='/' className='block px-3 py-2 text-base font-medium text-gray-800 rounded-md hover:bg-gray-700 hover:text-white'>
              Rooms
            </Link>
            {isAuthenticated && (
              <>
                <Link href='/bookings' className='block px-3 py-2 text-base font-medium text-gray-800 rounded-md hover:bg-gray-700 hover:text-white'>
                  Bookings
                </Link>
                <Link href='/rooms/add' className='block px-3 py-2 text-base font-medium text-gray-800 rounded-md hover:bg-gray-700 hover:text-white'>
                  Add Room
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
