import { useEffect, useState } from "react";
export default function useDebounce<T>(value: T, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler); // clean up
    }, [value, delay]);

    return debouncedValue;
}
