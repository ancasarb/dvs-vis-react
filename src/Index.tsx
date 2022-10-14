import { Link } from "react-router-dom";

export default function Index() {
  return (
    <ul>
      <li>
        <Link to={"cities"}>Cities</Link>
      </li>
      <li>
        Penguins
        <ul>
          <li>
            <Link to={"penguinsScatterplot"}>Scatterplot</Link>
          </li>
          <li>
            <Link to={"penguinsHistogram"}>Raincloud</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
}
