import { BarDirectionEnum } from "../bar/bar.opt";

export function createYAxis(direction: BarDirectionEnum, categorys?: string[]) {
    const yAxisOpts: any = {
        splitLine: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "#75949D",
            },
        },
    };
    if (BarDirectionEnum.Vertical == direction) {
        yAxisOpts.type = "value";
    } else {
        yAxisOpts.type = "category";
        if (categorys) yAxisOpts.data = categorys;
        yAxisOpts.show = true;
        yAxisOpts.axisLine = {
            show: false,
            lineStyle: {
                color: "#fff",
            },
        };

        yAxisOpts.axisLabel = {
            fontSize: 13,
            margin: 8,
            width: 85,
            overflow: "truncate",
            ellipsis: "...",
        };

        yAxisOpts.axisTick = {
            show: false,
        };
    }

    return yAxisOpts;
}
