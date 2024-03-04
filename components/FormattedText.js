const FormattedText = ({ text }) => {
  return (
    <div>
      {text.split("\n").map((line, index) => (
        <span className="flex mb-2" key={index}>
          {line}
          <br />
        </span>
      ))}
    </div>
  );
};

export default FormattedText;
