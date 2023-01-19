import { useState, useEffect } from "react";
import axios from "axios";

function OracleQuestion({ textId }) {
  const [data, setData] = useState(null);
  const [sentences, setSentences] = useState(null);

  const responselength = 3;

  useEffect(() => {
    if (!data) {
      axios.get(`api/oracle_backend.php?gettext&id=${textId}`).then((res) => {
        setData(res.data);
      });
    }
  }, [data]);

  useEffect(() => {
    if (!sentences && data) {
        const indexes = [];
        for (let i = 0; i < responselength; i++) { 
            const idxsentence = data.text[pickRandomIndex(data.text.length)];
            indexes.push(idxsentence);
        }
      setSentences(indexes);
    }
  }, [data, sentences]);

  const pickRandomIndex = (length) => {
    return Math.floor(Math.random() * length);
  };

  return <div>{sentences && sentences.map((sentence, idx) => <p key={idx}>{sentence}</p>)}</div>;
}

export default OracleQuestion;
