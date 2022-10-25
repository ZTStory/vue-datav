<template>
    <div class="flex_column pd_16 border_box w_100">
        <div class="flex_column">
            <div class="text_2 fs_13 mgb_20">跳动数字2</div>
            <dance-number :num="totalTicketCount" :max-length="5" color="#ACCEE0"></dance-number>
            <card class="mgt_24" :width="310" :height="271" type="inner">
                <div class="echart_content flex_1">
                    <zt-echart :opts="ticketTypeOpts"></zt-echart>
                </div>
                <div class="flex_row flex_center legend">
                    <div v-for="(item, index) in ticketTypeListRef" :key="index" class="legend_item flex_row_center">
                        <span class="legend_item_icon mgr_8" :style="{ background: item.color }"></span>
                        <span class="legend_item_range flex_1 mgr_16">{{ item.type }}</span>
                    </div>
                </div>
            </card>
        </div>
        <div class="flex_column mgt_32">
            <div class="text_2 fs_13 mgb_20">跳动数字3</div>
            <dance-number :num="totalTicketPrice" :max-length="6" color="#ACCEE0"></dance-number>
            <card class="mgt_24" :width="310" :height="380" type="inner">
                <div class="flex_row flex_wrap w_100 h_100 border_box pd_16">
                    <div
                        v-for="(item, index) in ticketPriceListRef"
                        :key="index"
                        class="echart_content_price"
                        :class="{ mgb_8: index < 2 }">
                        <div class="flex_1">
                            <zt-echart :opts="item.opts"></zt-echart>
                        </div>
                        <div class="white fs_15 w_100 text_center">{{ item.type }}</div>
                    </div>
                </div>
            </card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TicketPriceItem, TicketTypeItem } from "@/model/model";
import { DanceNumber, ZtEchart, Card } from "@ztstory/datav-core";
import { createPieOpts, createPieSeriesItem } from "@ztstory/datav-core/echarts-opts";
import { computed } from "vue";

interface Props {
    ticketPriceList?: TicketPriceItem[];
    ticketTypeList?: TicketTypeItem[];
}

const props = defineProps<Props>();

const ticketTypeListRef = computed(() => {
    return props.ticketTypeList?.reverse().map((item, index) => {
        return {
            ...item,
            color: ticketTypeColors[item.type],
        };
    });
});
const totalTicketCount = computed(() => {
    return ticketTypeListRef.value?.reduce((acc, v) => acc + Number(v.count), 0) ?? 0;
});

const ticketTypeColors: Record<string, string> = {
    类型1: "#FFA200",
    类型2: "#3880F9",
    类型3: "#1EC873",
};

const ticketTypeOpts = computed(() => {
    const formatter = () => {
        if (ticketTypeListRef.value?.every((item) => item.count == "0")) {
            return "{c}张";
        }
        return "{c}张\n{d}%";
    };
    const values = ticketTypeListRef.value?.map((item) => {
        return {
            value: Number(item.count),
        };
    });

    const pieOpts = createPieOpts(ticketTypeListRef.value?.map((item) => item.color) ?? []);
    const pieSeriesItem = createPieSeriesItem(values, false);

    pieSeriesItem.top = 5;
    pieSeriesItem.left = 5;
    pieSeriesItem.right = 5;
    pieSeriesItem.bottom = 10;
    pieSeriesItem.label = {
        show: true,
        formatter: formatter(),
        backgroundColor: "rgba(9, 161, 208, 0.2)",
        color: "#fff",
        fontSize: 12,
        padding: [2, 6],
    };
    pieSeriesItem.labelLine = {
        show: true,
        smooth: true,
        length: 5,
        length2: 5,
    };
    pieSeriesItem.radius = [0, "60%"];
    pieOpts.series = [pieSeriesItem];

    return pieOpts;
});

// 售票金额
const ticketPriceListRef = computed(() => {
    return props.ticketPriceList?.map((item, index) => {
        const color = ticketPriceColors[item.type];
        return {
            ...item,
            opts: createTicketPriceBaseOpts(color, Number(item.price)),
        };
    });
});

const totalTicketPrice = computed(() => {
    return Math.ceil(props.ticketPriceList?.reduce((acc, v) => acc + Number(v.price), 0) ?? 0);
});

const ticketPriceColors: Record<string, string> = {
    方式1: "#00D1FF",
    方式2: "#0DFF85",
    方式3: "#FDFF04",
    方式4: "#F562FF",
};

const createTicketPriceBaseOpts = (color: string, count: number) => {
    return {
        color: [color, "#042c3f"],
        series: [
            {
                type: "pie",
                radius: ["50%", "65%"],
                top: -10,
                left: -10,
                right: -10,
                bottom: 0,
                labelLine: {
                    show: false,
                },
                data: [
                    {
                        value: count,
                        label: {
                            show: true,
                            position: "center",
                            formatter: "{c}元",
                            color: color,
                        },
                    },
                    {
                        value: totalTicketPrice.value - count,
                    },
                ],
            },
        ],
    };
};
</script>

<style scoped lang="less">
.echart_content {
    width: 100%;
    height: 100%;
}

.echart_content_price {
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
}

.legend {
    height: 60px;
    font-size: 13px;
    color: @white;

    &_item {
        width: auto;
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
</style>
