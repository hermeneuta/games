const Result = ({ games }) => {
  console.log("Result component: ", games);
  return (
    <>
      {games.length !== 0 ? (
        // <div className="shadow-md m-auto rounded-md p-4 max-w-2xl bg-indigo-300 text-center">
        <div className="font-serif shadow-md text-indigo-950 bg-indigo-300 flex-row items-center justify-center gap-10 m-auto mt-1 mb-6 p-4 rounded-md max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl border border-blue-400 ">
          <ul className="grid grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <li
                key={game._id}
                className="bg-indigo-900 border border-indigo-500 rounded-md p-2 m-1 text-sm text-indigo-200 font-serif shadow focus:shadow-outline"
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
