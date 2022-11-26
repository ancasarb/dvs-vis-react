import { TickMarksType } from "../model/tickmarks";
import LineTickMarks from "./LineTickMarks";
import CircleTickMarks from "./CircleTickMarks";
import { Transition } from "react-spring";

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
          <LineTickMarks
            {...props}
            opacity={opacity}
            className="penguins-histogram-line"
          />
        ) : (
          <CircleTickMarks
            {...props}
            opacity={opacity}
            className="penguins-annotation-circle"
          />
        );
      }}
    </Transition>
  );
}
