import { Group } from "@visx/group";
import { Line } from "@visx/shape";

interface HorizontalAnnotationBarProps {
  name: string;
  xStart: number;
  xEnd: number;
  y: number;
  color: string;
  classPrefix: string;
}

function HorizontalAnnotationBar({
  name,
  xStart,
  xEnd,
  y,
  color,
  classPrefix,
}: HorizontalAnnotationBarProps) {
  return (
    <Group key={`horizontal-bar-${name}`} name={`horizontal-bar-${name}`}>
      <Line
        className={`${classPrefix}-${name} ${classPrefix}`}
        stroke={color}
        from={{
          x: xStart,
          y: y,
        }}
        to={{
          x: xEnd,
          y: y,
        }}
      />
      <Line
        className={`${classPrefix}-${name} ${classPrefix}`}
        stroke={color}
        from={{
          x: xStart,
          y: y - 10,
        }}
        to={{
          x: xStart,
          y: y + 10,
        }}
      />
      <Line
        className={`${classPrefix}-${name} ${classPrefix}`}
        stroke={color}
        from={{
          x: xEnd,
          y: y - 10,
        }}
        to={{
          x: xEnd,
          y: y + 10,
        }}
      />
    </Group>
  );
}

export default HorizontalAnnotationBar;
