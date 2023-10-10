import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

const Game = ({ games, handleNav, results }) => {
  const [showText, setShowText] = useState(false);

  const toggleClamp = () => {
    setShowText(!showText);
  };

  const handlePrev = () => {
    handleNav("prev");
    setShowText(false);
  };
  const handleNext = () => {
    handleNav("next");
    setShowText(false);
  };
  let odm;

  if (results === 1) {
    odm = "gra";
  } else if (results === 2 || results === 3 || results === 4) {
    odm = "gry";
  } else {
    odm = "gier";
  }

  return (
    <>
      {games !== "" ? (
        <div
          className={`font-serif shadow-md text-zinc-950 bg-gradient-to-b from-lime-600 bg-lime-700 text-sm text-left flex-row items-center justify-center gap-10 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md border border-lime-800 ${
            showText ? "h-[870px] sm:h-[750px]" : "h-128"
          }`}
        >
          <div className="flex-col m-auto">
            <div className="text-center text-xs font-thin">
              {results} {odm}
            </div>
            <div className="text-center font-bold uppercase tracking-wide pt-4 pb-4">
              {games.game}
            </div>
          </div>
          <div className="grid text-sm bg-gradient-to-l from:bg-lime-600 to:bg-lime-900 text-left space-y-2 w-72 sm:w-80 h-56 m-auto p-2 border-2 rounded-xl font-light border-lime-800 shadow-md">
            <div>
              <span className="font-semibold">Etap:</span>{" "}
              {games.stage?.join(", ")}
            </div>
            <div>
              <span className="font-semibold">Wiek:</span>{" "}
              {games.age.join(", ")}
            </div>
            {games.field ? (
              <div>
                <span className="font-semibold">Dziedzina:</span>{" "}
                {games.field?.join(", ")}
              </div>
            ) : (
              <></>
            )}
            <div>
              <span className="font-semibold">Rekwizyty:</span>{" "}
              {games.props?.join(", ")}
            </div>
            {games.social ? (
              <div>
                <span className="font-semibold">C. społeczne:</span>{" "}
                {games.social?.join(", ")}
              </div>
            ) : (
              <></>
            )}
            {games.technical ? (
              <div>
                <span className="font-semibold">C. techniczne:</span>{" "}
                {games.technical?.join(", ")}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-between max-w-xs pt-4 m-auto">
            <div
              onClick={handlePrev}
              className="hover:cursor-pointer bg-[#1a2e05] hover:bg-[#365314] border-4 p-2 w-10 h-10 self-center border-lime-800/80 rounded-3xl shadow-md"
            >
              <ChevronLeftIcon className="text-white" />
            </div>
            <div
              onClick={toggleClamp}
              className="hover:cursor-pointer bg-[#1a2e05] border-4 p-2 w-10 h-10 shadow-md self-center border-lime-800/80 hover:bg-[#365314] rounded-3xl m-auto"
            >
              {showText ? (
                <ChevronUpIcon className="text-white" />
              ) : (
                <ChevronDownIcon className="text-white" />
              )}
            </div>
            <div
              onClick={handleNext}
              className="hover:cursor-pointer bg-[#1a2e05] hover:bg-[#365314] border-4 p-2 w-10 h-10 self-center border-lime-800/80 rounded-3xl shadow-md"
            >
              <ChevronRightIcon className="text-white" />
            </div>
          </div>
          <div
            className={`text-justify tracking-wide font-serif ${
              showText ? "" : "line-clamp-3"
            } m-4 mt-6`}
          >
            {games.descr}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Game;
