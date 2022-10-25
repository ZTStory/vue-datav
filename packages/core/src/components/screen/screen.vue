<template>
    <div class="bb-screen flex_column" :style="{ width: w, height: h }">
        <screen-title class="flex_none" :text="title" :width="textWidth" :font-size="textFontSize"></screen-title>
        <div class="bb-screen__container flex_1">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ScreenTitle from "./screen-title.vue";
import { px2vw } from "../../utils/string.util";
interface Props {
    width?: number;
    height?: number;
    textWidth?: number;
    textFontSize?: number;
    title: string;
}

const props = withDefaults(defineProps<Props>(), {
    width: 1920,
    height: 821,
    textWidth: 612,
    textFontSize: 30,
    title: "",
});

const h = computed(() => {
    return px2vw(props.height, props.width);
});

const w = computed(() => {
    return px2vw(props.width, props.width);
});
</script>

<style scoped lang="less">
.bb-screen {
    width: v-bind(w);
    height: v-bind(h);
    background: #012746;
    box-sizing: border-box;
    padding: 20px 22px;
}
.bb-screen__container {
    margin-top: 12px;
}
</style>
