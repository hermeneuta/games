const Requirements = ({ name, onChange, value, checked, label }) => {
  return (
    <>
      <div>
        <label key={name}>
          <input
            className="m-1"
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
          />
          {label}
        </label>
      </div>
    </>
  );
};

export default Requirements;
