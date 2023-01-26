import axios from "axios";
import { useEffect, useState } from "react";

function ListTexts({ activeText, onSelectTextId }) {
  const [texts, setTexts] = useState(null);

  useEffect(() => {
    if (!texts) {
      axios
        .get(
          (import.meta.env.MODE === "development"
            ? "/api/"
            : import.meta.env.VITE_API_URL) + "oracle_backend.php?listtexts"
        )
        .then((res) => {
          setTexts(res.data);
        });
    }
  }, [texts]);

  return (
    <div className="bg-slate-300 px-4 py-4 border border-red-400 text-black">
      <h2 className="text-2xl mb-4">Textos disponibles</h2>
      <p>
        Escoge un texto para utilizar de referencia para generar la respuesta.
      </p>
      <ul className="list-texts py-4">
        {texts &&
          texts.map((text) => (
            <li
              className={
                "px-2 py-2 border border-gray-900 font-bold mb-4 cursor-pointer hover:bg-white"
              }
              onClick={() => onSelectTextId(text.id)}
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
