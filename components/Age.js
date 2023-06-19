const Age = ({ name, onChange, value }) => {
  const age = ["X", "5+", "8+", "10+"];
  return (
    <>
      <div>
        <label key={name}>
          <input
            className="m-1"
            type="range"
            min="0"
            max="3"
            step="1"
            name={name}
            value={value}
            // checked={checked}
            onChange={onChange}
          />
          {age[value]}
        </label>
      </div>
    </>
  );
};

export default Age;
