import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Cities from "./Cities";

import { shuffle } from "lodash";
import Penguins from "./Penguins";

export type AppProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

function App(props: AppProps) {
  const allCities = ["New York", "San Francisco", "Austin"];

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
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/cities"
          element={<Cities {...{ ...props, ...cities }} />}
        />
        <Route path="/penguins" element={<Penguins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
