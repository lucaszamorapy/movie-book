import { IoMdSearch } from "react-icons/io";

const Search = ({ value, onChange, placeholder }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex justify-center items-center relative">
      <IoMdSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
        size={18}
        color="#324170"
      />
      <input
        type="text"
        className="pl-10 text-md w-full py-3 rounded-md bg-gray-400 bg-opacity-10  outline-none"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
