<template>
    <div class="flex_row flex_between w_100 h_100 border_box pdl_16 pdr_16">
        <div>
            <card-title :width="274" text="环状图1"></card-title>
            <card class="mgt_8" :width="274" :height="250" type="inner">
                <div class="flex_row_center h_100 w_100 border_box pd_16">
                    <div class="legend">
                        <div
                            v-for="(price, index) in priceListRef"
                            :key="index"
                            class="legend_item flex_row_center mgb_28">
                            <span class="legend_item_icon mgr_8" :style="{ background: price.color }"></span>
                            <span class="legend_item_range flex_1 mgr_8">{{ price.rangeFormat }}</span>
                            <span class="legend_item_percentage">{{ price.percentage }}</span>
                        </div>
                    </div>
                    <div class="echart_content flex_1">
                        <zt-echart :opts="priceOpts"></zt-echart>
                    </div>
                </div>
            </card>
        </div>
        <div>
            <card-title :width="274" text="环状图2"></card-title>
            <card class="mgt_8" :width="274" :height="250" type="inner">
                <div class="flex_row_center h_100 w_100 border_box pd_16">
                    <div class="legend">
                        <div v-for="(age, index) in ageListRef" :key="index" class="legend_item flex_row_center mgb_28">
                            <span class="legend_item_icon mgr_8" :style="{ background: age.color }"></span>
                            <span class="legend_item_range flex_1 mgr_8">{{ age.rangeFormat }}</span>
                            <span class="legend_item_percentage">{{ age.percentage }}</span>
                        </div>
                    </div>
                    <div class="echart_content flex_1">
                        <zt-echart :opts="ageOpts"></zt-echart>
                    </div>
                </div>
            </card>
        </div>
        <div>
            <card-title :width="160" text="性别"></card-title>
            <card class="mgt_8 border_box pd_20" :width="160" :height="250" type="inner">
                <div class="flex_row_center flex_between w_100 h_100 pdl_20 pdr_10 border_box">
                    <div
                        v-for="(sex, index) in sexListRef"
                        :key="index"
                        class="flex_column flex_center white flex_none">
                        <img :src="sex.icon" />
                        <span class="fs_13 mgt_8">{{ sex.sex }}</span>
                        <span class="fs_13 mgt_8">{{ sex.percentage }}</span>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Card, CardTitle, ZtEchart } from "@ztstory/datav-core";
import type { CountRangeItem, SexItem } from "@/model/model";
import { computed } from "vue";
import { getPercent } from "@ztstory/datav-core/src/utils/common.util";
import svg_male from "@/assets/male.svg";
import svg_female from "@/assets/female.svg";
import { createPieOpts, createPieSeriesItem } from "@ztstory/datav-core/echarts-opts";

interface Props {
    priceList?: CountRangeItem[];
    ageList?: CountRangeItem[];
    sexList?: SexItem[];
}
const props = defineProps<Props>();

const priceColors = ["#1EC873", "#FFA200", "#3880F9", "#B945FF"];
const priceListRef = computed(() => {
    if (!props.priceList) {
        return [];
    }
    const total = props.priceList.reduce((acc, v) => acc + Number(v.count), 0);
    return props.priceList?.map((item, index) => {
        if (index > priceColors.length - 1) {
            index = priceColors.length - 1;
        }
        return {
            ...item,
            color: priceColors[index],
            percentage: getPercent(Number(item.count), total),
        };
    });
});

const priceOpts = computed(() => {
    const values = props.priceList?.map((item) => {
        return {
            value: Number(item.count),
        };
    });

    const pieOpts = createPieOpts(priceColors);
    pieOpts.series = [createPieSeriesItem(values)];

    return pieOpts;
});

const ageColors = ["#FDFF04", "#00F7FF ", "#F562FF", "#0DFF85"];
const ageListRef = computed(() => {
    if (!props.ageList) {
        return [];
    }
    const total = props.ageList.reduce((acc, v) => acc + Number(v.count), 0);
    return props.ageList?.map((item, index) => {
        if (index > ageColors.length - 1) {
            index = ageColors.length - 1;
        }
        return {
            ...item,
            color: ageColors[index],
            percentage: getPercent(Number(item.count), total),
        };
    });
});
const ageOpts = computed(() => {
    const values = props.ageList?.map((item) => {
        return {
            value: Number(item.count),
        };
    });

    const pieOpts = createPieOpts(ageColors);
    pieOpts.series = [createPieSeriesItem(values)];

    return pieOpts;
});

const sexListRef = computed(() => {
    if (!props.sexList) {
        return [];
    }
    const total = props.sexList.reduce((acc, v) => acc + Number(v.count), 0);
    return props.sexList?.map((item) => {
        return {
            ...item,
            icon: item.sex == "男" ? svg_male : svg_female,
            percentage: getPercent(Number(item.count), total),
        };
    });
});
</script>

<style scoped lang="less">
.legend {
    font-size: 13px;
    color: @white;

    &_item {
        width: 118px;
        &_icon {
            width: 6px;
            height: 6px;
            border-radius: 3px;
        }
    }

    .legend_item:last-child {
        margin-bottom: 0;
    }
}

.echart_content {
    height: 100%;
}
</style>
