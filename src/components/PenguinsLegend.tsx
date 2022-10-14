import { Annotation, Label } from "@visx/annotation";
import { Circle } from "@visx/shape";
import { Group } from "@visx/group";

interface PenguinsLegendProps {
  scale: (value: number) => number;
  anchorX: number;
  anchorY: number;
}

function PenguinsLegend({ scale, anchorX, anchorY }: PenguinsLegendProps) {
  return (
    <Annotation key="circles-size">
      <Label
        x={anchorX + 60}
        y={anchorY + 290}
        className="penguins-annotation-label"
        subtitle="Bubble size represents individual body mass"
        showAnchorLine={false}
        showBackground={false}
      />
      {[
        {
          cx: anchorX - 40,
          cy: anchorY + 300,
          bodyMass: 3000,
          x: anchorX - 20,
          y: anchorY + 340,
          label: "3 kg",
        },
        {
          cx: anchorX,
          cy: anchorY + 300,
          bodyMass: 4000,
          x: anchorX + 20,
          y: anchorY + 340,
          label: "4 kg",
        },
        {
          cx: anchorX + 40,
          cy: anchorY + 300,
          bodyMass: 5000,
          x: anchorX + 60,
          y: anchorY + 340,
          label: "5 kg",
        },
        {
          cx: anchorX + 80,
          cy: anchorY + 300,
          bodyMass: 6000,
          x: anchorX + 100,
          y: anchorY + 340,
          label: "6 kg",
        },
      ].map((annotation) => (
        <Group key={annotation.bodyMass}>
          <Circle
            className="penguins-annotation-circle"
            cx={annotation.cx}
            cy={annotation.cy}
            r={scale(annotation.bodyMass)}
            fill="white"
            stroke="#a034f0"
          />
          <Label
            x={annotation.x}
            y={annotation.y}
            subtitle={annotation.label}
            showAnchorLine={false}
            showBackground={false}
          />
        </Group>
      ))}
    </Annotation>
  );
}

export default PenguinsLegend;
