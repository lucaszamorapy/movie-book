import React from "react";
import header from "../../config/header.json";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section className="mb-10">
      <div className="container">
        <div className="flex flex-col justify-center items-center gap-5 lg:flex-row">
          <Link to={"/"}>
            <img
              className="w-[200px] lg:w-[400px]"
              src={header.image}
              alt="Logo"
            />
          </Link>
          <h1 className="text-4xl py-5 text-center border-t-2 uppercase font-bold font-color px-5 lg:text-start lg:py-0 lg:text-6xl lg:border-l-2 lg:border-t-0">
            {parse(header.title)}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Header;
