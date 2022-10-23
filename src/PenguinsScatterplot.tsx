import { scaleLinear, scaleSqrt, scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { GridRows, GridColumns } from "@visx/grid";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Circle } from "@visx/shape";

import { penguins, Penguin } from "./data/penguins";
import { median, deviation } from "d3";
import { find } from "lodash";

import HorizontalAnnotationBar from "./components/HorizontalAnnotationBar";
import VerticalAnnotationBar from "./components/VerticalAnnotationBar";
import SummaryAnnotations from "./components/SummaryAnnotation";
import PenguinsLegend from "./components/PenguinsLegend";

export type PenguinsScatterplotProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const defaultMargin = { top: 30, right: 30, bottom: 50, left: 60 };

// accessors
const billLength = (p: Penguin) => p.billLength;
const billDepth = (p: Penguin) => p.billDepth;
const bodyMass = (p: Penguin) => p.bodyMass;
const species = (p: Penguin) => p.species;

type Species = Penguin["species"];
const penguinSpecies: Species[] = [...new Set(penguins.map(species))].sort();

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
  range: ["#ff8c00", "#a034f0", "#036f6f"],
});

const annotationColorScale = scaleOrdinal<string>({
  domain: penguinSpecies,
  range: ["#c86e11", "#8800d4", "#297b7b"],
});

const xAxisTicks = 7;
const yAxisTicks = 6;

const medianCalculator = (s: string, accessor: (p: Penguin) => number) => {
  return median(penguins.filter((p) => species(p) === s).map(accessor));
};

const deviationCalculator = (s: string, accessor: (p: Penguin) => number) => {
  return deviation(penguins.filter((p) => species(p) === s).map(accessor));
};

function PenguinsScatterplot({
  width,
  height,
  margin = defaultMargin,
}: PenguinsScatterplotProps) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  yScale.range([yMax, 0]);
  xScale.range([0, xMax]);

  const adelieAnchor = find(
    penguins,
    (p) => billLength(p) < 35 && billDepth(p) > 20
  ) as Penguin;

  const chinstrapAnchor = find(
    penguins,
    (p) => billLength(p) > 55 && billDepth(p) < 18
  ) as Penguin;

  const gentooAnchor = find(penguins, (p) => billLength(p) > 59) as Penguin;

  const summaryAnnotations: Record<Species, { x: number; y: number }> = {
    Adelie: {
      x: xScale(billLength(adelieAnchor)) + 60,
      y: yScale(billDepth(adelieAnchor)) + 50,
    },
    Chinstrap: {
      x: xScale(billLength(chinstrapAnchor)) + 55,
      y: yScale(billDepth(chinstrapAnchor)) - 12,
    },
    Gentoo: {
      x: xScale(billLength(gentooAnchor)),
      y: yScale(billDepth(gentooAnchor)) + 150,
    },
  };
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
              <HorizontalAnnotationBar
                key={s}
                name={s}
                color={annotationColorScale(s) as string}
                xStart={xScale(
                  (medianCalculator(s, billLength) as number) -
                    (deviationCalculator(s, billDepth) as number)
                )}
                xEnd={xScale(
                  (medianCalculator(s, billLength) as number) +
                    (deviationCalculator(s, billDepth) as number)
                )}
                y={yScale(medianCalculator(s, billDepth) as number)}
                classPrefix="penguins-annotation-line"
              />
            ))}

            {penguinSpecies.map((s) => (
              <VerticalAnnotationBar
                key={s}
                name={s}
                color={annotationColorScale(s) as string}
                x={xScale(medianCalculator(s, billLength) as number)}
                yStart={yScale(
                  (medianCalculator(s, billDepth) as number) -
                    (deviationCalculator(s, billDepth) as number)
                )}
                yEnd={yScale(
                  (medianCalculator(s, billDepth) as number) +
                    (deviationCalculator(s, billDepth) as number)
                )}
                classPrefix="penguins-annotation-line"
              />
            ))}
            {penguinSpecies.map((s) => (
              <SummaryAnnotations
                key={s}
                x={summaryAnnotations[s].x as number}
                y={summaryAnnotations[s].y as number}
                title={s.toUpperCase()}
                titleClassName="penguins-annotation-title"
                classSuffix={s}
                summaries={[
                  `Median length: ${medianCalculator(s, billLength)} mm`,
                  `Median depth: ${medianCalculator(s, billDepth)} mm`,
                  `Median body mass: ${
                    (medianCalculator(s, bodyMass) as number) / 1000
                  } kg`,
                ]}
              />
            ))}
            <PenguinsLegend
              scale={bodyMassScale}
              anchorX={xScale(billLength(adelieAnchor))}
              anchorY={yScale(billDepth(adelieAnchor))}
            />
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

export default PenguinsScatterplot;
