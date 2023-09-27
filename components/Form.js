import axios from "axios";
import Game from "./Game";
import { useState, useEffect, useRef } from "react";
//Select
import { Button } from "@tremor/react";

//MultiSelect
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import Switcher from "./Switcher";
import Dropdown from "./Dropdown";
import * as Collapsible from "@radix-ui/react-collapsible";
import { RowSpacingIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as Separator from "@radix-ui/react-separator";

const Form = () => {
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
    "dowolny",
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
  const [open, setOpen] = useState(false);

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
          <div className="font-serif shadow-md text-zinc-950 bg-gradient-to-b from-lime-600 bg-lime-800 items-center justify-center gap-2 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md border border-lime-800 ">
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
              <div
                className="mr-24 ml-24 mt-4 mb-4 sm:mr-40 sm:ml-40"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span className="text-xs font-extralight">więcej...</span>
                <Collapsible.Trigger asChild>
                  <button className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 shadow-[0_2px_10px] shadow-blackA7 outline-none data-[state=closed]:bg-white data-[state=open]:bg-violet3 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black">
                    {open ? <Cross2Icon /> : <RowSpacingIcon />}
                  </button>
                </Collapsible.Trigger>
              </div>

              <Collapsible.Content className="grid sm:grid-cols-2">
                <Separator.Root className="sm:col-span-2 bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mb-[15px] my-[5px]" />
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
            <Separator.Root className="sm:col-span-2 bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[5px]" />
            <div className="mr-14 ml-14 mt-5 mb-5 sm:mr-28 sm:ml-28">
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
        </form>
        <div ref={resultRef}>
          {result.length !== 0 ? (
            <div>
              <div ref={gameRef}>
                {showGame ? <Game games={showGame} /> : <div></div>}
              </div>
              <div className="font-serif shadow-md text-zinc-950 bg-gradient-to-b from-lime-600 bg-lime-700 flex-row items-center justify-center gap-10 m-auto mt-1 mb-1 p-4 rounded-md max-w-sm sm:max-w-md border border-lime-800 ">
                <ul className="grid grid-cols-2 lg:grid-cols-3">
                  {result.map((game) => (
                    <li
                      key={game._id}
                      onClick={handleClick}
                      className="bg-lime-750 hover:bg-lime-600 border border-lime-800 rounded-md p-2 m-1 font-bold text-xs text-zinc-950 font-serif shadow-md focus:shadow-outline hover:cursor-pointer"
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
