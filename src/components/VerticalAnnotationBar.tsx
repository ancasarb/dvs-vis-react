import { Group } from "@visx/group";
import { Line } from "@visx/shape";

interface VerticalAnnotationBarProps {
    name: string;
    yStart: number;
    yEnd: number;
    x: number
    color: string;
    classPrefix: string;
}


function VerticalAnnotationBar({ name, yStart, yEnd, x, color, classPrefix }: VerticalAnnotationBarProps) {
    return (
        <Group key={`vertical-bar-${name}`} name={`vertical-bar-${name}`}>
            <Line
                className={`${classPrefix}-${name}`}
                stroke={color}
                from={{
                    x: x,
                    y: yStart,
                }}
                to={{
                    x: x,
                    y: yEnd,
                }}
            />
            <Line
                className={`${classPrefix}-${name}`}
                stroke={color}
                from={{
                    x: x - 10,
                    y: yStart,
                }}
                to={{
                    x: x + 10,
                    y: yStart,
                }}
            />
            <Line
                className={`${classPrefix}-${name}`}
                stroke={color}
                from={{
                    x: x - 10,
                    y: yEnd,
                }}
                to={{
                    x: x + 10,
                    y: yEnd,
                }}
            />
        </Group>
    )
}

export default VerticalAnnotationBar;