import { VoilaLangWAT } from '@voilalang/watlib';

const voila = new VoilaLangWAT();
voila.runWATFromFile('./example/example.wat', { '>>>': 'name' })
    .then(() => {
        console.log("WAT code executed successfully.");
    })
    .catch(err => {
        console.error("Error running WAT code:", err);
    });
