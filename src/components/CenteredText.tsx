import { FunctionComponent } from "react";
import { Text } from "@visx/text";

import { useContext } from "react";
import ColorContext from "../scripts/color-context";

interface CenteredTextProps {
  children: string;
  height: number;
  className: string;
}

const CenteredText: FunctionComponent<CenteredTextProps> = ({
  children,
  height,
  className,
}) => {
  const colorCtx = useContext(ColorContext);
  return (
    <Text className={className} x={0} y={height / 2} fill={colorCtx.color}>
      {children}
    </Text>
  );
};

export default CenteredText;
