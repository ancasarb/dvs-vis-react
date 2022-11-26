import { random } from "lodash";

interface TickMarsProps<Datum, Variable> {
  data: Datum[];
  getX: (datum: Datum) => Variable;
  xScale: (value: Variable) => number;
  height: number;
  padding: number;
  className: string;
}

function CircleTickMarks<Datum, Variable>({
  data,
  getX,
  height,
  xScale,
  padding,
  className,
}: TickMarsProps<Datum, Variable>) {
  return (
    <>
      {data.map((datum, idx) => {
        const x = xScale(getX(datum));

        const y = random(padding, height - padding, true);

        return (
          <circle
            className={className}
            key={"c-" + idx}
            cx={x}
            cy={y}
            r={2.5}
            stroke="currentColor"
            fill="white"
          />
        );
      })}
    </>
  );
}

export default CircleTickMarks;
