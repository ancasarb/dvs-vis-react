import { penguins, Penguin } from "./data/penguins";
import { groupBy, summarize, tidy } from "@tidyjs/tidy";
import { extent } from "d3";

import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { Line } from "@visx/shape";
import { GridColumns } from "@visx/grid";
import { AxisBottom } from "@visx/axis";

export type PenguinsProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const defaultMargin = { top: 30, right: 30, bottom: 50, left: 100 };

// accessors
const billRatio = (d: Penguin) => d.billLength / d.billDepth;
const getSpecies = (p: GroupedPenguin) => p.species;

type GroupedPenguin = {
  species: "Adelie" | "Chinstrap" | "Gentoo";
  items: Penguin[];
};

const bySpecies: Array<GroupedPenguin> = tidy(
  penguins,
  groupBy("species", [
    summarize({
      items: (a) => a,
    }),
  ])
);
const species = bySpecies.map(getSpecies).sort();

const yScale = scaleBand({ domain: species.slice().reverse() });
const xScale = scaleLinear({ domain: extent(penguins, billRatio), nice: true });
const colorScale = scaleOrdinal<string>({
  domain: species,
  range: ["#ff8c00", "#a034f0", "#036f6f"],
});

export type PenguinsHistogramProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function PenguinsHistogram({
  width,
  height,
  margin = defaultMargin,
}: PenguinsHistogramProps) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  yScale.range([yMax, 0]);
  xScale.range([0, xMax]);

  return (
    <div>
      <svg width={width} height={height}>
        <Group top={margin.top}>
          {species.map((s) => (
            <Group key={s}>
              <Text
                className="penguins-histogram-label"
                x={0}
                y={yScale(s)}
                fill={colorScale(s) as string}
              >
                {s.toUpperCase()}
              </Text>
            </Group>
          ))}
        </Group>

        <Group left={margin.left} top={margin.top}>
          <GridColumns
            scale={xScale}
            width={xMax}
            height={yMax}
            stroke="#e0e0e0"
          />
          <AxisBottom
            top={yMax}
            scale={xScale}
            hideAxisLine={true}
            tickStroke="#e0e0e0"
            label="Bill ratio"
            labelClassName="penguins-axis-label"
            labelOffset={15}
          />
          {species.map((s) => (
            <Group key={s}>
              {bySpecies
                .filter((group) => group.species == s)[0]
                .items.map((p) => (
                  <Line
                    className="penguins-histogram-line"
                    stroke={colorScale(s) as string}
                    from={{
                      x: xScale(billRatio(p)),
                      y: yScale(s) - 10,
                    }}
                    to={{
                      x: xScale(billRatio(p)),
                      y: yScale(s) + 10,
                    }}
                  />
                ))}
            </Group>
          ))}
        </Group>
      </svg>
    </div>
  );
}

export default PenguinsHistogram;
