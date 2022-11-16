import { Line } from "@visx/shape";
import { random } from "lodash";
import { TickMarksType } from "../model/tickmarks";
import { useSpring, animated } from "react-spring";

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
        const styles = useSpring({ opacity: type === "circle" ? 1 : 0 });

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
            <Group key={"g-" + idx}>
              <Line
                key={"l-" + idx}
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

              <animated.circle
                style={styles}
                className="penguins-annotation-circle"
                key={"c-" + idx}
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
