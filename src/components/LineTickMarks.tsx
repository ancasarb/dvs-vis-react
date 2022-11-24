import { Line } from "@visx/shape";

interface TickMarsProps<Datum, Variable> {
  data: Datum[];
  getX: (datum: Datum) => Variable;
  xScale: (value: Variable) => number;
  height: number;
  padding: number;
  className: string;
}

function LineTickMarks<Datum, Variable>({
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

        return (
          <Line
            key={idx}
            className={className}
            stroke="currentColor"
            from={{
              x,
              y: padding,
            }}
            to={{
              x,
              y: height - padding,
            }}
          />
        );
      })}
    </>
  );
}

export default LineTickMarks;
