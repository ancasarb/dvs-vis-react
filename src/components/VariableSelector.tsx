import { Variable, variables } from "../model/variable";
import { Select } from "antd";

interface VariableSelectorProps {
  selected: Variable;
  onSelect: (variable: Variable) => void;
}

export default function VariableSelector({
  selected,
  onSelect,
}: VariableSelectorProps) {
  return (
    <Select value={selected} onSelect={onSelect}>
      {variables.map((variable) => (
        <Select.Option value={variable} key={variable}>
          {variable}
        </Select.Option>
      ))}
    </Select>
  );
}
