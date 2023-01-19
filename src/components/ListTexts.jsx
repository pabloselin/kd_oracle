import axios from "axios";
import { useEffect, useState } from "react";

function ListTexts({activeText, onSelectTextId}) {
  const [texts, setTexts] = useState(null);

  useEffect(() => {
    if (!texts) {
      axios.get("api/oracle_backend.php?listtexts").then((res) => {
        setTexts(res.data);
      });
    }
  }, [texts]);

  return (
    <ul className="list-texts">
      {texts &&
        texts.map((text) => (
          <li
            className={activeText === text.id ? "active" : "normal"}
            onClick={() => onSelectTextId(text.id)}
            key={text.id}
          >
            {text.title}
          </li>
        ))}
    </ul>
  );
}

export default ListTexts;
