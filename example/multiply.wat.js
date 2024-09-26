import { VoilaLangWAT } from '@voilalang/watlib';

async function runMultiply() {
    const voila = new VoilaLangWAT();
    await voila.runWATFromFile('./multiply.wat', {});

    const result = await voila.instance.exports.multiply(4, 7);
    console.log("4 * 7 =", result);
}

runMultiply();