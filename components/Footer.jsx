const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full p-4 py-4 mt-10 bg-green-100 ">
      <div className="flex flex-col items-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p className="text-sm text-center">
          &copy; {currentYear} <span className="font-semibold">Bookit</span>. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
