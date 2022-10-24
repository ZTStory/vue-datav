<template>
    <div :id="uid" class="echart"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { randomString } from "../../utils/string.util";
import { nextTick, onMounted, watch } from "vue";
import { EventBusUtils } from "../../utils/eventbus.util";
const uid = randomString();

interface Props {
    opts: any;
    geoJson?: any;
}

const props = withDefaults(defineProps<Props>(), {
    opts: Object.create(null),
    geoJson: null,
});

let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
    const div = document.getElementById(uid)!;
    chartInstance = echarts.init(div, undefined, {
        renderer: "canvas",
    });

    EventBusUtils.addObserve("WindowResize", () => {
        chartInstance?.resize();
    });

    if (props.geoJson) {
        echarts.registerMap("ZheJiang", props.geoJson);
    }

    chartInstance.setOption(props.opts);
    nextTick(() => {
        chartInstance?.resize();
    });
});

const updateOptions = (opts: any) => {
    if (!chartInstance) {
        return;
    }

    chartInstance.setOption(opts);
};

watch(
    () => props.opts,
    () => {
        // 先 resize，再 setOptions 否则动画会丢失
        chartInstance?.resize();
        chartInstance?.setOption(props.opts);
    }
);

defineExpose({
    chartInstance,
    updateOptions,
});
</script>

<style scoped>
.echart {
    width: 100%;
    height: 100%;
}
</style>
