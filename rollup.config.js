import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";

const packageJson = require("./package.json");

const iconDirs = [
    "bi",
    "bs",
    "cg",
    "ci",
    "di",
    "fa",
    "fa6",
    "fc",
    "fi",
    "gi",
    "go",
    "gr",
    "hi",
    "hi2",
    "im",
    "io",
    "io5",
    "lia",
    "lu",
    "md",
    "pi",
    "ri",
    "rx",
    "si",
    "sl",
    "tb",
    "tfi",
    "ti",
    "vsc",
    "wi",
];

export default [
    // Main bundle
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/index.js",
                format: "cjs",
                sourcemap: true,
                exports: "named",
            },
            {
                file: "dist/index.esm.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            resolve({
                browser: true,
                preferBuiltins: false,
            }),
            commonjs(),
            typescript({
                tsconfig: "./tsconfig.json",
                declaration: false,
                declarationMap: false,
            }),
            postcss({
                extract: true,
                minimize: true,
            }),
            terser({
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            }),
            visualizer({
                filename: "dist/stats.html",
                open: false,
                gzipSize: true,
                brotliSize: true,
            }),
        ],
        external: ["curlui", "curlui/jsx-runtime"],
        treeshake: {
            moduleSideEffects: false,
            propertyReadSideEffects: false,
            unknownGlobalSideEffects: false,
        },
    },
    // Icon subpath bundles (ESM and CJS per folder)
    ...iconDirs.map((dir) => ({
        input: `src/${dir}/index.ts`,
        output: [
            {
                file: `dist/${dir}/index.cjs.js`,
                format: "cjs",
                sourcemap: true,
                exports: "named",
            },
            {
                file: `dist/${dir}/index.esm.js`,
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            resolve({ browser: true, preferBuiltins: false }),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json", declaration: false, declarationMap: false }),
            terser({
                compress: { drop_console: true, drop_debugger: true },
            }),
        ],
        external: ["curlui", "curlui/jsx-runtime"],
        treeshake: {
            moduleSideEffects: false,
            propertyReadSideEffects: false,
            unknownGlobalSideEffects: false,
        },
    })),
    // Type definitions
    {
        input: "dist/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.css$/],
    },
];
