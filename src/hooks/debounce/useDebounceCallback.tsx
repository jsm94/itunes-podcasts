import { useState } from "react";

export const useDebounceCallback = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
): T => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  return ((...args: unknown[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(id);
  }) as T;
};
