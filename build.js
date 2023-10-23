const { build, context } = require("esbuild");
const isWatch = process.argv.includes("-w");
const bundle = (format,ext) => {
    const fileName = format === "iife" ? `${ext}` : `.${format}${ext}`;
    const outfile = `dist/ctag${fileName}`;
    const config = {
        format,
        // globalName: "CA",
        bundle: true,
        target: ["chrome53"],
        outfile,
        charset: "utf8",
        entryPoints: ["./src/index.ts"],
    };
    if (isWatch) {
        context(config).then((ctx) => {
            ctx.watch().then(() => console.log("watching..."));
        });
    } else {
        build(config).then(() => console.log("Build finished:", outfile));
    }
};
if (isWatch) {
    bundle("esm",".mjs");
} else {
    bundle("esm",".mjs");
    bundle("cjs",".js");
    bundle("iife",".js");
}
