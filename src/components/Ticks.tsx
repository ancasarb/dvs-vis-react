import { TickMarksType } from "../model/tickmarks";
import LineTickMarks, { LineTickMarksProps } from "./LineTickMarks";
import CircleTickMarks, { CircleTickMarksProps } from "./CircleTickMarks";
import { animated, Transition } from "react-spring";
import { FunctionComponent } from "react";

interface TicksProps<Datum, Variable> {
  type: TickMarksType;
  data: Datum[];
  getX: (datum: Datum) => Variable;
  xScale: (value: Variable) => number;
  height: number;
  padding: number;
}
const AnimatedLineTickMarks = animated(LineTickMarks);
const AnimatedCircleTickMarks = animated(CircleTickMarks);

export default function Ticks<Datum, Variable>({
  type,
  ...props
}: TicksProps<Datum, Variable>) {
  const LineTicks = AnimatedLineTickMarks as FunctionComponent<
    LineTickMarksProps<Datum, Variable>
  >;
  const CircleTicks = AnimatedCircleTickMarks as FunctionComponent<
    CircleTickMarksProps<Datum, Variable>
  >;

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
          <LineTicks
            {...props}
            opacity={opacity}
            className="penguins-histogram-line"
          />
        ) : (
          <CircleTicks
            {...props}
            opacity={opacity}
            className="penguins-annotation-circle"
          />
        );
      }}
    </Transition>
  );
}
