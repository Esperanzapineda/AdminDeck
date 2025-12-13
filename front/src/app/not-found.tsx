import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-5xl font-bold text-secondary-600 mt-16'>
              Página no encontrada
            </h1>
            <h3 className='text-9xl font-extrabold text-primary-600 mt-12'>
              404
            </h3>
            <Link href="/" className="mt-12 bg-primary-600 font-bold py-3 px-8 rounded-full text-foreground">
                Volver al Inicio
            </Link>
          </div>
      </main>
    </div>
  );
};

export default NotFound;
