import "./App.css";
import Chart, { ChartProps } from "./Chart";

function App(props: ChartProps) {
  return (
    <div>
      <Chart {...props} />
    </div>
  );
}

export default App;
