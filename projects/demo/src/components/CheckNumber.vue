<template>
    <div v-if="peopleList" class="chart_content pd_20">
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
    peopleList?: CountDateItem[];
}

const props = defineProps<Props>();

const opts = computed(() => {
    const categorys: string[] = [];
    const values: string[] = [];

    props.peopleList?.forEach((item) => {
        categorys.push(DateUtils.string2string(item.dateFormat, "YYYY-MM-DD", "M.DD"));
        values.push(item.count);
    });

    const barOpts = createBarOpts([createGradientColors(["#E6AE28", "#FF8A00"])], categorys);

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
