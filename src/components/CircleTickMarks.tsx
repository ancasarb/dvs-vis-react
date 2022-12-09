import { random } from "lodash";
import { useMemo } from "react";
import ColorContext from "../scripts/color-context";
import { useContext } from "react";

export interface CircleTickMarksProps<Datum, Variable> {
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
}: CircleTickMarksProps<Datum, Variable>) {
  const colorCtx = useContext(ColorContext);

  return (
    <>
      {data.map((datum, idx) => {
        const x = getX(datum);

        const cx = xScale(x);
        const cy = useMemo(
          () => random(padding, height - padding, true),
          [x, idx]
        );

        return (
          <circle
            className={className}
            key={"c-" + idx}
            cx={cx}
            cy={cy}
            r={2.5}
            stroke={colorCtx.color}
            fill="white"
          />
        );
      })}
    </>
  );
}

export default CircleTickMarks;
