import { random } from "lodash";
import { TickMarksType } from "../model/tickmarks";
import { useSpring, animated } from "react-spring";

interface TickMarsProps<Datum, Variable> {
  data: Datum[];
  getX: (datum: Datum) => Variable;
  xScale: (value: Variable) => number;
  height: number;
  padding: number;
  className: string;
  type: TickMarksType;
}

function CircleTickMarks<Datum, Variable>({
  data,
  getX,
  height,
  xScale,
  padding,
  className,
  type,
}: TickMarsProps<Datum, Variable>) {
  const styles = useSpring({ opacity: type === "circle" ? 1 : 0 });

  return (
    <>
      {data.map((datum, idx) => {
        const x = xScale(getX(datum));

        const y = random(padding, height - padding, true);
        return (
          <animated.circle
            style={styles}
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
