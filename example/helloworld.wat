(module
    (memory $0 1)
    (export "memory" (memory $0))
    
    (func $write (param $ptr i32)
        (drop (i32.const 0))  ;; Placeholder for output logic
    )

    (func $Main (export "Main")
        ;; Writing "Hello, World!" to memory (just a placeholder implementation)
        (i32.store (i32.const 0) (i32.const 12))  ;; Simulating writing the length of "Hello, World!" 
        (call $write (i32.const 0))               ;; Call the write function
    )
)
