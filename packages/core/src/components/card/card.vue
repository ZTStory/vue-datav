<template>
    <div class="bb-card flex_column flex_cross_center" :class="type">
        <card-title v-if="text" :text="text"></card-title>
        <slot></slot>
        <template v-if="corner">
            <div class="corner lt"></div>
            <div class="corner rt"></div>
            <div class="corner lb"></div>
            <div class="corner rb"></div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { px2vw } from "../../utils/string.util";
import CardTitle from "./card-title.vue";

interface Props {
    width: number;
    height: number;
    corner?: boolean;
    text?: string;
    type?: "outter" | "inner";
}
const props = withDefaults(defineProps<Props>(), {
    corner: false,
    type: "outter",
});

const h = computed(() => {
    return px2vw(props.height);
});

const w = computed(() => {
    return px2vw(props.width);
});
</script>

<style scoped lang="less">
.bb-card {
    width: v-bind(w);
    height: v-bind(h);
    box-sizing: border-box;
    background: #001925;
    border: 1px solid #006674;
    position: relative;

    .inner {
        box-shadow: inset 0px 0px 9px 8px rgba(0, 52, 81, 0.18);
        border: 1px solid rgba(11, 162, 161, 0.14);
    }
}

.corner {
    width: 24px;
    height: 24px;
    position: absolute;
    &.lt {
        left: 0;
        top: 0;
        border-left: 3px solid @primary;
        border-top: 3px solid @primary;
    }

    &.rt {
        right: 0;
        top: 0;
        border-right: 3px solid @primary;
        border-top: 3px solid @primary;
    }

    &.lb {
        left: 0;
        bottom: 0;
        border-left: 3px solid @primary;
        border-bottom: 3px solid @primary;
    }

    &.rb {
        right: 0;
        bottom: 0;
        border-right: 3px solid @primary;
        border-bottom: 3px solid @primary;
    }
}
</style>
