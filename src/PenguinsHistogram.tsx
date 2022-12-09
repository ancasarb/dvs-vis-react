import { Penguin, penguins } from "./data/penguins";
import { groupBy, mean } from "lodash";
import { bin, extent, max } from "d3";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { curveMonotoneX } from "@visx/curve";

import { Group } from "@visx/group";
import { GridColumns } from "@visx/grid";
import { AxisBottom } from "@visx/axis";
import { Area, Circle } from "@visx/shape";
import { Text } from "@visx/text";

import Labels from "./components/Labels";
import Ticks from "./components/Ticks";
import TickMarksSelector from "./components/TickMarksSelector";
import { TickMarksType } from "./model/tickmarks";

import { useMemo, useReducer } from "react";
import {
  accessorForVariable,
  titleForVariable,
  Variable,
} from "./model/variable";
import VariableSelector from "./components/VariableSelector";
import { Card, Space } from "antd";

import ColorContext from "./scripts/color-context";

const defaultMargin = { top: 30, right: 30, bottom: 50, left: 100 };

const bySpecies = groupBy(penguins, "species");

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

function PenguinsHistogram({
  width,
  height,
  margin = defaultMargin,
}: PenguinsHistogramProps) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  type State = { variable: Variable; ticks: TickMarksType };
  type Action =
    | { type: "change_variable"; newVariable: Variable }
    | { type: "change_ticks"; newTicks: TickMarksType };

  function stateReducer(state: State, action: Action): State {
    switch (action.type) {
      case "change_variable": {
        return {
          ...state,
          variable: action.newVariable,
          ticks: "line",
        };
      }

      case "change_ticks": {
        return {
          ...state,
          ticks: action.newTicks,
        };
      }
    }
  }

  const [{ variable, ticks }, dispatch] = useReducer(stateReducer, {
    variable: "ratio",
    ticks: "line",
  });

  const accessor = useMemo(() => accessorForVariable(variable), [variable]);
  const title = titleForVariable(variable);

  const yScale = useMemo(
    () =>
      scaleBand({
        domain: speciesList,
        range: [yMax, 0],
        reverse: true,
      }),
    [speciesList, yMax]
  );
  const xScale = useMemo(
    () =>
      scaleLinear({
        domain: extent(penguins, accessor) as [number, number],
        nice: true,
        range: [0, xMax],
      }),
    [penguins, accessor, xMax]
  );

  const onVariableSelect = (value: Variable) => {
    dispatch({ type: "change_variable", newVariable: value });
  };

  const onTicksTypeSelect = (value: TickMarksType) => {
    dispatch({ type: "change_ticks", newTicks: value });
  };

  return (
    <Card>
      <Space direction="vertical" size="large">
        <Space size="small">
          <VariableSelector selected={variable} onSelect={onVariableSelect} />
          <TickMarksSelector selected={ticks} onSelect={onTicksTypeSelect} />
        </Space>
        <svg width={width} height={height}>
          <Labels
            top={margin.top}
            domain={speciesList}
            rowScale={yScale}
            colorScale={colorScale}
            className="penguins-histogram-label"
          />

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
              label={title}
              labelClassName="penguins-axis-label"
              labelOffset={15}
            />
            {speciesList.map((species) => {
              const penguins = bySpecies[species];
              const height = yScale.bandwidth();
              const half = height * 0.5;

              const binFn = bin<Penguin, number>()
                .value(accessor)
                .thresholds(20);
              type MyBin = Array<Penguin> & {
                x0: number;
                x1: number;
                length: number;
              };
              const series = binFn(penguins) as MyBin[];

              const count = (bin: MyBin) => bin.length;
              const binMidPoint = (bin: MyBin) => (bin.x0 + bin.x1) / 2;

              const xFn = (bin: MyBin) => xScale(binMidPoint(bin));
              const rowScale = scaleLinear()
                .domain([0, max(series, count) as number])
                .range([half, 0]);
              const yFn = (bin: MyBin) => rowScale(count(bin));

              const billRatioMean = mean(penguins.map(accessor));
              const meanX = xScale(mean(penguins.map(accessor)));

              const xFinal = xFn(series[series.length - 1]);

              return (
                <ColorContext.Provider value={{ color: colorScale(species) }}>
                  <Group
                    key={species}
                    top={yScale(species)}
                    style={{ color: colorScale(species) }}
                  >
                    <Group top={0}>
                      <Area
                        data={series}
                        x0={xFn}
                        x1={xFn}
                        y1={yFn as any}
                        y0={() => half}
                        strokeWidth={1}
                        stroke={colorScale(species)}
                        fill={colorScale(species)}
                        curve={curveMonotoneX}
                        className="penguin-histogram"
                      />
                      <Group top={half}>
                        <Circle
                          className="penguins-annotation-circle"
                          cx={meanX}
                          cy={0}
                          r={3}
                          stroke={colorScale(species)}
                          fill={colorScale(species)}
                        />
                        <Text
                          x={meanX}
                          y={-10}
                          fill="white"
                          className="penguins-histogram-annotation"
                        >
                          {billRatioMean.toFixed(2)}
                        </Text>
                        <Text
                          x={xFinal + 2}
                          y={0}
                          fill={colorScale(species)}
                          className="penguins-histogram-annotation"
                        >
                          {"n=" + penguins.length}
                        </Text>
                      </Group>
                    </Group>

                    <Group top={half}>
                      <Ticks
                        type={ticks}
                        data={penguins}
                        getX={accessor}
                        xScale={xScale}
                        height={half}
                        padding={10}
                      />
                    </Group>
                  </Group>
                </ColorContext.Provider>
              );
            })}
          </Group>
        </svg>
      </Space>
    </Card>
  );
}

export default PenguinsHistogram;
