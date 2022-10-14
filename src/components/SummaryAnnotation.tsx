import { Annotation, HtmlLabel } from "@visx/annotation";

interface SummaryAnnotationsProps {
    x: number;
    y: number;
    title: string;
    titleClassName: string;
    summaries: string[];
    classSuffix: string;
}


function SummaryAnnotations({ x, y, title, titleClassName, summaries, classSuffix }: SummaryAnnotationsProps) {
    return (
        <Annotation
            key={`summary-annotation-${classSuffix}`}
            x={x}
            y={y}
        >
            <HtmlLabel
                key={`summary-annotation-label-${classSuffix}`}
                showAnchorLine={false}
                className={`summary-annotation-${classSuffix}`}
            >
                <div className={titleClassName}>
                    {title}
                </div>
                {summaries.map((summary, idx) => (
                    <div key={idx} style={{ width: "150px" }}>
                        {summary}
                    </div>
                ))}
            </HtmlLabel>
        </Annotation>
    )
}

export default SummaryAnnotations;
