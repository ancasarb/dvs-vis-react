import { TickMarksType } from "../model/tickmarks";
import LineTickMarks from "./LineTickMarks";
import CircleTickMarks from "./CircleTickMarks";
import { Transition, animated } from "react-spring";

interface TicksProps<Datum, Variable> {
  type: TickMarksType;
  data: Datum[];
  getX: (datum: Datum) => Variable;
  xScale: (value: Variable) => number;
  height: number;
  padding: number;
}

export default function Ticks<Datum, Variable>({
  type,
  ...props
}: TicksProps<Datum, Variable>) {
  return (
    <Transition
      initial={{ opacity: 1 }}
      items={type}
      from={{ opacity: 0 }}
      enter={{ opacity: 1 }}
      leave={{ opacity: 0 }}
      config={{
        duration: 1000,
      }}
    >
      {({ opacity }, itemType) => {
        return itemType === "line" ? (
          <animated.g style={{ strokeOpacity: opacity }}>
            <LineTickMarks {...props} className="penguins-histogram-line" />
          </animated.g>
        ) : (
          <animated.g style={{ opacity }}>
            <CircleTickMarks
              {...props}
              className="penguins-annotation-circle"
            />
          </animated.g>
        );
      }}
    </Transition>
  );
}
