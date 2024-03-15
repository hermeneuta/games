const ShowingGamesNames = ({ result, handleClick }) => {
  return (
    <div className="font-serif shadow-md text-zinc-950 bg-gradient-to-b from-lime-600 bg-lime-700 flex-row items-center justify-center gap-10 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md border border-lime-800 ">
      <ul className="grid grid-cols-2 lg:grid-cols-3">
        {result.map((game) => (
          <li
            key={game._id}
            onClick={handleClick}
            className="bg-lime-750 hover:tracking-wide hover:bg-lime-600 border border-lime-800 rounded-md p-2 m-1 font-bold text-xs text-zinc-950 font-serif shadow-md focus:shadow-outline hover:cursor-pointer"
          >
            <div>{game.game}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowingGamesNames;
