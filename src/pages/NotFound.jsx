import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex flex-col gap-y-4">
      <h1 className="text-center text-xl font-semibold">Page Not Found!</h1>
      <Link className="btn btn-sm mx-auto" to={"/"}>
        Home
      </Link>
    </section>
  );
};

export default NotFound;
