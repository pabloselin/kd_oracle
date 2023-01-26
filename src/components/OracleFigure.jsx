import Konva from "konva";
import { Line } from "react-konva";
import { useEffect, useState } from "react";
import { Spring, animated } from "@react-spring/konva";

const OracleFigure = (props) => {
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [prevPoints, setPrevPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [pointsSetted, setPointsSetted] = useState(false);
  const [color, setColor] = useState("hsl(0, 100%, 50%)");
  const [stage, setStage] = useState(0);
  const min = 0;
  const max = 200;

  const makeRandomPoints = (max, min) => {
    const newPoints = points.map((point) => {
      return Number.parseInt(Math.random() * (max - min) + min, 10);
    });

    setPoints(newPoints);
  };

  const makeRandomColor = () => {
    return `hsl(${Math.random() * 360}, 100%, 50%)`;
  };

  const handleClick = () => {
    setPointsSetted(true);
    setStage(stage + 1);
  };

  useEffect(() => {
    props.handleStage(stage);
    props.handleGetPoints(points);
  }, [pointsSetted, stage]);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("timeout");
      setPrevPoints(points);
      makeRandomPoints(max, min);
      setColor(makeRandomColor());
    }, 1000);
    // clear Interval
    return () => clearInterval(timer);
  }, [points, color]);

  return (
    <>
      {stage <= 3 && (
        <Spring native from={{ points: prevPoints }} to={{ points: points }}>
          {(props) => (
            <animated.Line
              x={200 * stage}
              y={0}
              width={200}
              height={200}
              closed
              tension={0.2}
              opacity={1}
              fill={color}
              onClick={handleClick}
              {...props}
            />
          )}
        </Spring>
      )}
    </>
  );
};

export default OracleFigure;
