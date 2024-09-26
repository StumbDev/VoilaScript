declare module "voilalang-wat-lib" {
    export class VoilaLangWAT {
        private module: WebAssembly.Module | null;
        private instance: WebAssembly.Instance | null;

        constructor();

        /**
         * Compiles the provided WAT code into a WebAssembly module.
         * @param watCode The WAT code as a string.
         * @returns A promise that resolves when the module is compiled.
         */
        compileWAT(watCode: string): Promise<WebAssembly.Module>;

        /**
         * Runs the WAT code, providing input variables.
         * @param watCode The WAT code as a string.
         * @param inputVariables An object representing input variables.
         * @returns A promise that resolves when the WAT code has run.
         */
        runWAT(watCode: string, inputVariables?: { [key: string]: string }): Promise<void>;

        /**
         * Loads a WAT file from a given file path.
         * @param filePath The path to the WAT file.
         * @returns A promise that resolves with the WAT code as a string.
         */
        loadWATFromFile(filePath: string): Promise<string>;

        /**
         * Runs WAT code from a file.
         * @param filePath The path to the WAT file.
         * @param inputVariables An object representing input variables.
         * @returns A promise that resolves when the WAT code has run.
         */
        runWATFromFile(filePath: string, inputVariables?: { [key: string]: string }): Promise<void>;
    }
}
