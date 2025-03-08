const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-4 '>
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <p className='text-sm text-center text-gray-600'>
          &copy; {currentYear} Bookit.Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
