<template>
    <ZtScale>
        <screen :height="1080" title="数据监控平台" :textWidth="250">
            <div class="flex_row flex_between mgt_12">
                <div class="flex_column flex_between">
                    <card :width="346" :height="309" text="柱状图1">
                        <DeparturesNumber :shift-list="historyData?.shiftList"
                    /></card>
                    <card :width="346" :height="309" text="柱状图1">
                        <CheckNumber :people-list="historyData?.peopleList" />
                    </card>
                    <card :width="346" :height="314" text="横向柱状图3">
                        <ArriveNumber :flow-direction-list="historyData?.flowDirectionList" />
                    </card>
                </div>
                <div class="flex_column">
                    <div class="flex_row flex_between mgb_12">
                        <card :width="1160" :height="630" corner>
                            <div class="flex_row_center flex_between border_box pd_20 w_100 h_100">
                                <HotlineTop10 :datas="historyData?.hotRouteList" />
                                <div class="flex_1 flex_column_center h_100">
                                    <div class="flex_none">
                                        <div class="white fs_14 mgb_12">跳动数字</div>
                                        <dance-number
                                            :num="accumulatedSaleTicket"
                                            :max-length="8"
                                            color="#ff7700"></dance-number>
                                    </div>
                                    <div class="flex_1 w_100">
                                        <div class="w_100 h_100">
                                            <zt-echart :opts="mapOpts" :geo-json="mapJson"></zt-echart>
                                        </div>
                                    </div>
                                </div>
                                <RealtimeTicketCount
                                    :sale-ticket-list="realtimeData?.saleTicketList"
                                    :check-ticket-list="realtimeData?.checkTicketList" />
                            </div>
                        </card>
                    </div>
                    <div class="flex_row flex_between">
                        <card :width="784" :height="314">
                            <BasicData
                                :price-list="historyData?.priceList"
                                :age-list="historyData?.ageList"
                                :sex-list="historyData?.sexList" />
                        </card>
                        <card :width="365" :height="314" text="横向柱状图3">
                            <DirectionOfPeople :flow-direction-list="realtimeData?.flowDirectionList" />
                        </card>
                    </div>
                </div>
                <card :width="346" :height="958" text="组合图表">
                    <RealtimeTicketPrice
                        :ticket-price-list="realtimeData?.ticketPriceList"
                        :ticket-type-list="realtimeData?.ticketTypeList" />
                </card>
            </div>
        </screen>
    </ZtScale>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Screen, Card, DanceNumber, ZtEchart, ZtScale } from "@ztstory/datav-core";
import { EventBusUtils } from "@ztstory/datav-core/src/utils/eventbus.util";
import { throttle } from "@ztstory/datav-core/src/utils/common.util";
import HotlineTop10 from "../components/HotlineTop10.vue";
import RealtimeTicketCount from "@/components/RealtimeTicketCount.vue";
import RealtimeTicketPrice from "../components/RealtimeTicketPrice.vue";
import BasicData from "@/components/BasicData.vue";
import DeparturesNumber from "../components/DeparturesNumber.vue";
import CheckNumber from "@/components/CheckNumber.vue";
import ArriveNumber from "@/components/ArriveNumber.vue";
import DirectionOfPeople from "@/components/DirectionOfPeople.vue";
import mapJson from "@/assets/330000.geo.json";
import { mapOpts } from "@/components/IndexMap";

import type {
    CountDateItem,
    CountRangeItem,
    FlowDirectionItem,
    HistoryDatas,
    RealTimeDatas,
    RouteItem,
    TicketPriceItem,
    TicketTypeItem,
} from "@/model/model";
import { DateUtils } from "@ztstory/datav-core/src/utils/date.util";

const accumulatedSaleTicket = ref(0);

const createLoopDatas = () => {
    const datas: RouteItem[] = [];
    for (let index = 0; index < 11; index++) {
        datas.push({
            sort: (index + 1).toString(),
            routeName: `可滚动数据${index + 1}`,
            count: Math.floor(Math.random() * 1000).toString(),
        });
    }
    return datas;
};
const createBarDatas = () => {
    const datas: CountDateItem[] = [];
    for (let index = 0; index < 8; index++) {
        const date = DateUtils.subtract(new Date(), index, "day");
        datas.push({
            timestamp: date.getDate(),
            dateFormat: DateUtils.date2String(date, "YYYY-MM-DD"),
            count: Math.floor(Math.random() * 2000).toString(),
        });
    }
    return datas;
};
const createPieDatas = () => {
    const datas: CountRangeItem[] = [];
    const base = [
        { Minimum: "0", Maximum: "50" },
        { Minimum: "50", Maximum: "100" },
        { Minimum: "100", Maximum: "150" },
        { Minimum: "150", Maximum: "200" },
    ];
    for (let index = 0; index < base.length; index++) {
        datas.push({
            range: base[index],
            rangeFormat: `${base[index].Minimum}-${base[index].Maximum}`,
            count: Math.floor(Math.random() * 1000).toString(),
        });
    }
    return datas;
};
const createLineDatas = () => {
    const datas: CountDateItem[] = [];
    for (let index = 0; index < 12; index++) {
        const format = (n: number) => {
            return n < 10 ? `0${n}` : `${n}`;
        };
        datas.push({
            timestamp: new Date().getDate(),
            dateFormat: `${format(index)}:00`,
            count: Math.floor(Math.random() * 1000).toString(),
        });
    }
    return datas;
};
const createFlowItem = () => {
    const datas: FlowDirectionItem[] = [];
    for (let index = 0; index < 10; index++) {
        datas.push({
            target: `我是数据${index}`,
            count: Math.floor(Math.random() * 1000).toString(),
        });
    }
    return datas;
};
const createTypeItem = () => {
    const datas: TicketTypeItem[] = [];
    for (let index = 1; index < 4; index++) {
        datas.push({
            type: `类型${index}`,
            count: Math.floor(Math.random() * 1000).toString(),
            price: Math.floor(Math.random() * 1000).toString(),
        });
    }
    return datas;
};
const createPriceItem = () => {
    const datas: TicketPriceItem[] = [];
    for (let index = 1; index < 5; index++) {
        datas.push({
            type: `方式${index}`,
            price: Math.floor(Math.random() * 1000).toString(),
        });
    }
    return datas;
};
const historyData = ref<HistoryDatas>({
    hotRouteList: createLoopDatas(),
    shiftList: createBarDatas(),
    peopleList: createBarDatas(),
    priceList: createPieDatas(),
    ageList: createPieDatas(),
    sexList: [
        {
            sex: "男",
            count: "54",
        },
        {
            sex: "女",
            count: "46",
        },
    ],
    flowDirectionList: createFlowItem(),
});
const realtimeData = ref<RealTimeDatas>({
    accumulateTicketCount: "0",
    saleTicketList: createLineDatas(),
    checkTicketList: createLineDatas(),
    ticketTypeList: createTypeItem(),
    ticketPriceList: createPriceItem(),
    flowDirectionList: createFlowItem(),
});

let realtimeInterval: number | undefined = 0;

onMounted(() => {
    realtimeInterval = window.setInterval(() => {
        accumulatedSaleTicket.value += Math.floor(Math.random() * 1000);
    }, 5 * 1000);
});

onUnmounted(() => {
    if (realtimeInterval) window.clearInterval(realtimeInterval);
});

const onResize = throttle(() => {
    EventBusUtils.post("WindowResize");
}, 500);
window.onresize = onResize;
</script>

<style scoped lang="less"></style>
