import Game from "./Game";
import { useState, useRef } from "react";

const Result = ({ games }) => {
  const [showGame, setShowGame] = useState("");
  const myRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    const game_name = e.target.textContent;
    const show_game = games.filter((game) => game.game === game_name);
    setShowGame(show_game);
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };
  console.log("showGame: ", showGame);
  return (
    <>
      {games.length !== 0 ? (
        <div>
          <div className="font-serif shadow-md text-indigo-950 bg-indigo-300 flex-row items-center justify-center gap-10 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl border border-blue-400 ">
            <ul className="grid grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <li
                  key={game._id}
                  onClick={handleClick}
                  className="bg-indigo-300 hover:bg-indigo-500 border border-indigo-500 rounded-md p-2 m-1 font-bold text-xs text-indigo-900 font-serif shadow-md focus:shadow-outline hover:cursor-pointer"
                >
                  <div>{game.game}</div>
                </li>
              ))}
            </ul>
          </div>
          <div ref={myRef}>
            {showGame ? <Game games={showGame} /> : <div></div>}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Result;
// <div className="font-serif rounded-md text-center max-w-sm sm:max-w-md m-auto md:max-w-lg lg:max-w-2xl bg-indigo-500 p-10 ">
//   Brak wyników
// </div>
