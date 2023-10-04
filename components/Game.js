const Game = ({ games }) => {
  return (
    <>
      {games !== "" ? (
        <div className="font-serif shadow-md text-zinc-950 bg-gradient-to-b from-lime-600 bg-lime-700 text-sm text-left flex-row items-center justify-center gap-10 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md md:h-96 border border-lime-800 h-full">
          <div className="text-center font-bold">{games[0].game}</div>
          <div className="grid grid-cols-2 text-center p-2">
            <div>Etap: {games[0].stage?.join(", ")}</div>
            <div>Wiek: {games[0].age.join(", ")}</div>
          </div>
          <div className="italic text-center p-2">{games[0].purpose}</div>
          <div className="text-center font-serif mt-2">{games[0].descr}</div>
          {games[0].needs ? (
            <div className="mt-2 text-center">Potrzeby: {games[0].needs}</div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Game;
