<template>
    <div class="flex_row_center">
        <span v-for="(item, index) in nums" :key="index" class="number_item flex_column">
            <div class="flex_column scroll_content" :style="{ transform: `translateY(-${px2vw(Number(item) * 26, 1920, 100)})` }">
                <i v-for="(n, i) in 10" :key="i" class="scroll_item flex_column flex_center">{{ n - 1 }}</i>
            </div>
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { px2vw } from "../../utils/string.util";
interface Props {
    num: number | string;
    maxLength?: number;
    color?: string;
}

const props = withDefaults(defineProps<Props>(), {
    maxLength: 0,
    num: 0,
    color: "#ACCEE0",
});

const textColor = computed(() => {
    return props.color;
});

const nums = computed(() => {
    let tNum = props.num;
    if (typeof props.num === "number") {
        tNum = props.num.toString();
    }
    if (props.maxLength && String(tNum).length < props.maxLength) {
        return String(tNum).padStart(props.maxLength);
    }
    return tNum;
});

const top = ref("0px");

onMounted(() => {});
</script>

<style scoped>
.number_item {
    width: 26px;
    height: 24px;
    margin-right: 8px;
    overflow: hidden;
    background: #0b294f;

    text-align: center;
    line-height: 24px;
}

.scroll_item {
    width: 26px;
    height: 26px;
    line-height: 26px;
    color: v-bind(textColor);
    font-weight: bold;
    font-size: 20px;
}

.scroll_content {
    transition: all 0.5s ease-out;
    transform: translateY(v-bind(top));
}
</style>
