const Time = ({ name, onChange, value, checked }) => {
  return (
    <>
      <div>
        <label key={name}>
          <input
            className="m-1"
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

export default Time;
