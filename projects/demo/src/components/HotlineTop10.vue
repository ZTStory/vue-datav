<template>
    <div class="flex_column">
        <card-title :width="250" text="可滚动列表"></card-title>
        <card class="mgt_12" :width="250" :height="520" type="inner">
            <div class="flex_row_center flex_between orange fs_12 w_100 border_box pd_16">
                <span class="sort flex_none"></span>
                <span class="hotline route mgl_12 flex_1 mgr_12">数据1</span>
                <span class="hotline count flex_none">数据2</span>
            </div>
            <div v-if="datasRef" class="over_hidden w_100 border_box pdl_16 pdr_16 pdb_16">
                <swiper :datas="datasRef" :scroll="false" :single-height="46">
                    <div
                        v-for="(item, index) in datasRef"
                        :key="index"
                        class="hotline item flex_row_center flex_between">
                        <span class="hotline sort">{{ item.sort }}</span>
                        <span class="mgl_12 flex_1 mgr_12 mutiple_line_1">{{ item.routeName }}</span>
                        <span class="flex_none">{{ item.count }}</span>
                    </div>
                </swiper>
            </div>
        </card>
    </div>
</template>

<script setup lang="ts">
import { Card, CardTitle, Swiper } from "@ztstory/datav-core";
import { computed, ref } from "vue";
interface Props {
    datas?: any[];
}

const props = defineProps<Props>();

const datasRef = computed(() => {
    return props.datas;
});
</script>

<style scoped lang="less">
.sort {
    width: 16px;
    height: 16px;
}
.hotline {
    &.sort {
        background: #3847f9;
        opacity: 0.5;
        color: #fff;
        font-size: 10px;
        text-align: center;
        border-radius: 8px;
    }
    &.item {
        box-sizing: border-box;
        width: 100%;
        height: 46px;
        font-size: 13px;
        color: #fff;
    }
}
</style>
