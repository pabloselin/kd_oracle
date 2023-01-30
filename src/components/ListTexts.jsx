import axios from "axios";
import { useEffect, useState } from "react";

function ListTexts({ activeText, onSelectTextId, newUpload }) {
  const [texts, setTexts] = useState(null);

  useEffect(() => {
    if (!texts) {
      getTextsList();
    }
  }, [texts]);

  const getTextsList = () => {
    axios
      .get(
        (import.meta.env.MODE === "development"
          ? "/api/"
          : import.meta.env.VITE_API_URL) + "oracle_backend.php?listtexts"
      )
      .then((res) => {
        setTexts(res.data);
      });
  };

  useEffect(() => {
    if (newUpload) {
      getTextsList();
    }
  });

  return (
    <div className="bg-slate-300 px-4 py-4 border border-red-400 text-black w-3/4">
      <h2 className="text-2xl mb-4 font-display">Textos disponibles</h2>
      <p>
        Puedes usar cualquiera de los textos de más abajo para usar de base a tu pregunta.
      </p>
      <p>
        También puedes subir un texto propio en la sección de "Subir texto"
      </p>
      <ul className="list-texts py-4 h-80 overflow-y-scroll">
        {texts &&
          texts.map((text) => (
            <li
              className={`${
                text.id === activeText ? "bg-green-300 font-bold" : "bg-gray font-normal"
              } px-2 py-2 border border-gray-600 mb-4 cursor-pointer hover:bg-white`}
              onClick={() => onSelectTextId(text.id, text.title)}
              key={text.id}
            >
              {text.title}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ListTexts;
