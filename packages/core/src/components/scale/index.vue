<template>
    <div
        ref="scaleBox"
        class="scale-box"
        :style="{
            width: width + 'px',
            height: height + 'px',
            transition: transition,
        }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { debounce } from "lodash";

interface Props {
    width?: number;
    height?: number;
    background?: string;
}

const props = withDefaults(defineProps<Props>(), {
    width: 1920,
    height: 1080,
    background: "#012700",
});

const scaleBox = ref();
const scaleRef = ref(0);
const transition = ref("none");

const getScale = () => {
    // 计算合适的缩放比
    const { width, height } = props;
    const wh = window.innerHeight / height;
    const ww = window.innerWidth / width;
    console.log(ww < wh ? ww : wh);
    return ww < wh ? ww : wh;
};

const setScale = () => {
    scaleRef.value = getScale();
    if (scaleBox.value) {
        scaleBox.value.style.setProperty("--scale", scaleRef.value);
    }
};

onMounted(() => {
    setScale();
    window.onresize = debounce(setScale, 500);
    document.body.style.background = props.background;
    nextTick(() => {
        // 避免第一次渲染时的页面晃动
        transition.value = "0.3s";
    });
});
</script>

<style scoped lang="less">
.scale-box {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 50%;
    top: 50%;
    transform: scale(var(--scale)) translate(-50%, -50%);
    transform-origin: 0 0;
    will-change: scale;
}
</style>
