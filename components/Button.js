const Button = ({ disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="font-serif text-md shadow-md text-indigo-900 bg-indigo-500 hover:text-indigo-950 p-2 rounded-md"
    >
      {disabled ? "Szukam..." : "Szukaj"}
    </button>
  );
};

export default Button;
