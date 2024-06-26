import axios from "axios";
import Game from "./Game";
import Search from "./Search";
import { useState, useEffect, useRef } from "react";
//Select
import { Button } from "@tremor/react";
//Comment
//MultiSelect
//import { MultiSelect, MultiSelectItem } from "@tremor/react";
import Switcher from "./Switcher";
import Dropdown from "./Dropdown";
import NoResults from "./NoResults";
import ShowingGamesNames from "./ShowingGamesNames";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Separator from "@radix-ui/react-separator";

const Form = () => {
  const resultRef = useRef(null);
  //Odwołanie do opisu gry
  const gameRef = useRef(null);

  const ageRange = ["bez ograniczeń", "5-7", "8-11", "12-16", "16+"];
  const amountRange = ["dowolna", "5-15", "ponad 15"];
  const rekwizytyRange = [
    "dowolne",
    "brak",
    "flowersticks",
    "piłki",
    "maczugi",
    "obręcze",
    "chustki",
    "diabolo",
    "pojki",
    "szarfy",
    "hula-hoop",
  ];
  const stageRange = [
    "dowolny",
    "przywitanie",
    "rozgrzewka",
    "część główna",
    "wyciszenie",
  ];
  const fieldRange = [
    "dowolna",
    "żonglerka",
    "akrobatyka",
    "aerial",
    "ekwilibrystyka",
    "performance",
  ];

  const socialRange = [
    "dowolne",
    "integracja",
    "współpraca",
    "rywalizacja",
    "budowanie zaufania",
  ];

  const technicalRange = [
    "dowolne",
    "wzmacnianie",
    "koordynacja",
    "rytmizacja",
  ];

  const [ageLimit, setAgeLimit] = useState(ageRange[0]);
  const [result, setResult] = useState([]);
  const [getResult, setGetResult] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [amount, setAmount] = useState(amountRange[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [showGame, setShowGame] = useState("");
  const [rekwizyty, setRekwizyty] = useState(rekwizytyRange[0]);
  const [field, setField] = useState(fieldRange[0]);
  const [stage, setStage] = useState(stageRange[0]);
  const [socialAims, setSocialAims] = useState(socialRange[0]);
  const [technicalAims, setTechnicalAims] = useState(technicalRange[0]);
  const [open, setOpen] = useState(false);
  const [fastGame, setFastGame] = useState(false);
  const [smallSpace, setSmallSpace] = useState(false);
  const [survival, setSurvival] = useState(false);

  const handleFastGame = () => {
    setFastGame(!fastGame);
  };

  const handleSmallSpace = () => {
    setSmallSpace(!smallSpace);
  };

  const handleSurvival = () => {
    setSurvival(!survival);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!submitted) return;
      try {
        const response = await axios.post("/api/search", submitted);
        setResult(response.data);
        setShowGame(response.data[0]);
        setGetResult(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setIsLoadingAll(false);
        resultRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    fetchData();
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted({
      age: ageLimit,
      amount: amount,
      stage: stage,
      field: field,
      props: rekwizyty,
      social: socialAims,
      technical: technicalAims,
      fastGame: fastGame,
      smallSpace: smallSpace,
      survival: survival,
    });
    setIsLoading(true);
  };

  const handleSubmitAll = async (e) => {
    e.preventDefault();

    setSubmitted({
      age: "wszystkie",
      amount: amount,
      stage: stage,
      field: field,
      props: rekwizyty,
      social: socialAims,
      technical: technicalAims,
      fastGame: fastGame,
      smallSpace: smallSpace,
      survival: survival,
    });
    setIsLoadingAll(true);
  };

  const handleNav = (info) => {
    //Znalezienie indexu obecnie wyświetlanej gry
    let idx = result.findIndex((el) => el._id === showGame._id);

    //Modyfikacja indeksu w zależności od decyzji użytkownika
    if (info === "next") {
      const mod = idx === result.length - 1 ? 0 : idx + 1;
      const next_game = result[mod];
      setShowGame(next_game);
    } else {
      const mod = idx === 0 ? result.length - 1 : idx - 1;
      const prev_game = result[mod];
      setShowGame(prev_game);
    }
  };

  //Obsługa kliknięcia w nazwę gry
  const handleClick = (e) => {
    e.preventDefault();
    const game_name = e.target.textContent;
    const show_game = result.filter((game) => game.game === game_name);
    setShowGame(...show_game);
    gameRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleResultChange = (value) => {
    setResult(value);
  };

  const handleShowGameChange = (value) => {
    setShowGame(value[0]);
  };

  const handleGetResultChange = (value) => {
    setGetResult(value);
  };

  const handleResulRef = () => {
    resultRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //postronne efekty podczas wysłania formularza. Zapytanie wędruje do search endpoint
  useEffect(() => {
    const fetchData = async () => {
      if (!submitted) return;

      // setIsLoading(true);
      const response = await axios.post("/api/search", submitted);
      setResult(response.data);
      setShowGame(response.data[0]);
      setGetResult(true);
      // setIsLoading(false);
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    };

    fetchData();
  }, [submitted]);

  // console.log(result);
  return (
    <>
      <div>
        <div className="font-serif shadow-md text-zinc-950 bg-gradient-to-tl from-lime-600 bg-lime-700 items-center justify-center gap-2 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md border border-lime-800 text-center">
          <div className="mb-4 text-lg tracking-wide sm:tracking-widest">
            Wyszukaj grę po nazwie
          </div>
          <Search
            onGetResultChange={handleGetResultChange}
            onShowGameChange={handleShowGameChange}
            onResultChange={handleResultChange}
            onResultRef={handleResulRef}
          />
          <Separator.Root className="sm:col-span-2 bg-lime-800 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[70%] inline-flex data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[5px]" />
          <div>
            <div className="mb-2 text-lg tracking-wide sm:tracking-widest">
              Pokaż wszystkie dostępne gry
            </div>
            <div>
              <form onSubmit={handleSubmitAll}>
                <div>
                  <div className="m-2 sm:m-6">
                    <Button
                      loadingText="Ładuję..."
                      loading={isLoadingAll}
                      size="xl"
                      variant="primary"
                    >
                      Wszystkie gry
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Separator.Root className="sm:col-span-2 bg-lime-800 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[70%] inline-flex data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[5px]" />
          <div className="mb-4 text-lg tracking-wide sm:tracking-widest">
            Lub skorzystaj z kategorii
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid mx-auto items-center sm:grid-cols-2">
              <Dropdown
                categoryName="Wiek"
                value={ageLimit}
                onChange={setAgeLimit}
                catRange={ageRange}
              />
              <Dropdown
                categoryName="Liczba uczestników"
                value={amount}
                onChange={setAmount}
                catRange={amountRange}
              />
            </div>
            <Collapsible.Root open={open} onOpenChange={setOpen}>
              <div className="mr-24 ml-24 mt-4 mb-2 sm:mr-40 sm:ml-40">
                <Collapsible.Trigger asChild>
                  <button className="underline">
                    {open ? <div>mniej opcji</div> : <div>więcej opcji</div>}
                  </button>
                </Collapsible.Trigger>
              </div>
              <Collapsible.Content className="grid sm:grid-cols-2">
                <Separator.Root className="m-auto sm:col-span-2 bg-lime-800 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[70%] inline-flex data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[5px]" />
                <Dropdown
                  categoryName="Etap zajęć"
                  value={stage}
                  onChange={setStage}
                  catRange={stageRange}
                />
                <Dropdown
                  categoryName="Dziedzina"
                  value={field}
                  onChange={setField}
                  catRange={fieldRange}
                />
                <div className="sm:col-span-2">
                  <Dropdown
                    categoryName="Rekwizyty"
                    value={rekwizyty}
                    onChange={setRekwizyty}
                    catRange={rekwizytyRange}
                  />
                </div>
                <Dropdown
                  categoryName="Cele społeczne"
                  value={socialAims}
                  onChange={setSocialAims}
                  catRange={socialRange}
                />
                <Dropdown
                  categoryName="Cele techniczne"
                  value={technicalAims}
                  onChange={setTechnicalAims}
                  catRange={technicalRange}
                />
                <div className="mt-5"></div>
              </Collapsible.Content>
            </Collapsible.Root>
            <Separator.Root className="sm:col-span-2 bg-lime-800 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-[70%] inline-flex data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[5px]" />
            <div className="mr-14 ml-14 mt-2 mb-5 sm:mr-28 sm:ml-28">
              <Switcher
                id="fast_game"
                categoryName="Szybka gra"
                changed={fastGame}
                handleChange={handleFastGame}
              />
              <Switcher
                id="small_space"
                categoryName="Mała przestrzeń"
                changed={smallSpace}
                handleChange={handleSmallSpace}
              />
              <Switcher
                id="survival"
                categoryName="Survival mode"
                changed={survival}
                handleChange={handleSurvival}
              />
            </div>
            <div>
              <div className="m-2 sm:m-6">
                <Button
                  loadingText="Szukam..."
                  loading={isLoading}
                  size="xl"
                  variant="primary"
                >
                  Szukaj
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/*Prezentacja kart z nazwami gier*/}

        <div ref={resultRef}>
          {result.length !== 0 && getResult ? (
            <div>
              <div ref={gameRef}>
                <Game
                  games={showGame}
                  handleNav={handleNav}
                  results={result.length}
                />
              </div>
              <ShowingGamesNames result={result} handleClick={handleClick} />
            </div>
          ) : result.length === 0 && getResult ? (
            <NoResults />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
