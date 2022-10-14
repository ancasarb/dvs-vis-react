import { Variable, variables } from "../model/variable";

interface VariableSelectorProps {
  selected: Variable;
  onSelect: (variable: Variable) => void;
}

export default function VariableSelector({
  selected,
  onSelect,
}: VariableSelectorProps) {
  return (
    <div>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value as Variable)}
      >
        {variables.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}
