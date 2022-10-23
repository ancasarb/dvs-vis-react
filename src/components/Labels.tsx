import { ScaleBand, ScaleOrdinal } from "d3";
import { Group } from "@visx/group";
import CenteredText from "./CenteredText";

interface LabelsProps<Value extends string> {
  top: number;
  domain: Value[];
  rowScale: ScaleBand<Value>;
  colorScale: ScaleOrdinal<Value, string>;
  className: string;
}

function Labels<Value extends string>({
  top,
  domain,
  rowScale,
  colorScale,
  className,
}: LabelsProps<Value>) {
  return (
    <Group top={top}>
      {domain.map((value) => (
        <Group
          key={value}
          top={rowScale(value)}
          style={{ color: colorScale(value) }}
        >
          <CenteredText height={rowScale.bandwidth()} className={className}>
            {value.toUpperCase()}
          </CenteredText>
        </Group>
      ))}
    </Group>
  );
}

export default Labels;
