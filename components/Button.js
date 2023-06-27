const Button = ({ disabled }) => {
  return (
    <button
      type="submit"
      className="font-serif text-md shadow-md text-indigo-900 bg-indigo-500 hover:text-indigo-950 p-2 rounded-md"
    >
      {disabled ? "Ładowanie..." : "Szukaj"}
    </button>
  );
};

export default Button;
