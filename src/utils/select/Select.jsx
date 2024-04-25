const Select = ({ value, onChange }) => {
  return (
    <div>
      <select
        className="text-[#979DAA] text-center text-md py-3 rounded-md bg-gray-400 bg-opacity-10 outline-none w-[335px] lg:w-[250px]"
        value={value}
        onChange={onChange}
      >
        <option className="text-black" value="">
          Selecione uma opção
        </option>
        <option className="text-black" value="crescente">
          Crescente
        </option>
        <option className="text-black" value="decrescente">
          Decrescente
        </option>
      </select>
    </div>
  );
};

export default Select;
