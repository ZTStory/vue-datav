<template>
    <div class="bb-card-title">
        {{ text }}
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { px2vw } from "../../utils/string.util";

interface Props {
    width?: number;
    text: string;
}
const props = withDefaults(defineProps<Props>(), {
    width: 281,
});

const w = computed(() => {
    return px2vw(props.width);
});
</script>

<style scoped lang="less">
.bb-card-title {
    width: v-bind(w);
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #11ebd7;

    background: linear-gradient(
        270deg,
        rgba(39, 247, 237, 0) 0%,
        rgba(17, 235, 215, 0.16) 49%,
        rgba(17, 235, 215, 0.01) 82%,
        rgba(17, 235, 215, 0) 100%
    );
    border-radius: 0px 0px 13px 13px;
}
</style>
