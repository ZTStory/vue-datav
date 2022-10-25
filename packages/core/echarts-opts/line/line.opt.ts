/**
 * {
        color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                {
                    offset: 0,
                    color: "rgba(255, 162, 0, 1)", // 0% 处的颜色
                },
                {
                    offset: 1,
                    color: "rgba(255, 162, 0, 0)", // 100% 处的颜色
                },
            ],
        },
        grid: {
            top: 20,
            bottom: 20,
            left: 30,
            right: 0,
        },
        xAxis: {
            type: "category",
            data: categorys,
            // boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: "#75949D",
                },
            },
        },
        yAxis: {
            type: "value",
            splitLine: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#75949D",
                },
            },
            axisLabel: {
                show: true,
            },
        },
        series: [
            {
                data: values,
                type: "line",
                areaStyle: {},
                smooth: true,
                label: {
                    show: true,
                    position: "top",
                    color: "#75949D",
                    borderColor: "none",
                },
            },
        ],
    };
 */

import { BarDirectionEnum } from "../bar/bar.opt";
import { BBColors, createColorOpts } from "../base/color.opt";
import { createXAxis } from "../base/x-axis.opt";
import { createYAxis } from "../base/y-axis.opt";

/**
 * 快速创建折线图
 * @param colors 颜色
 * @param categorys 类别 可选
 * @returns
 */
export function createLineOpts(colors: BBColors[], categorys?: string[]): any {
    const yAxisOpts = createYAxis(BarDirectionEnum.Vertical, categorys);
    yAxisOpts.splitLine = {
        show: true,
        lineStyle: {
            color: "#132C38"
        }
    };

    const opts: any = {
        grid: {
            top: 20,
            bottom: 20,
            left: 40,
            right: 0,
        },
        color: createColorOpts(colors),
        xAxis: createXAxis(BarDirectionEnum.Vertical, categorys),
        yAxis: yAxisOpts,
    };
    return opts;
}
/**
 * 快速创建折线图 SeriesItem
 * @param values 数据源 可选
 * @param smooth 是否平滑过度 默认 true
 * @param areaStyle 是否开启面积图 默认 不开启
 * @returns
 */
export function createLineSeriesItem(values?: any[], smooth = true, areaStyle: undefined | Object = undefined): any {
    const lineSeriesItem: any = {
        type: "line",
        smooth: smooth,
        label: {
            show: true,
            position: "top",
            color: "#75949D",
            borderColor: "none",
        },
    };
    if (values) {
        lineSeriesItem.data = values;
    }
    if (areaStyle) {
        lineSeriesItem.areaStyle = areaStyle;
    }
    return lineSeriesItem;
}
