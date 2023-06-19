//Query data based on purpose
//
const Purpose = ({ name, onChange, checked }) => {
  return (
    <>
      <div>
        <label key={name}>
          <input
            className="m-1"
            type="checkbox"
            name={name}
            onChange={onChange}
            checked={checked}
          />
          {name}
        </label>
      </div>
    </>
  );
};

export default Purpose;
