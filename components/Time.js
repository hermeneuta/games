const Time = ({ name, onChange, value }) => {
  const time = ["X", "5", "5-7", "5-10", "10-15"];

  return (
    <>
      <div>
        <label key={name}>
          <input
            className="m-1"
            type="range"
            name={name}
            value={value}
            min="0"
            max="4"
            step="1"
            onChange={onChange}
          />
          {time[value]}
        </label>
      </div>
    </>
  );
};

export default Time;
