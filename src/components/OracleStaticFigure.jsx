import { Line } from "react-konva";

const OracleStaticFigure = (props) =>  {
    return <Line
    points={props.points}
    x={props.x}
    y={0}
    width={200}
    height={200}
    closed
    tension={0.2}
    opacity={1}
    fill={props.color}
  />
}

export default OracleStaticFigure;