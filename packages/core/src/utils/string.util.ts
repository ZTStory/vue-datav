const _randomCharStr = "abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQQRSTUVWXYZ1234567890";
/**
 * 生成随机字符串
 * @param count 字符串长度
 * @returns
 */
export function randomString(count = 8) {
    let uuid = "";
    for (let index = 0; index < count; index++) {
        const random = Math.random() * _randomCharStr.length;
        uuid += _randomCharStr.charAt(Math.floor(random));
    }
    return uuid;
}

export function px2vw(px: number, root: number = 1920, fixed = 6) {
    // 已替换为 scale 方案，代码保留仅供参考
    // const res = (px / root) * 100;
    // return `${res.toFixed(fixed)}vw`;
    return `${px}px`;
}
