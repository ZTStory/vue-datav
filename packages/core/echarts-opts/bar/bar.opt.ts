import { BBColors } from "../base/color.opt";
import { deepCopy, isArray } from "../../src/utils/common.util";
export enum BarDirectionEnum {
    Horizontal = "Horizontal",
    Vertical = "Vertical",
}

/**
 * 快捷创建柱状图配置，需自行根据需求设置 category
 * @param colors 普通颜色或渐变色
 * @param categorys 坐标轴的类别数据源 可选
 * @param direction 垂直或水平 默认 垂直
 * @returns
 */

export function createBarOpts(colors: BBColors[], categorys?: string[], direction = BarDirectionEnum.Vertical): any {
    return {
        grid: {
            top: 30,
            bottom: 30,
            left: 40
        },
        color: initColorOpts(colors, direction),
        xAxis: init_xAxis(direction, categorys),
        yAxis: init_yAxis(direction, categorys),
    };
}
/**
 * 快捷创建 BarSeriesItem 对象
 * @param values 数据源 可选
 * @param direction 垂直或水平 默认 垂直
 * @returns
 */
export function createBarSeriesItem(values?: any[], direction = BarDirectionEnum.Vertical): any {
    const seriesItem: any = {
        type: "bar",
        barWidth: 8,
        label: {
            show: true,
            position: "right",
            color: "#75949D",
            borderColor: "none",
        },
    };
    if (values) seriesItem.data = values;
    if (BarDirectionEnum.Vertical == direction) {
        seriesItem.label.position = "top";
        seriesItem.showBackground = true;
        seriesItem.backgroundStyle = {
            color: "#132C38",
        };
        return seriesItem;
    }

    return seriesItem;
}

function initColorOpts(colors: BBColors[], direction: BarDirectionEnum) {
    if (colors.length && isArray(colors[0])) {
        const colorOpts: any = {
            x: 0,
            y: 0,
            x2: 0,
            y2: 0,
        };
        colorOpts.type = "linear";

        if (BarDirectionEnum.Vertical == direction) {
            colorOpts.y2 = 1;
        } else {
            colorOpts.x2 = 1;
        }
        return colors.map((v) => {
            colorOpts.colorStops = v;
            return deepCopy(colorOpts);
        });
    }

    return colors;
}

function init_xAxis(direction: BarDirectionEnum, categorys?: string[]) {
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

function init_yAxis(direction: BarDirectionEnum, categorys?: string[]) {
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

export default createBarOpts([
    [
        {
            offset: 0,
            color: "#04FEAC", // 0% 处的颜色
        },
        {
            offset: 1,
            color: "#1EE554", // 100% 处的颜色
        },
    ],
]);
