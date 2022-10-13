<template>
    <span :id="uid" class="bb-dance-number">{{ displayModelValue }}</span>
</template>

<script setup lang="ts">
import { randomString } from "../../utils/string.util";
import { computed, onMounted, ref, watch } from "vue";

const uid = randomString();

interface Props {
    num: number;
}

const props = withDefaults(defineProps<Props>(), { num: 0 });

const modelValue = ref(props.num);
const displayModelValue = computed(() => {
    const numStr = String(modelValue.value);
    let targetStrs = [];
    let point = 1;
    for (let index = numStr.length - 1; index >= 0; index--) {
        targetStrs.unshift(numStr[index]);
        if (point === 3 && index > 0) {
            targetStrs.unshift(",");
        }
        point++;
        if (point > 3) {
            point = 1;
        }
    }
    return targetStrs.join("");
    // return modelValue.value.toLocaleString(undefined, {
    //     style: "currency",
    // });
});
let lastValue = props.num;
let rafId = NaN;
watch(
    () => props.num,
    (v) => {
        if (lastValue != v) {
            changeNumber();
        }
    }
);
const changeNumber = () => {
    const delta = props.num - lastValue;
    const step = Math.floor(Math.abs(delta) / 20) || 1;

    danceNumber(step, delta > 0);
};

const danceNumber = (step: number, add: boolean) => {
    const dance = () => {
        const t = Math.abs(props.num - modelValue.value);
        if (t < step) {
            modelValue.value = props.num;
            cancelAnimationFrame(rafId);
        } else {
            if (add) {
                modelValue.value += step;
            } else {
                modelValue.value -= step;
            }
            rafId = requestAnimationFrame(dance);
        }
    };
    dance();
};
</script>

<style scoped>
.bb-dance-number {
    font-family: ds-digi-b;
    font-size: 25px;
}
</style>
