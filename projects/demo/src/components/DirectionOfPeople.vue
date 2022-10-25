<template>
    <div v-if="flowDirectionList" class="chart_content pdt_12 pdl_12 pdr_12">
        <zt-echart ref="echart" :opts="opts"></zt-echart>
    </div>
</template>

<script setup lang="ts">
import { ZtEchart } from "@ztstory/datav-core";
import type { FlowDirectionItem } from "@/model/model";
import { computed, ref } from "vue";
import {
    createBarOpts,
    createGradientColors,
    BarDirectionEnum,
    createBarSeriesItem,
} from "@ztstory/datav-core/echarts-opts";
interface Props {
    flowDirectionList?: FlowDirectionItem[];
}

const props = defineProps<Props>();
const echart = ref();
const categorys: string[] = [];
const values: string[] = [];

const opts = computed(() => {
    categorys.length = 0;
    values.length = 0;
    try {
        props.flowDirectionList?.reverse().forEach((item, index) => {
            if (index >= 8) {
                throw false;
            }
            categorys.push(item.target);
            values.push(item.count);
        });
    } catch (error) {}

    const barOpts = createBarOpts(
        [createGradientColors(["#8A23FF", "#BE49FF"])],
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
</script>

<style scoped lang="less">
.chart_content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
