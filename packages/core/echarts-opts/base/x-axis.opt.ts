import { BarDirectionEnum } from "../bar/bar.opt";


export function createXAxis(direction: BarDirectionEnum, categorys?: string[]) {
    const xAxisOpts: any = {
        axisLine: {
            lineStyle: {
                color: "#75949D",
            },
        },
    };

    if (BarDirectionEnum.Vertical == direction) {
        xAxisOpts.type = "category";
        if (categorys) xAxisOpts.data = categorys;
    } else {
        xAxisOpts.type = "value";
        xAxisOpts.show = false;
        xAxisOpts.axisLine = {
            show: false,
        };
        xAxisOpts.splitLine = {
            show: false,
        };
    }
    return xAxisOpts;
}

