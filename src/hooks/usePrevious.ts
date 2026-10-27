// src/hooks/usePrevious.ts
import { useState } from "react";
// Generic T -- works for any state type (string, number, User, etc.)
function usePrevious<T>(value: T): T | undefined {
    const [current, setCurrent] = useState(value);
    const [previous, setPrevious] = useState<T>();

    if (!Object.is(current, value)) {
        setPrevious(current);
        setCurrent(value);
    }

    return previous;
}
export default usePrevious;
