import { TickMarksType, types } from "../model/tickmarks";
import { Select } from "antd";

interface TickMarksSelectorProps {
  selected: TickMarksType;
  onSelect: (type: TickMarksType) => void;
}

export default function TickMarksSelector({
  selected,
  onSelect,
}: TickMarksSelectorProps) {
  return (
    <Select value={selected} onSelect={onSelect}>
      {types.map((t) => (
        <Select.Option value={t} key={t}>
          {t}
        </Select.Option>
      ))}
    </Select>
  );
}
