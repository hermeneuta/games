const Age = ({ name, onChange, value, checked }) => {
  return (
    <>
      <div>
        <label key={name}>
          <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
          />
          {name}
        </label>
      </div>
    </>
  );
};

export default Age;
