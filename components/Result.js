const Result = ({ games }) => {
  console.log("Result component: ", games);
  return (
    <>
      {games.length !== 0 ? (
        <ul>
          {games.map((game) => (
            <li key={game._id}>
              <div>{game.game}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No result</div>
      )}
    </>
  );
};

export default Result;
// <div>Nazwa: {game.game}</div>
