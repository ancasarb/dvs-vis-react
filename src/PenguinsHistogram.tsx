import { penguins, Penguin } from "./data/penguins";
import { extent, ScaleBand, ScaleOrdinal } from "d3";

import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import { Line } from "@visx/shape";
import { GridColumns } from "@visx/grid";
import { AxisBottom } from "@visx/axis";
import { groupBy } from "lodash";
import { FunctionComponent } from "react";

const defaultMargin = { top: 30, right: 30, bottom: 50, left: 100 };

// accessors
const billRatio = (d: Penguin) => d.billLength / d.billDepth;

const bySpecies = groupBy(
  penguins,
  'species'
);
const speciesList = Object.keys(bySpecies).sort();

const colorScale = scaleOrdinal<string, string>({
  domain: speciesList,
  range: ["#ff8c00", "#a034f0", "#036f6f"],
});

export type PenguinsHistogramProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

interface CenteredTextProps {
  children: string;
  height: number;
}

const CenteredText: FunctionComponent<CenteredTextProps> = ({ children, height }) => <Text
  className="penguins-histogram-label"
  x={0}
  y={height / 2}
  fill="currentColor"
>
  {children}
</Text>;

interface LabelsProps<Value extends string> {
  top: number;
  domain: Value[];
  rowScale: ScaleBand<Value>;
  colorScale: ScaleOrdinal<Value, string>;
}

function Labels<Value extends string>({ top, domain, rowScale, colorScale }: LabelsProps<Value>) {
  return <Group top={top}>
    {domain.map((value) => (
      <Group key={value}
             top={rowScale(value)}
             style={{ color: colorScale(value) }}>
        <CenteredText height={rowScale.bandwidth()}>{value.toUpperCase()}</CenteredText>
      </Group>
    ))}
  </Group>
}

function PenguinsHistogram({
                             width,
                             height,
                             margin = defaultMargin,
                           }: PenguinsHistogramProps) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const yScale = scaleBand({ domain: speciesList, range: [yMax, 0], reverse: true });
  const xScale = scaleLinear({ domain: extent(penguins, billRatio) as [number, number], nice: true, range: [0, xMax] });

  return (
    <div>
      <svg width={width} height={height}>
        <Labels top={margin.top} domain={speciesList} rowScale={yScale} colorScale={colorScale} />

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
          {speciesList.map((species) => {
            const penguins = bySpecies[species];
            const height = yScale.bandwidth();
            const half = height * 0.5;
            return (
              <Group key={species}
                     top={yScale(species)}
                     style={{ color: colorScale(species) }}>
                <Group top={half}>
                  <TickMarks
                    data={penguins}
                    getX={billRatio}
                    height={half}
                    padding={10}
                    xScale={xScale}/>
                </Group>
              </Group>
            );
          })}
        </Group>
      </svg>
    </div>
  );
}

interface TickMarsProps<Datum, Variable> {
  data: Datum[];
  getX: (datum: Datum) => Variable;
  xScale: (value: Variable) => number;
  height: number;
  padding: number;
}

function TickMarks<Datum, Variable>({ data, getX, height, xScale, padding }: TickMarsProps<Datum, Variable>) {
  return <>
    {data.map((datum) => {
      const x = xScale(getX(datum));
      return (
        <Line
          className="penguins-histogram-line"
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
    })}
  </>
}

export default PenguinsHistogram;
