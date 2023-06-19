const Result = ({ games }) => {
  console.log("Result component: ", games);
  return (
    <>
      {games.length !== 0 ? (
        <div className="shadow-md m-auto rounded-md p-4 max-w-2xl bg-indigo-300 text-center">
          <ul className="grid grid-cols-2">
            {games.map((game) => (
              <li
                key={game._id}
                className="bg-indigo-900 border border-indigo-500 rounded-md p-2 m-1 text-indigo-200 font-serif shadow focus:shadow-outline"
              >
                <div>{game.game}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center max-w-2xl m-auto bg-indigo-500 p-10 ">
          Brak wyników
        </div>
      )}
    </>
  );
};

export default Result;
// <div>Nazwa: {game.game}</div>
