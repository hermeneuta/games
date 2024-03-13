import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import FormattedText from "./FormattedText";

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
            showText ? "" : "h-128"
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
            <div>
              <span className="font-semibold">Liczba uczestników:</span>{" "}
              {games.amount?.join(", ")}
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
                <span className="font-semibold">Cele społeczne:</span>{" "}
                {games.social?.join(", ")}
              </div>
            ) : (
              <></>
            )}
            {games.technical ? (
              <div>
                <span className="font-semibold">Cele techniczne:</span>{" "}
                {games.technical?.join(", ")}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="flex justify-between max-w-xs pt-4 m-auto">
            <div
              onClick={handlePrev}
              className="hover:cursor-pointer hover:scale-105 bg-[#1a2e05] hover:bg-[#365314] border-4 p-2 w-10 h-10 self-center border-lime-800/80 rounded-3xl shadow-md"
            >
              <ChevronLeftIcon className="text-white" />
            </div>
            <div
              onClick={handleNext}
              className="hover:cursor-pointer bg-[#1a2e05] hover:scale-105 hover:bg-[#365314] border-4 p-2 w-10 h-10 self-center border-lime-800/80 rounded-3xl shadow-md"
            >
              <ChevronRightIcon className="text-white" />
            </div>
          </div>
          <div className="text-center uppercase tracking-wide m-4">
            <div>{games.descr.opis}</div>
            <button onClick={toggleClamp} className="underline mt-4">
              {showText ? (
                <div>&#62;&#62; skrócony opis &#60;&#60;</div>
              ) : (
                <div>&#60;&#60; pełny opis &#62;&#62;</div>
              )}
            </button>
          </div>
          {showText ? (
            <div className="text-justify tracking-wide font-serif m-4 mt-6 space-y-4">
              <div>
                <div className="font-bold">Opis miejsca:</div>
                <div>
                  <FormattedText text={games.descr.miejsce} />
                </div>
              </div>
              <div>
                <div className="font-bold">Zasady:</div>
                <div>
                  <FormattedText text={games.descr.zasady} />
                </div>
              </div>
              <div>
                <div className="font-bold">Cel gry:</div>
                <div>
                  <FormattedText text={games.descr.cel} />
                </div>
              </div>
              <div>
                <div className="font-bold">Na co zwrócić uwagę:</div>
                <div>
                  <FormattedText text={games.descr.uwagi} />
                </div>
              </div>
              <div>
                {games.descr.warianty ? (
                  <>
                    <div className="font-bold">Warianty:</div>
                    <div>
                      <FormattedText text={games.descr.warianty} />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
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
