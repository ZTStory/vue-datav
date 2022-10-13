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
