/**
 * 快速创建饼图配置
 * @param colors 颜色数组
 * @returns
 */
export function createPieOpts(colors: string[]): any {
    return {
        color: colors,
        grid: { top: 0, right: 0, left: 0, bottom: 0 },
    };
}
/**
 * 快速创建饼图 SeriesItem
 * @param values 数据源 可选
 * @param isRing 是否为环状图 默认为 true
 * @returns
 */
export function createPieSeriesItem(values?: any[], isRing = true): any {
    const seriesItem: any = {
        type: "pie",
        label: {
            show: false,
        },
        labelLine: {
            show: false,
        },
    };
    if (values) {
        seriesItem.data = values;
    }
    if (isRing) {
        seriesItem.radius = ["50%", "70%"];
    }
    return seriesItem;
}
