package main

import (
    "bufio"
    "fmt"
    "os"
    "strings"
)

var context = make(map[string]string)

func RunVoilaLang(code string) error {
    functions, err := ParseVoilaLang(code)
    if err != nil {
        return err
    }

    for _, fn := range functions {
        if fn.Name == "Main" {
            return ExecuteFunction(fn)
        }
    }

    return nil
}

func ExecuteFunction(fn VoilaFunction) error {
    for _, line := range fn.Body {
        if strings.HasPrefix(line, "write") {
            msg := extractMessage(line)
            fmt.Println(msg)
        } else if strings.HasPrefix(line, "input.") {
            parts := strings.Split(line, "'")
            prompt := parts[1]
            inputName := strings.Split(parts[0], ".")[1]
            fmt.Print(prompt)
            reader := bufio.NewReader(os.Stdin)
            input, _ := reader.ReadString('\n')
            context[inputName] = strings.TrimSpace(input)
        } else if strings.HasPrefix(line, "?if") {
            condition := strings.Contains(context["Main"], "name")
            if condition {
                fmt.Println(context["printName"])
            }
        }
    }
    return nil
}

func extractMessage(line string) string {
    start := strings.Index(line, "'") + 1
    end := strings.LastIndex(line, "'")
    return line[start:end]
}
