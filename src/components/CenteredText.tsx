import { FunctionComponent } from "react";
import { Text } from "@visx/text";

interface CenteredTextProps {
    children: string;
    height: number;
    className: string;
}

const CenteredText: FunctionComponent<CenteredTextProps> = ({ children, height, className }) => <Text
    className={className}
    x={0}
    y={height / 2}
    fill="currentColor"
>
    {children}
</Text>;

export default CenteredText;