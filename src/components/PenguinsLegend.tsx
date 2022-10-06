
import { Annotation, Label } from "@visx/annotation";
import { Circle } from "@visx/shape";
import { Group } from "@visx/group";


interface PenguinsLegendProps {
    scale: (value: number) => number;
}

function PenguinsLegend({ scale }: PenguinsLegendProps) {
    return (
        <Annotation key="circles-size">
            <Label
                x={200}
                y={325}
                className="penguins-annotation-label"
                subtitle="Bubble size represents individual body mass"
                showAnchorLine={false}
                showBackground={false}
            />
            {[
                {
                    cx: 100,
                    cy: 340,
                    bodyMass: 3000,
                    x: 125,
                    y: 375,
                    label: "3 kg",
                },
                {
                    cx: 130,
                    cy: 340,
                    bodyMass: 4000,
                    x: 155,
                    y: 375,
                    label: "4 kg",
                },
                {
                    cx: 160,
                    cy: 340,
                    bodyMass: 5000,
                    x: 185,
                    y: 375,
                    label: "5 kg",
                },
                {
                    cx: 195,
                    cy: 340,
                    bodyMass: 6000,
                    x: 220,
                    y: 375,
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