import dayjs, { OpUnitType, QUnitType } from "dayjs";
import "dayjs/locale/zh-cn";
import customParseFormt from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import weekday from "dayjs/plugin/weekday";
// 国际化
dayjs.locale("zh-cn");

export const DateUtils = {
    /**
     * 字符串转Date对象
     * @param {String} dateStr
     * @param {String} format
     */
    string2Date(dateStr: string, format = "YYYY-MM-DD HH:mm:ss"): Date {
        dayjs.extend(customParseFormt);
        return dayjs(dateStr, format).toDate();
    },
    /**
     * date对象转字符串
     * @param {Date} date
     * @param {String} format 其中 format 支持 [自定义信息] + format 方式，[]中的内容不会被格式化 YYYY-MM-DD HH:mm:ss
     */
    date2String(date: dayjs.ConfigType, format = "YYYY-MM-DD HH:mm:ss"): string {
        return dayjs(date).format(format);
    },
    /**
     * 字符串日期转格式
     * @param dateStr
     * @param oldFormat
     * @param newFormat
     * @returns
     */
    string2string(dateStr: string, oldFormat = "YYYY-MM-DD HH:mm:ss", newFormat = "YYYY-MM-DD"): string {
        dayjs.extend(customParseFormt);
        return dayjs(dateStr, oldFormat).format(newFormat);
    },
    offset(date1: dayjs.ConfigType, date2: dayjs.ConfigType, type: QUnitType | OpUnitType = "day"): number {
        return dayjs(date1).diff(dayjs(date2), type);
    },
    /**
     * 时间后移
     * @param {Date|String|Number} date
     * @param {number} offset
     * @param {"day"|"week"|"month"|"year"} type
     */
    add(date: dayjs.ConfigType, offset: number, type: dayjs.ManipulateType = "day"): Date {
        return dayjs(date).add(offset, type).toDate();
    },
    /**
     * 时间前移
     * @param {Date|String|Number} date
     * @param {number} offset
     * @param {"day"|"week"|"month"|"year"} type
     */
    subtract(date: dayjs.ConfigType, offset: number, type: dayjs.ManipulateType = "day"): Date {
        return dayjs(date).subtract(offset, type).toDate();
    },
    /**
     * date1 是否在 date2 之前
     * @param {Date|String|Number} date1
     * @param {Date|String|Number} date2
     * @param {"day"|"week"|"month"|"year"} type
     */
    isBefore(date1: dayjs.ConfigType, date2: dayjs.ConfigType, type: dayjs.OpUnitType = "day"): boolean {
        return dayjs(date1).isBefore(date2, type);
    },
    /**
     * date1 是否在 date2 之后
     * @param {Date|String|Number} date1
     * @param {Date|String|Number} date2
     * @param {"day"|"week"|"month"|"year"} type
     */
    isAfter(date1: dayjs.ConfigType, date2: dayjs.ConfigType, type: dayjs.OpUnitType = "day"): boolean {
        return dayjs(date1).isAfter(date2, type);
    },
    /**
     * date1 是否在 date2 之间
     * @param {Date|String|Number} date
     * @param {Array<Date>} dateRange
     * @param {"day"|"week"|"month"|"year"} type
     */
    isBetween(
        date: dayjs.ConfigType,
        dateRange: Array<dayjs.ConfigType>,
        type: dayjs.OpUnitType | null = "day"
    ): boolean {
        if (dateRange.length != 2) {
            return false;
        }
        dayjs.extend(isBetween);
        return dayjs(date).isBetween(dateRange[0], dateRange[1], type);
    },
    /**
     * 返回现在到当前时间的相对时间
     * https://dayjs.gitee.io/docs/zh-CN/display/from-now
     * @param {Date|String|Number} date
     */
    fromNow(date: dayjs.ConfigType): string {
        dayjs.extend(relativeTime);
        dayjs().from(dayjs());
        return dayjs(date).fromNow();
    },
    getWeekDay(date: dayjs.ConfigType): string {
        dayjs.extend(weekday);
        const weekdays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        const offset = this.offset(this.date2String(date, "YYYY-MM-DD"), this.date2String(new Date(), "YYYY-MM-DD"));
        if (offset === 0) {
            return "今天";
        } else if (offset === 1) {
            return "明天";
        } else if (offset === 2) {
            return "后天";
        }
        return weekdays[dayjs(date).weekday()];
    },
    /**
     * 将秒格式化为字符串
     * @param second number
     * @param {"day"|"hour"|"minute"} type
     * @returns
     */
    secondFormatString(second: number, type: "day" | "hour" | "minute" = "hour") {
        if (!second || second === 0) {
            return "0秒";
        }
        let dateString = "";
        const d = Math.floor(second / 24 / 60 / 60);
        const h = Math.floor((second % (24 * 60 * 60)) / (60 * 60));
        const m = Math.floor((second % (60 * 60)) / 60);
        const s = second % 60;
        if (d > 0) {
            dateString += `${d}天`;
            if (type === "day") {
                return dateString;
            }
        }
        if (h > 0) {
            dateString += `${h}小时`;
            if (type === "hour") {
                return dateString;
            }
        }
        if (m > 0) {
            dateString += `${m}分钟`;
            if (type === "minute") {
                return dateString;
            }
        }
        if (s > 0) {
            dateString += `${s}秒`;
        }

        return dateString;
    },
};
