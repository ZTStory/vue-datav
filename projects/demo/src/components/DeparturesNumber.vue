<template>
    <div v-if="shiftList" class="chart_content pd_20">
        <zt-echart :opts="opts"></zt-echart>
    </div>
</template>

<script setup lang="ts">
import { ZtEchart } from "@ztstory/datav-core";
import type { CountDateItem } from "@/model/model";
import { DateUtils } from "@ztstory/datav-core/src/utils/date.util";
import { createBarOpts, createBarSeriesItem, createGradientColors } from "@ztstory/datav-core/echarts-opts";
import { computed } from "vue";
interface Props {
    shiftList?: CountDateItem[];
}

const props = defineProps<Props>();

const opts = computed(() => {
    const categorys: string[] = [];
    const values: string[] = [];

    props.shiftList?.forEach((item) => {
        categorys.push(DateUtils.string2string(item.dateFormat, "YYYY-MM-DD", "M.DD"));
        values.push(item.count);
    });

    const barOpts = createBarOpts([createGradientColors(["#04FEAC", "#1EE554"])], categorys);

    barOpts.series = [createBarSeriesItem(values)];

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
