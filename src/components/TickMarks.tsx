import { Line, Circle } from "@visx/shape";
import { random } from "lodash";
import { TickMarksType } from "../model/tickmarks";

import { Group } from "@visx/group";

interface TickMarsProps<Datum, Variable> {
  data: Datum[];
  getX: (datum: Datum) => Variable;
  xScale: (value: Variable) => number;
  height: number;
  padding: number;
  className: string;
  type: TickMarksType;
}

function TickMarks<Datum, Variable>({
  data,
  getX,
  height,
  xScale,
  padding,
  className,
  type,
}: TickMarsProps<Datum, Variable>) {
  return (
    <>
      {data.map((datum, idx) => {
        const x = xScale(getX(datum));

        if (type === "line") {
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
        } else {
          const y = random(padding, height - padding, true);
          return (
            <Group>
              <Line
                key={idx}
                className={className + "-out"}
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

              <Circle
                className="penguins-annotation-circle"
                cx={x}
                cy={y}
                r={2.5}
                stroke="currentColor"
                fill="white"
              />
            </Group>
          );
        }
      })}
    </>
  );
}

export default TickMarks;
