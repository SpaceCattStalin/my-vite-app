type SvgFillMaskProps = {
    icon: string;
    percent: number;
    baseColor: string;
    fillColor: string;
    size?: number;
};

export default function SvgFillMask({
    icon,
    percent,
    baseColor,
    fillColor,
    size = 60
}: SvgFillMaskProps) {
    console.log(icon);
    return (
        <div
            style={{
                width: size,
                height: size,
                position: "relative",
                mask: `url(${icon}) center / contain no-repeat`,
                //mask: `url(/src/assets/rice.svg) center / contain no-repeat`,

                WebkitMask: `url(${icon}) center / contain no-repeat`,
                backgroundColor: baseColor,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: `${percent}%`,
                    backgroundColor: fillColor,
                }}
            />
        </div>
    );
}
