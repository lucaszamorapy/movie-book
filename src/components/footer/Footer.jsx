import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="bg-gray-400 bg-opacity-10 mt-16">
      <div className="container">
        <div className="flex flex-col justify-center gap-2 items-center py-5 lg:flex-row">
          <p className="opacity-10">Alguns direitos reservados </p>{" "}
          <span className="opacity-10 hidden lg:block">|</span>
          <p className="opacity-10">
            Desenvolvido por{" "}
            <Link to={"https://github.com/lucaszamorapy"}>Lucas Zamora</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
