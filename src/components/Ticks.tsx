import { TickMarksType } from "../model/tickmarks";
import LineTickMarks from "./LineTickMarks";
import CircleTickMarks from "./CircleTickMarks";

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
  return type === "line" ? (
    <LineTickMarks {...props} className="penguins-histogram-line" />
  ) : (
    <CircleTickMarks {...props} className="penguins-annotation-circle" />
  );
}
