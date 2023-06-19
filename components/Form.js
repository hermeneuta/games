import axios from "axios";
import Age from "./Age";
import Purpose from "./Purpose";
import Requirements from "./Requirements";
import Time from "./Time";
import Result from "./Result";
import Button from "./Button";
import { useState, useEffect } from "react";

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
    console.log("Submitted");
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
  };

  return (
    <>
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <div className="shadow-md p-4 bg-indigo-300 rounded-md border border-blue-400 m-auto max-w-2xl">
            <label className="font-bold">Cel: </label>
            <div className="m-auto grid grid-cols-3 text-left">
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

          <div className="shadow-md bg-indigo-300 flex items-center justify-center gap-20 m-auto mt-1 mb-1 p-4 rounded-md max-w-md border border-blue-400 ">
            <div>
              <label className="font-bold">Wiek: </label>
              {ageRange.map((age) => (
                <Age
                  key={age}
                  name={age}
                  value={age}
                  checked={ageLimit === age}
                  onChange={(e) => {
                    setAgeLimit(e.target.value);
                  }}
                />
              ))}
            </div>

            <div>
              <label className="font-bold">Czas [min]: </label>
              {timeRange.map((t) => (
                <Time
                  key={t}
                  name={t}
                  value={t}
                  checked={timeLimit === t}
                  onChange={(e) => {
                    setTimeLimit(e.target.value);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-sm text-indigo-900">
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

          <div className="m-10">
            <Button />
          </div>
        </form>
        <div>
          <Result games={result} />
        </div>
      </div>
    </>
  );
};

export default Form;
