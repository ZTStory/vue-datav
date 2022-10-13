import * as _ from "lodash";

declare const VConsole: any;
function supportVConsole() {
    const vconsole = document.createElement("script");
    vconsole.src = "https://unpkg.com/vconsole/dist/vconsole.min.js";
    document.body.appendChild(vconsole);
    vconsole.onload = () => {
        new VConsole();
        console.log("vconsole 初始化成功");
    };
}

function isBlank(args: any): boolean {
    return _.isEmpty(args);
}

function isNotBlank(args: any): boolean {
    return _.isEmpty(args) === false;
}

function isArray(args: any): boolean {
    return _.isArray(args);
}

function isString(args: any): boolean {
    return _.isString(args);
}

function isNumber(args: any): boolean {
    return _.isNumber(args);
}

// 数字相加
function numAdd(num1: number, num2: number): number {
    return _.add(num1, num2);
}
// 数字相减
function numSub(num1: number, num2: number): number {
    return _.subtract(num1, num2);
}
// 数字相乘
function numMul(num1: number, num2: number): number {
    return _.multiply(num1, num2);
}
// 数字相除
function numDiv(num1: number, num2: number): number {
    return _.divide(num1, num2);
}
// 节流函数
function throttle(fn: (...args: any) => any, delay = 800): (...args: any) => void {
    return _.throttle(fn, delay);
}
// 防抖函数
function debounce(fn: (...args: any) => any, delay = 300): (...args: any) => void {
    return _.debounce(fn, delay);
}
// 对象深拷贝
function deepCopy(value: any): any {
    return _.cloneDeep(value);
}
// 求百分比
function getPercent(number: number, total: number, fixed = 0) {
    return total <= 0 ? "0%" : (Math.round((number / total) * 10000) / 100.0).toFixed(fixed) + "%";
}

export {
    supportVConsole,
    isBlank,
    isNotBlank,
    isArray,
    isString,
    isNumber,
    numAdd,
    numSub,
    numMul,
    numDiv,
    throttle,
    debounce,
    deepCopy,
    getPercent,
};
