import { random } from "lodash";
import { animated, TransitionFn } from "react-spring";

interface TickMarsProps<Datum, Variable> {
  data: Datum[];
  getX: (datum: Datum) => Variable;
  xScale: (value: Variable) => number;
  height: number;
  padding: number;
  className: string;
  transition: TransitionFn<boolean, { opacity: 0 | 1 }>;
}

function CircleTickMarks<Datum, Variable>({
  data,
  getX,
  height,
  xScale,
  padding,
  className,
  transition,
}: TickMarsProps<Datum, Variable>) {
  return (
    <>
      {data.map((datum, idx) => {
        const x = xScale(getX(datum));

        const y = random(padding, height - padding, true);

        {
          transition(
            (style, item) =>
              item && (
                <animated.circle
                  style={style}
                  className={className}
                  key={"c-" + idx}
                  cx={x}
                  cy={y}
                  r={2.5}
                  stroke="currentColor"
                  fill="white"
                />
              )
          );
        }
      })}
    </>
  );
}

export default CircleTickMarks;
