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
    const linesArr = [];
    let lines = text.split("\r");
    // remove empty lines
    lines = lines.filter((line) => line !== "");
    // remove \n
    lines = lines.map((line) => line.replace("\n", ""));
    //separate lines by periods
    lines.forEach((line) => {
      const lineSplit = line.split(".");
      lineSplit.forEach((line) => {
        if (line !== "") {
          linesArr.push(line);
        }
      });
    });
    return linesArr;
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
    if (parsedText.length > 0 && textTitle !== "") {
      //axios post request
      const postContent = {
        text: parsedText,
        title: textTitle,
      };
      axios
        .post(
          (import.meta.env.MODE === "development"
            ? "/api/"
            : import.meta.env.VITE_API_URL) + "oracle_backend.php?appendtext",
          postContent
        )
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

  useEffect(() => {
    if (uploadResponse) {
      props.passUploadResponse(uploadResponse);
    }
  }, [uploadResponse]);

  return (
    <div className="bg-zinc-600 px-4 py-4 text-white">
      <h3 className="text-4xl mb-5 font-display">Sube un texto</h3>
      <form className="kd_upload_form form">
        <input
          className="py-2 px-2 mb-2 text-black block w-full text-3xl"
          type="text"
          name="oracletitle"
          placeholder="Título del texto"
          required
          onChange={(e) => handleTitleChange(e)}
        />
        <label
          onChange={(e) => handleChange(e)}
          className="text-2xl inline-block cursor-pointer"
          htmlFor="oracletext"
        >
          <span className="block bg-white border border-black my-1 text-black p-2">{file ? <>{file.name}</> : <>Clic aquí para seleccionar archivo ...</>}</span>
          <input
            type="file"
            id="oracletext"
            name="oracletext"
            accept=".txt"
            className="hidden"
          />
        </label>
        <button
          className="py-2 px-2 mb-2 border border-black bg-white text-black mt-2 block"
          type="submit"
          disabled={submitted ? "disabled" : false}
          onClick={(e) => handleSubmit(e)}
        >
          Subir archivo
        </button>
        <div className="results p-4 bg-lime-200 text-black text-center mt-3">
          {uploadResponse && <p className="text-2xl">Archivo de texto subido.</p>}
        </div>
        <label className="mt-10 block">
          <h1 className="font-display text-2xl">Instrucciones</h1>
          <ol className="pl-5 mt-5">
            <li>1. Pon un título a tu texto</li>
            <li>2. Sube un archivo de texto con la extensión .txt</li>
            <li>3. El sistema procesará tu texto para poder usarlo como un oráculo.</li>
            <li>4. Tu texto quedará disponible para que otras personas puedan consultarlo. (nunca se leerá completo, solo se proporcionan fragmentos de tu texto)</li>
          </ol>
          
        </label>
      </form>
     
    </div>
  );
};

export default TextUpload;
