import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router";

const Search = ({ value, onChange, placeholder }) => {
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchItem(event.target.value);
    onChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchItem) return;
    navigate(`/searchpage?q=${searchItem}`);
  };

  return (
    <form
      className="flex justify-center items-center relative w-full"
      onSubmit={handleSubmit}
    >
      <IoMdSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
        size={18}
        color="#324170"
      />
      <input
        type="text"
        className="pl-10 text-md w-full py-3 rounded-md bg-gray-400 bg-opacity-10 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default Search;
