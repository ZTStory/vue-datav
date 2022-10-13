<template>
    <div class="bb-screen-title">
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 1876 51"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>bb-screen-title</title>
            <defs>
                <linearGradient x1="0.386698263%" y1="100%" x2="100%" y2="100%" id="linearGradient-1">
                    <stop stop-color="#00EBEE" stop-opacity="0" offset="0%"></stop>
                    <stop stop-color="#00EBEE" offset="49.1630928%"></stop>
                    <stop stop-color="#00EBEE" stop-opacity="0" offset="100%"></stop>
                </linearGradient>
                <linearGradient x1="20.8850042%" y1="50%" x2="97.3547308%" y2="50%" id="linearGradient-2">
                    <stop stop-color="#00D4DC" stop-opacity="0" offset="0%"></stop>
                    <stop stop-color="#00C3CC" stop-opacity="0.095388986" offset="51.933837%"></stop>
                    <stop stop-color="#00AAB6" stop-opacity="0.729524626" offset="100%"></stop>
                </linearGradient>
            </defs>
            <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="数据可视化" transform="translate(-35.000000, -12.000000)">
                    <g id="编组" transform="translate(35.000000, 10.000000)">
                        <g id="编组-44" transform="translate(0.000000, 3.000000)">
                            <polyline
                                id="路径"
                                stroke="url(#linearGradient-1)"
                                stroke-width="2"
                                :points="linePoint"></polyline>
                            <path :d="dStartPoint" id="形状结合备份-2" fill="url(#linearGradient-2)"></path>
                            <path
                                :d="dEndPoint"
                                id="形状结合备份-3"
                                fill="url(#linearGradient-2)"
                                transform="translate(1574.000000, 27.000000) scale(-1, 1) translate(-1574.000000, -27.000000) "></path>
                            <rect id="矩形" fill="#11EBD7" :x="lineStart" y="44" :width="width" height="3"></rect>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        <div class="title" :style="{ fontSize: fontSizeVw }">{{ text }}</div>
        <div class="date_stamp">{{ dateStamp }}</div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { DateUtils } from "../../utils/date.util";
import { px2vw } from "../../utils/string.util";
interface Props {
    text: string; //title
    width?: number; //title宽度
    fontSize?: number; //title字体大小
}
const propsV = withDefaults(defineProps<Props>(), {
    text: "",
    width: 612,
    fontSize: 30,
});
// title下方线绘制起点
const lineStart = computed(() => {
    return (612 - propsV.width) / 2 + 621;
});
// 线的点
const linePoint = computed(() => {
    let start1 = 526,
        start2 = 573,
        start3 = 608,
        start4 = 619;
    const addWidth = (612 - propsV.width) / 2;
    return `0 0 ${start1 + addWidth} 0 ${start2 + addWidth} 38 ${start3 + addWidth} 38 ${start4 + addWidth} 49 ${
        1850 - start4 - addWidth
    } 49 ${1850 - start3 - addWidth} 38 ${1850 - start2 - addWidth} 38 ${1850 - start1 - addWidth} 0 1850 0`;
});
// title左侧菱形绘制点
const dStartPoint = computed(() => {
    const addWidth = (612 - propsV.width) / 2;
    let point = "",
        start = 511;
    for (let i = 0; i < 8; i++) {
        point += `M ${start + addWidth},15 L ${start + 25 + addWidth},41 L ${start + 6 + addWidth},41 L ${
            start - 19 + addWidth
        },15 L ${start + addWidth},15 Z`;
        start -= 44;
    }
    return point;
});
// title右侧菱形绘制点
const dEndPoint = computed(() => {
    const addWidth = (612 - propsV.width) / 2;
    let point = "",
        start = 1813;
    for (let i = 0; i < 8; i++) {
        point += `M ${start + addWidth},15 L ${start + 25 + addWidth},41 L ${start + 6 + addWidth},41 L ${
            start - 19 + addWidth
        },15 L ${start + addWidth},15 Z`;
        start -= 44;
    }
    return point;
});
const fontSizeVw = computed(() => {
    return px2vw(propsV.fontSize);
});
const dateStamp = ref(DateUtils.date2String(new Date()));
let intervalId: number | undefined = undefined;
onMounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
    intervalId = window.setInterval(() => {
        dateStamp.value = DateUtils.date2String(new Date());
    }, 1000);
});
</script>

<style scoped lang="less">
.bb-screen-title {
    position: relative;
    width: 100%;
}
.title {
    font-weight: 500;
    color: #11ebd7;
    line-height: 51px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-52%);
}

.date_stamp {
    height: 66px;
    font-size: 22px;
    font-weight: normal;
    color: #11ebd7;
    line-height: 66px;
    position: absolute;
    top: 0;
    right: 0;
}
</style>
