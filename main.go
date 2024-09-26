package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

func main() {
    // Check if a file argument is provided
    if len(os.Args) < 2 {
        fmt.Println("Usage: voiscr <path-to-file.vl>")
        os.Exit(1)
    }

    // Get the file path from the command-line argument
    filePath := os.Args[1]

    // Validate file existence
    if _, err := os.Stat(filePath); os.IsNotExist(err) {
        fmt.Printf("File not found: %s\n", filePath)
        os.Exit(1)
    }

    // Read the VoilaLang code from the file
    code, err := readVoilaFile(filePath)
    if err != nil {
        fmt.Println("Error reading file:", err)
        os.Exit(1)
    }

    // Run the VoilaLang code
    err = RunVoilaLang(code) // Ensure this function is defined
    if err != nil {
        fmt.Println("Error:", err)
        os.Exit(1)
    }
}

// Function to read VoilaLang code from a file
func readVoilaFile(filePath string) (string, error) {
    var code strings.Builder
    file, err := os.Open(filePath)
    if err != nil {
        return "", err
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        code.WriteString(scanner.Text() + "\n")
    }

    if err := scanner.Err(); err != nil {
        return "", err
    }

    return code.String(), nil
}
