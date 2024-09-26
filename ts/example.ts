import { VoilaLang } from "../lib/libts";

const voila = new VoilaLang();

const code = `
// comment
?function Main {
    write('Hello, VoilaLang!'); // Output a greeting
    input.Main('Enter your name:'); // Prompt for user input
    ?if(input === 'name' useId ==> 'printName'); // Check the condition
    return**
}
`

voila.execute(code);