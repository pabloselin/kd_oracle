//upload component
import { useState, useEffect } from "react";
import axios from "axios";

const TextUpload = (props) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [textTitle, setTextTitle] = useState("");
  const [parsedText, setParsedText] = useState([]);
  const [uploadResponse, setUploadResponse] = useState(null);

  const parseText = (text) => {
    let lines = text.split("\r");
    // remove empty lines
    lines = lines.filter((line) => line !== "");
    // remove \n
    lines = lines.map((line) => line.replace("\n", ""));
    return lines;
  };

  useEffect(() => {
    if (text) {
      setParsedText(parseText(text));
    }
  }, [text]);

  useEffect(() => {
    if (submitted) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target.result;
        setText(text);
      };
      reader.readAsText(file);
    }
  }, [submitted, file]);

  useEffect(() => {
    if (parsedText.length > 0) {
      //axios post request
      const postContent = {
        text: parsedText,
        title: textTitle,
      };
      axios
        .post("api/oracle_backend.php?appendtext", postContent)
        .then((res) => {
          console.log(res.data);
          setUploadResponse(res.data);
        });
    }
  }, [parsedText]);

  const handleChange = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", e);
    setSubmitted(true);
  };

  const handleTitleChange = (e) => {
    setTextTitle(e.target.value);
  };

  return (
    <div>
      <form className="kd_upload_form form">
        <input
          type="text"
          name="oracletitle"
          placeholder="Título"
          required
          onChange={(e) => handleTitleChange(e)}
        />
        <input
          type="file"
          name="oracletext"
          onChange={(e) => handleChange(e)}
          accept=".txt"
        />
        <button
          type="submit"
          disabled={submitted ? "disabled" : false}
          onClick={(e) => handleSubmit(e)}
        >
          Enviar
        </button>
        <label>
          <p>Puedes subir un texto en formato .txt.</p>
          <p>
            Cada línea será desagregada y utilizada como una posible respuesta a
            tu pregunta
          </p>
          <p>Los textos poéticos van muy bien para generar un oráculo. También cualquier texto evocativo podría servir.</p>
          <p>Ten en cuenta que cada texto subido se agregará a un indice de disponibilidad de textos</p>
        </label>
      </form>
      <div className="results">
        {uploadResponse && <p>Archivo de texto subido.</p>}
      </div>
    </div>
  );
};

export default TextUpload;
