(module
    (memory $0 1)
    (export "memory" (memory $0))
    (func $write (param $ptr i32)
        ;; Example implementation for write
        (drop (i32.const 0))
    )
    (func $Main (export "Main")
        (call $write (i32.const 0))
    )
)