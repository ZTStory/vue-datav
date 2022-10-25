<template>
    <div v-if="flowDirectionList" class="chart_content pdt_12 pdl_12 pdr_12">
        <zt-echart ref="echart" :opts="opts"></zt-echart>
    </div>
</template>

<script setup lang="ts">
import { ZtEchart } from "@ztstory/datav-core";
import type { FlowDirectionItem } from "@/model/model";
import { computed, onUnmounted, ref } from "vue";
import {
    BarDirectionEnum,
    createBarOpts,
    createBarSeriesItem,
    createGradientColors,
} from "@ztstory/datav-core/echarts-opts";
interface Props {
    flowDirectionList?: FlowDirectionItem[];
}

const props = defineProps<Props>();

const echart = ref();
const intervalId: number | undefined = undefined;

const categorys: string[] = [];
const values: string[] = [];

// 最小轮播值
const minLoopLimit = 8;
const minInterval = 8;

const startDynamicData = () => {
    const datas = props.flowDirectionList?.reverse();
    if (!datas || datas.length <= minLoopLimit) {
        return;
    }
    let index = minLoopLimit + 1;
    setInterval(() => {
        categorys.shift();
        values.shift();
        if (index >= datas.length) {
            index = 0;
        }

        categorys.push(datas[index].target);
        values.push(datas[index].count);

        echart.value?.updateOptions({
            yAxis: {
                data: categorys,
            },
            series: {
                data: values,
            },
        });

        index++;
    }, minInterval * 1000);
};

const opts = computed(() => {
    clearInterval(intervalId);
    categorys.length = 0;
    values.length = 0;

    try {
        props.flowDirectionList?.reverse().forEach((item, index) => {
            if (index >= minLoopLimit) {
                throw false;
            }
            categorys.push(item.target);
            values.push(item.count);
        });
    } catch (error) {}

    // 开启动态展示
    startDynamicData();

    const barOpts = createBarOpts(
        [createGradientColors(["#239BFF", "#49D6FF"])],
        categorys,
        BarDirectionEnum.Horizontal
    );
    barOpts.series = [createBarSeriesItem(values, BarDirectionEnum.Horizontal)];
    barOpts.grid = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 25,
        containLabel: true,
        height: "100%",
    };
    return barOpts;
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<style scoped lang="less">
.chart_content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
