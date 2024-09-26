import { VoilaLangWAT } from '@voilalang/watlib';

async function runAdd() {
    const voila = new VoilaLangWAT();
    await voila.runWATFromFile('./add.wat', {});
    
    const result = await voila.instance.exports.add(3, 5);
    console.log("3 + 5 =", result);
}

runAdd();