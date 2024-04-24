import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";

const ButtonBack = () => {
  return (
    <>
      <Link to={"/"}>
        <div className="bg-[#1B2440] flex justify-center p-3 rounded-full items-center hover:bg-[#090C16] duration-300 ease-in-out">
          <MdOutlineArrowBackIosNew />
        </div>
      </Link>
    </>
  );
};

export default ButtonBack;
