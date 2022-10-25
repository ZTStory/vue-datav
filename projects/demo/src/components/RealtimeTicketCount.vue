<template>
    <div class="flex_column">
        <card :width="343" :height="272" type="inner" text="折线面积图1">
            <div class="echart_content">
                <zt-echart :opts="saleOpts"></zt-echart>
            </div>
        </card>
        <card class="mgt_14" :width="343" :height="272" type="inner" text="折线面积图2">
            <div class="echart_content">
                <zt-echart :opts="checkOpts"></zt-echart>
            </div>
        </card>
    </div>
</template>

<script setup lang="ts">
import { CountDateItem } from "@/model/model";
import { Card, ZtEchart } from "@ztstory/datav-core";
import { createGradientColors, createLineOpts, createLineSeriesItem } from "@ztstory/datav-core/echarts-opts";
import { computed } from "vue";

interface Props {
    checkTicketList?: CountDateItem[];
    saleTicketList?: CountDateItem[];
}

const props = defineProps<Props>();

const saleOpts = computed(() => {
    const categorys: string[] = [];
    const values: string[] = [];

    if (props.saleTicketList) {
        categorys.push(
            ...props.saleTicketList.map((item, index) => {
                return index.toString();
            })
        );
        values.push(...props.saleTicketList.map((item) => item.count));
    }

    const lineOpts = createLineOpts(
        [createGradientColors(["rgba(255, 162, 0, 1)", "rgba(255, 162, 0, 0)"])],
        categorys
    );
    lineOpts.series = [createLineSeriesItem(values, true, {})];
    return lineOpts;
});

const checkOpts = computed(() => {
    const categorys: string[] = [];
    const values: string[] = [];

    if (props.checkTicketList) {
        categorys.push(
            ...props.checkTicketList.map((item, index) => {
                return index.toString();
            })
        );
        values.push(...props.checkTicketList.map((item) => item.count));
    }

    const lineOpts = createLineOpts(
        [createGradientColors(["rgba(56, 171, 249, 1)", "rgba(56, 171, 249, 0)"])],
        categorys
    );
    lineOpts.series = [createLineSeriesItem(values, true, {})];
    return lineOpts;
});
</script>

<style scoped lang="less">
.echart_content {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}
</style>
