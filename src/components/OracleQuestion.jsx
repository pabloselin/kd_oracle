import { useState, useEffect } from "react";
import axios from "axios";
import OracleFigure from "./OracleFigure";
import { Stage, Layer } from "react-konva";
import OracleStaticFigure from "./OracleStaticFigure";

function OracleQuestion({ textId }) {
  const [data, setData] = useState(null);
  const [sentences, setSentences] = useState(null);

  //incremental steps for getting answers
  const [step, setStep] = useState(0);
  const [archivedPoints, setArchivedPoints] = useState([]);

  const responselength = 3;

  useEffect(() => {
    if (!data) {
      axios
        .get(
          (import.meta.env.MODE === "development"
            ? "/api/"
            : import.meta.env.VITE_API_URL) +
            `oracle_backend.php?gettext&id=${textId}`
        )
        .then((res) => {
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

  const handleGetPoints = (points) => {
    console.log(points, "points");
    setArchivedPoints([...archivedPoints, points]);
  };

  const handleStage = (stage) => {
    console.log(stage, "stage");
    setStep(stage);
  };

  return (
    <div className="container flex align-middle justify-center flex-col h-screen w-full">
      <Stage width={600} height={200} className="mx-auto">
        <Layer>
          {step > 0 &&
            archivedPoints.map((points, index) => {
              console.log(index);
              return (
                <OracleStaticFigure
                  x={index * 200 - 200}
                  points={points}
                  color={"hsl(10, 100%, 100%"}
                />
              );
            })}
          <OracleFigure
            handleStage={(stage) => handleStage(stage)}
            handleGetPoints={(points) => handleGetPoints(points)}
          />
        </Layer>
      </Stage>
      <div className="text-center text-3xl mt-10">
        {sentences &&
          step === 3 &&
          sentences.map((sentence, idx) => <p key={idx}>{sentence}</p>)}
      </div>
    </div>
  );
}

export default OracleQuestion;
