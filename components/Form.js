import axios from "axios";
import Game from "./Game";
import Requirements from "./Requirements";
import Time from "./Time";
import Result from "./Result";
import { useState, useEffect, useRef } from "react";
import * as Switch from "@radix-ui/react-switch";
//Select
import {
  Button,
  Select,
  SelectItem,
  Flex,
  Card,
  ColGrid,
  Col,
} from "@tremor/react";

//MultiSelect
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import Switcher from "./Switcher";
import Dropdown from "./Dropdown";

const Form = () => {
  const purposeList = [
    "rozgrzewka",
    "rywalizacja",
    "świadomość ciała",
    "świadomość przestrzeni",
    "współpraca",
    "rozpoznanie ról w grupie",
    "integracja",
    "odgrywanie ról",
    "improwizacja",
  ];

  const resultRef = useRef(null);
  //Odwołanie do opisu gry
  const gameRef = useRef(null);

  const ageRange = ["dowolny", "5+", "8+", "10+"];
  const amountRange = ["optymalna", "mała (do 5 osób)", "liczna (pow. 15/20)"];
  const rekwizytyRange = [
    "dowolne",
    "flower sticks",
    "piłki",
    "maczugi",
    "obręcze",
    "chustki",
    "diabolo",
    "pojki",
    "chusty",
    "hula-hoop",
  ];
  const stageRange = [
    "bez znaczenia",
    "przywitanie",
    "rozgrzewka",
    "core",
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

  const [query, setQuery] = useState({
    purpose: [],
    age: "",
    time: "",
    requir: "",
  });

  const [checkboxes, setCheckboxes] = useState([]);
  const [ageLimit, setAgeLimit] = useState(ageRange[0]);
  const [timeLimit, setTimeLimit] = useState("dowolny");
  const [purpose, setPurpose] = useState([]);
  const [requir, setRequir] = useState(false);
  const [result, setResult] = useState([]);
  const [submitted, setSubmitted] = useState(null);
  const [amount, setAmount] = useState(amountRange[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [showGame, setShowGame] = useState("");
  const [rekwizyty, setRekwizyty] = useState(rekwizytyRange[0]);
  const [field, setField] = useState(fieldRange[0]);
  const [stage, setStage] = useState(stageRange[0]);
  const [socialAims, setSocialAims] = useState(socialRange[0]);
  const [technicalAims, setTechnicalAims] = useState(technicalRange[0]);

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
        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 font-serif shadow-md text-indigo-950 bg-indigo-300 items-center justify-center gap-4 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md md:max-w-lg border border-blue-400 ">
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
            <Dropdown
              categoryName="Rekwizyty"
              value={rekwizyty}
              onChange={setRekwizyty}
              catRange={rekwizytyRange}
            />
            <Dropdown
              categoryName="Cele techniczne"
              value={socialAims}
              onChange={setSocialAims}
              catRange={socialRange}
            />
            <Dropdown
              categoryName="Cele społeczne"
              value={technicalAims}
              onChange={setTechnicalAims}
              catRange={technicalRange}
            />

            <div>
              <Switcher id="fast_game" categoryName="Szybka gra" />
              <Switcher id="small_space" categoryName="Mała przestrzeń" />
              <Switcher id="survival" categoryName="Survival mode" />
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
          </div>
          <div className="font-serif text-indigo-950 shadow-md p-4 bg-indigo-300 rounded-md border border-blue-400 m-auto max-w-sm sm:max-w-md md:max-w-lg ">
            <MultiSelect
              onValueChange={setCheckboxeshandler}
              placeholder="Cel zajęć ..."
              value={checkboxes}
            >
              {purposeList.map((purpose) => (
                <MultiSelectItem key={purpose} value={purpose}>
                  {purpose}
                </MultiSelectItem>
              ))}
            </MultiSelect>
          </div>
        </form>

        <div ref={resultRef}>
          {result.length !== 0 ? (
            <div>
              <div ref={gameRef}>
                {showGame ? <Game games={showGame} /> : <div></div>}
              </div>
              <div className="font-serif shadow-md text-indigo-950 bg-indigo-300 flex-row items-center justify-center gap-10 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md md:max-w-lg border border-blue-400 ">
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
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Form;
