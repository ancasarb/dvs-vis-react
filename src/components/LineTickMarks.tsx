import { Line } from "@visx/shape";
import { useContext } from "react";
import ColorContext from "../scripts/color-context";

export interface LineTickMarksProps<Datum, Variable> {
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
}: LineTickMarksProps<Datum, Variable>) {
  const colorCtx = useContext(ColorContext);

  return (
    <>
      {data.map((datum, idx) => {
        const x = xScale(getX(datum));

        return (
          <Line
            key={idx}
            className={className}
            stroke={colorCtx.color}
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
