import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="flex flex-col gap-y-4">
      <h1 className="text-center text-4xl font-semibold">Page Not Found!</h1>
      <Link className="btn-sm btn mx-auto" to={-1} replace>
        Go back
      </Link>
    </section>
  );
};

export default NotFound;
