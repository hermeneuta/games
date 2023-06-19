import axios from "axios";
import Age from "./Age";
import Purpose from "./Purpose";
import Requirements from "./Requirements";
import Time from "./Time";
import Result from "./Result";
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
      <div>Pick your game</div>
      <div className="text-center">
        <form onSubmit={handleSubmit}>
          <label>Cel: </label>
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

          <label>Wiek: </label>
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

          <label>Czas [min]: </label>
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

          <button type="submit" className="block mt-5 pl-5">
            Szukaj
          </button>
        </form>
        <Result games={result} />
      </div>
    </>
  );
};

export default Form;
