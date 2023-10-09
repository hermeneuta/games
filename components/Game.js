import { useState } from "react";

const Game = ({ games, handleNav }) => {
  const handlePrev = () => {
    handleNav("prev");
  };
  const handleNext = () => {
    handleNav("next");
  };

  return (
    <>
      {games !== "" ? (
        <div className="font-serif shadow-md text-zinc-950 bg-gradient-to-b from-lime-600 bg-lime-700 text-sm text-left flex-row items-center justify-center gap-10 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md md:h-128 border border-lime-800 h-full">
          <div className="flex justify-between p-4 ">
            <div
              onClick={handlePrev}
              className="border-4 self-center hover:cursor-pointer p-2 w-10 h-10 border-lime-800/80 rounded-3xl"
            >
              <svg
                width="15"
                height="15"
                strokeWidth="1"
                stroke="#a3e635"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                  fill="#D1FAE5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="text-center font-bold h-14 w-64 uppercase tracking-wide pt-4">
              {games.game}
            </div>
            <div
              onClick={handleNext}
              className="hover:cursor-pointer border-4 p-2 w-10 h-10 self-center border-lime-800/80 rounded-3xl"
            >
              <svg
                width="15"
                height="15"
                strokeWidth="1"
                stroke="#a3e635"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="#D1FAE5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <div className="grid text-sm text-left space-y-2 w-80 h-52 m-auto p-2 border-2 rounded-xl font-light border-lime-800">
            <div>
              <span className="font-semibold">Etap:</span>{" "}
              {games.stage?.join(", ")}
            </div>
            <div>
              <span className="font-semibold">Wiek:</span>{" "}
              {games.age.join(", ")}
            </div>
            <div>
              <span className="font-semibold">Dziedzina:</span>{" "}
              {games.field?.join(", ")}
            </div>
            <div>
              <span className="font-semibold">Rekwizyty:</span>{" "}
              {games.props?.join(", ")}
            </div>
            <div>
              <span className="font-semibold">C. społeczne:</span>{" "}
              {games.social?.join(", ")}
            </div>
            <div>
              <span className="font-semibold">C. techniczne:</span>{" "}
              {games.technical?.join(", ")}
            </div>
          </div>
          <div className="italic text-center p-2">{games.purpose}</div>
          <div className="text-left tracking-wide font-serif line-clamp-3 m-4">
            {games.descr}
          </div>
          {games.needs ? (
            <div className="mt-2 text-center">Potrzeby: {games.needs}</div>
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
