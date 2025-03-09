const Heading = ({ title }) => {
  return (
    <section className='px-3 py-3 mb-4 bg-white shadow sm:px-6 sm:py-4'>
      <h1 className='text-xl font-bold tracking-tight text-center text-gray-900 sm:text-2xl sm:text-left'>
        {title}
      </h1>
    </section>
  );
};

export default Heading;
