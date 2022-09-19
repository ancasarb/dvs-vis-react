import { penguins, Penguin } from "./data/penguins";
import { scaleLinear, scaleSqrt, scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { GridRows, GridColumns } from "@visx/grid";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Circle, Line } from "@visx/shape";
import { Annotation, HtmlLabel, Label } from "@visx/annotation";
import { median, deviation } from "d3";

export type PenguinsProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const defaultMargin = { top: 30, right: 30, bottom: 50, left: 60 };

// accessors
const billLength = (p: Penguin) => p.billLength;
const billDepth = (p: Penguin) => p.billDepth;
const bodyMass = (p: Penguin) => p.bodyMass;
const species = (p: Penguin) => p.species.toLowerCase();

const penguinSpecies = [...new Set(penguins.map(species))].sort();

const metadata = [
  {
    name: "adelie",
    annotationX: 165,
    annotationY: 90,
    color1: "#ff8c00",
    color2: "#c86e11",
  },
  {
    name: "chinstrap",
    annotationX: 700,
    annotationY: 155,
    color1: "#a034f0",
    color2: "#8800d4",
  },
  {
    name: "gentoo",
    annotationX: 680,
    annotationY: 340,
    color1: "#036f6f",
    color2: "#297b7b",
  },
];

const yScale = scaleLinear<number>({
  domain: [12, Math.max(...penguins.map(billDepth))],
  nice: true,
});

const xScale = scaleLinear<number>({
  domain: [30, Math.max(...penguins.map(billLength))],
  nice: true,
});

const bodyMassScale = scaleSqrt<number>({
  domain: [
    Math.min(...penguins.map(bodyMass)),
    Math.max(...penguins.map(bodyMass)),
  ],
  range: [3, 10],
  nice: true,
});

const colorScale = scaleOrdinal<string>({
  domain: penguinSpecies,
  range: metadata.map((m) => m.color1),
});

const lineColorScale = scaleOrdinal<string>({
  domain: penguinSpecies,
  range: metadata.map((m) => m.color2),
});

const xAxisTicks = 7;
const yAxisTicks = 6;

const medianCalculator = (s: string, accessor: (p: Penguin) => number) => {
  return median(penguins.filter((p) => species(p) === s).map(accessor));
};

const deviationCalculator = (s: string, accessor: (p: Penguin) => number) => {
  return deviation(penguins.filter((p) => species(p) === s).map(accessor));
};

function Penguins({ width, height, margin = defaultMargin }: PenguinsProps) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  yScale.range([yMax, 0]);
  xScale.range([0, xMax]);

  return (
    <div>
      <svg width={width} height={height}>
        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={yScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
            numTicks={yAxisTicks}
          />
          <GridColumns
            scale={xScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
            numTicks={xAxisTicks}
          />
          <AxisBottom
            top={yMax}
            scale={xScale}
            numTicks={xAxisTicks}
            hideAxisLine={true}
            tickStroke="#e0e0e0"
            label="Bill length (mm)"
            labelClassName="penguins-axis-label"
            labelOffset={15}
          />
          <AxisLeft
            scale={yScale}
            numTicks={yAxisTicks}
            hideAxisLine={true}
            tickStroke="#e0e0e0"
            label="Bill depth (mm)"
            labelClassName="penguins-axis-label"
            labelOffset={25}
          />
          <Group name="annotations">
            {penguinSpecies.map((s) => (
              <Group key={`horizontal-bar-${s}`} name={`horizontal-bar-${s}`}>
                <Line
                  className={`penguins-annotation-line-${s}`}
                  stroke={lineColorScale(s) as string}
                  from={{
                    x: xScale(
                      medianCalculator(s, billLength) -
                        deviationCalculator(s, billDepth)
                    ),
                    y: yScale(medianCalculator(s, billDepth)),
                  }}
                  to={{
                    x: xScale(
                      medianCalculator(s, billLength) +
                        deviationCalculator(s, billDepth)
                    ),
                    y: yScale(medianCalculator(s, billDepth)),
                  }}
                />
                <Line
                  className={`penguins-annotation-line-${s}`}
                  stroke={lineColorScale(s) as string}
                  from={{
                    x: xScale(
                      medianCalculator(s, billLength) -
                        deviationCalculator(s, billDepth)
                    ),
                    y: yScale(medianCalculator(s, billDepth)) - 10,
                  }}
                  to={{
                    x: xScale(
                      medianCalculator(s, billLength) -
                        deviationCalculator(s, billDepth)
                    ),
                    y: yScale(medianCalculator(s, billDepth)) + 10,
                  }}
                />
                <Line
                  className={`penguins-annotation-line-${s}`}
                  stroke={lineColorScale(s) as string}
                  from={{
                    x: xScale(
                      medianCalculator(s, billLength) +
                        deviationCalculator(s, billDepth)
                    ),
                    y: yScale(medianCalculator(s, billDepth)) - 10,
                  }}
                  to={{
                    x: xScale(
                      medianCalculator(s, billLength) +
                        deviationCalculator(s, billDepth)
                    ),
                    y: yScale(medianCalculator(s, billDepth)) + 10,
                  }}
                />
              </Group>
            ))}

            {penguinSpecies.map((s) => (
              <Group key={`vertical-bar-${s}`} name={`vertical-bar-${s}`}>
                <Line
                  className={`penguins-annotation-line-${s}`}
                  stroke={lineColorScale(s) as string}
                  from={{
                    x: xScale(medianCalculator(s, billLength)),
                    y: yScale(
                      medianCalculator(s, billDepth) -
                        deviationCalculator(s, billDepth)
                    ),
                  }}
                  to={{
                    x: xScale(medianCalculator(s, billLength)),
                    y: yScale(
                      medianCalculator(s, billDepth) +
                        deviationCalculator(s, billDepth)
                    ),
                  }}
                />
                <Line
                  className={`penguins-annotation-line-${s}`}
                  stroke={lineColorScale(s) as string}
                  from={{
                    x: xScale(medianCalculator(s, billLength)) - 10,
                    y: yScale(
                      medianCalculator(s, billDepth) -
                        deviationCalculator(s, billDepth)
                    ),
                  }}
                  to={{
                    x: xScale(medianCalculator(s, billLength)) + 10,
                    y: yScale(
                      medianCalculator(s, billDepth) -
                        deviationCalculator(s, billDepth)
                    ),
                  }}
                />
                <Line
                  className={`penguins-annotation-line-${s}`}
                  stroke={lineColorScale(s) as string}
                  from={{
                    x: xScale(medianCalculator(s, billLength)) - 10,
                    y: yScale(
                      medianCalculator(s, billDepth) +
                        deviationCalculator(s, billDepth)
                    ),
                  }}
                  to={{
                    x: xScale(medianCalculator(s, billLength)) + 10,
                    y: yScale(
                      medianCalculator(s, billDepth) +
                        deviationCalculator(s, billDepth)
                    ),
                  }}
                />
              </Group>
            ))}
            {penguinSpecies.map((s) => (
              <Annotation
                key={`annotation-median-${s}`}
                x={metadata.find((m) => m.name === s)?.annotationX}
                y={metadata.find((m) => m.name === s)?.annotationY}
              >
                <HtmlLabel
                  key={`annotation-label-${s}`}
                  showAnchorLine={false}
                  className={`penguins-annotation-${s}`}
                >
                  <div className="penguins-annotation-title">
                    {s.toUpperCase()}
                  </div>
                  <div style={{ width: "150px" }}>
                    {`Median length: ${medianCalculator(s, billLength)} mm`}
                  </div>
                  <div style={{ width: "150px" }}>
                    {`Median depth: ${medianCalculator(s, billDepth)} mm`}
                  </div>
                  <div style={{ width: "150px" }}>
                    {`Median body mass: ${
                      medianCalculator(s, bodyMass) / 1000
                    } kg`}
                  </div>
                </HtmlLabel>
              </Annotation>
            ))}
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
                    r={bodyMassScale(annotation.bodyMass)}
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
          </Group>

          <Group name="scatterplot">
            {penguins.map((penguin, i) => (
              <Circle
                key={`penguin-data-point-${i}`}
                className="penguins-data-point"
                cx={xScale(billLength(penguin))}
                cy={yScale(billDepth(penguin))}
                r={bodyMassScale(bodyMass(penguin))}
                fill={colorScale(species(penguin)) as string}
              />
            ))}
          </Group>
        </Group>
      </svg>
    </div>
  );
}

export default Penguins;
