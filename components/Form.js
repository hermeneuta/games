import axios from "axios";
import Age from "./Age";
import Purpose from "./Purpose";
import Game from "./Game";
import Requirements from "./Requirements";
import Time from "./Time";
import Result from "./Result";
import { useState, useEffect, useRef } from "react";
//Select
import { Button, Select, SelectItem } from "@tremor/react";
import { CalculatorIcon } from "@heroicons/react/outline";
//SearchSelect
import { SearchSelect, SearchSelectItem } from "@tremor/react";

//MultiSelect
import { MultiSelect, MultiSelectItem } from "@tremor/react";

const Form = () => {
  const purposeList = [
    {
      name: "rozgrzewka",
      checked: false,
    },
    {
      name: "rywalizacja",
      checked: false,
    },
    {
      name: "świadomość ciała",
      checked: false,
    },
    {
      name: "świadomość przestrzeni",
      checked: false,
    },
    {
      name: "współpraca",
      checked: false,
    },
    {
      name: "rozpoznanie ról w grupie",
      checked: false,
    },
    {
      name: "integracja",
      checked: false,
    },
    {
      name: "odgrywanie ról",
      checked: false,
    },
    {
      name: "improwizacja",
      checked: false,
    },
  ];

  const resultRef = useRef(null);
  //Odwołanie do opisu gry
  const gameRef = useRef(null);

  const ageRange = ["no age limit", "5+", "8+", "10+"];
  const timeRange = ["no time limit", "5", "5-7", "5-10", "10-15"];

  const [query, setQuery] = useState({
    purpose: [],
    age: "",
    time: "",
    requir: "",
  });

  const [checkboxes, setCheckboxes] = useState([]);
  const [ageLimit, setAgeLimit] = useState("no age limit");
  const [timeLimit, setTimeLimit] = useState("no time limit");
  const [purpose, setPurpose] = useState([]);
  const [requir, setRequir] = useState(false);
  const [result, setResult] = useState([]);
  const [submitted, setSubmitted] = useState(null);
  const [valueAge, setValueAge] = useState(0);
  const [valueTime, setValueTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showGame, setShowGame] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (submitted) {
        try {
          setIsLoading(true);
          const response = await axios.post("/api/search", {
            purpose,
            ageLimit,
            timeLimit,
            requir,
          });
          setResult(response.data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);

          resultRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    fetchData();
    // setSubmitted(null);
  }, [submitted]);

  const handleSubmit = async (e) => {
    //powinien zwracać obiekt postaci query

    e.preventDefault();
    setShowGame(false);

    try {
      const purpose = checkboxes;
      // .filter((box) => box.checked === true)
      // .map((el) => el.name);

      setPurpose(purpose);
      setQuery({
        ...query,
        purpose: purpose,
        age: ageLimit,
        time: timeLimit,
        requir: requir,
      });
      setSubmitted(query);

      console.log(checkboxes);
      console.log(query);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  //Obsługa kliknięcia w nazwę gry
  const handleClick = (e) => {
    e.preventDefault();
    const game_name = e.target.textContent;
    const show_game = result.filter((game) => game.game === game_name);
    setShowGame(show_game);
    gameRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const setCheckboxeshandler = (val) => {
    console.log("changing to: ", val);
    setCheckboxes(val);
  };
  return (
    <>
      <div className="text-center">
        <div ref={resultRef}>
          {result.length !== 0 ? (
            <div>
              <div className="font-serif shadow-md text-indigo-950 bg-indigo-300 flex-row items-center justify-center gap-10 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl border border-blue-400 ">
                <ul className="grid grid-cols-2 lg:grid-cols-3">
                  {result.map((game) => (
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
              <div ref={gameRef}>
                {showGame ? <Game games={showGame} /> : <div></div>}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 font-serif shadow-md text-indigo-950 bg-indigo-300 flex-row items-center justify-center gap-4 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md md:max-w-lg border border-blue-400 ">
            <div>
              <div className="text-left">
                <label className="font-bold text-md">Wiek: </label>
                <Age
                  key="age"
                  name="age"
                  value={valueAge}
                  onChange={(e) => {
                    setValueAge(e.target.value);
                    setAgeLimit(ageRange[e.target.value]);
                  }}
                />
              </div>

              <div className="text-left">
                <label className="font-bold text-md">Czas [min]: </label>
                <Time
                  key="time"
                  name="time"
                  value={valueTime}
                  onChange={(e) => {
                    setValueTime(e.target.value);
                    setTimeLimit(timeRange[e.target.value]);
                  }}
                />
              </div>
            </div>
            <div>
              <div className="m-2 sm:m-6">
                <Button
                  loadingText="Szukam..."
                  loading={isLoading}
                  size="xs"
                  variant="primary"
                >
                  Szukaj
                </Button>
              </div>
              <div className="text-xs text-indigo-900">
                <label>Dodatkowe wymagania: </label>
                <Requirements
                  key="requirements"
                  name="requirements"
                  label="Bez wymagań"
                  value={requir}
                  checked={requir}
                  onChange={() => {
                    setRequir(!requir);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="font-serif text-indigo-950 shadow-md p-4 bg-indigo-300 rounded-md border border-blue-400 m-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <MultiSelect
              onValueChange={setCheckboxeshandler}
              className="bg-green-600"
              placeholder="Cel zajęć ..."
            >
              {purposeList.map((box) => (
                <MultiSelectItem key={box.name} value={box.name}>
                  {box.name}
                </MultiSelectItem>
              ))}
            </MultiSelect>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
