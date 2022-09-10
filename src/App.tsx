import React from "react";
import "./App.css";
import Chart from "./Chart";

import { shuffle } from "lodash";

const allCities = ["New York", "San Francisco", "Austin"];

export type AppProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function App(props: AppProps) {
  const [cities, setCities] = React.useState(() => {
    return {
      firstCity: allCities[0],
      secondCity: allCities[1],
    };
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = shuffle(cities);
      setCities({ firstCity: shuffled[0], secondCity: shuffled[1] });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Chart {...{ ...props, ...cities }} />
    </div>
  );
}

export default App;
