import axios from "axios";
import Age from "./Age";
import Purpose from "./Purpose";
import Requirements from "./Requirements";
import Time from "./Time";
import Result from "./Result";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";

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

  const myRef = useRef(null);

  const ageRange = ["no age limit", "5+", "8+", "10+"];
  const timeRange = ["no time limit", "5", "5-7", "5-10", "10-15"];

  const [query, setQuery] = useState({
    purpose: [],
    age: "",
    time: "",
    requir: "",
  });

  const [checkboxes, setCheckboxes] = useState(purposeList);
  const [ageLimit, setAgeLimit] = useState("no age limit");
  const [timeLimit, setTimeLimit] = useState("no time limit");
  const [purpose, setPurpose] = useState([]);
  const [requir, setRequir] = useState(false);
  const [result, setResult] = useState([]);
  const [submitted, setSubmitted] = useState(null);
  const [valueAge, setValueAge] = useState(0);
  const [valueTime, setValueTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (submitted) {
        try {
          const response = await axios.post("/api/search", {
            purpose,
            ageLimit,
            timeLimit,
            requir,
          });
          setResult(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchData();
    // setSubmitted(null);
  }, [submitted]);

  const handleSubmit = async (e) => {
    //powinien zwracać obiekt postaci query

    e.preventDefault();
    setIsLoading(true);

    try {
      const purpose = checkboxes
        .filter((box) => box.checked === true)
        .map((el) => el.name);

      setPurpose(purpose);
      setQuery({
        ...query,
        purpose: purpose,
        age: ageLimit,
        time: timeLimit,
        requir: requir,
      });
      setSubmitted(query);
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      myRef.current.scrollIntoView({ behavior: "smooth" });
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <div ref={myRef}>
          <Result games={result} />
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
                <Button disabled={isLoading} />
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
            <label className="font-bold text-lg">Cel: </label>
            <div className="m-auto grid grid-cols-2 lg:grid-cols-3 text-left text-xs lg:text-sm pl-6">
              {checkboxes.map((box) => (
                <Purpose
                  key={box.name}
                  name={box.name}
                  checked={box.checked}
                  onChange={(e) => {
                    setCheckboxes(
                      checkboxes.map((box) => {
                        if (e.target.name === box.name) {
                          return { ...box, checked: !box.checked };
                        } else return box;
                      })
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
