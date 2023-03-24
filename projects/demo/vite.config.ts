import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import viteCompression from "vite-plugin-compression";
import pxtovw from "postcss-px-to-viewport";

// postcss-px-to-viewport config
const pxtovw_config = pxtovw({
    unitToConvert: "px", // 要转化的单位
    viewportWidth: 1920, // UI设计稿的宽度
    unitPrecision: 6, // 转换后的精度，即小数点位数
    propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
    viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
    fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
    selectorBlackList: ["ignore-"], // 指定不转换为视窗单位的类名，
    minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
    mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
    replace: true, // 是否转换后直接更换属性值
});

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === "production" ? "/vue-datav/" : "/",
    plugins: [
        vue(),
        // gzip压缩
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: "gzip",
            ext: ".gz",
        }),
    ],
    // 配置别名
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    css: {
        // 调整为 scale 方案
        // postcss: {
        //     plugins: [pxtovw_config],
        // },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                additionalData: `@import "@/assets/app.variable.less";`,
            },
        },
    },
    server: {
        open: true,
        host: true,
        https: false,
        proxy: {
            "/api": {
                target: "http://10.26.180.13:8003",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    build: {
        target: "esnext",
    },
});
