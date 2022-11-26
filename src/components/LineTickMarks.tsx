import { Line } from "@visx/shape";

export interface LineTickMarksProps<Datum, Variable> {
  data: Datum[];
  getX: (datum: Datum) => Variable;
  xScale: (value: Variable) => number;
  height: number;
  padding: number;
  className: string;
  opacity: number;
}

function LineTickMarks<Datum, Variable>({
  data,
  getX,
  height,
  xScale,
  padding,
  className,
  opacity,
}: LineTickMarksProps<Datum, Variable>) {
  return (
    <>
      {data.map((datum, idx) => {
        const x = xScale(getX(datum));

        return (
          <Line
            key={idx}
            className={className}
            stroke="currentColor"
            strokeOpacity={opacity}
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
