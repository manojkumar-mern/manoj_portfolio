import { useEffect, useRef, useState } from "react";

/**
 * Defers a boolean flag to `true` until the browser is idle,
 * using requestIdleCallback (with setTimeout fallback).
 * Prevents heavy animations from blocking initial render.
 */
export function useIdleReady(timeoutMs = 200): boolean {
  const [ready, setReady] = useState(false);
  const idRef = useRef<number | ReturnType<typeof setTimeout>>(0);

  useEffect(() => {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idRef.current = window.requestIdleCallback(
        () => setReady(true),
        { timeout: timeoutMs }
      );
      return () => window.cancelIdleCallback(idRef.current as number);
    } else {
      idRef.current = setTimeout(() => setReady(true), timeoutMs);
      return () => clearTimeout(idRef.current as ReturnType<typeof setTimeout>);
    }
  }, [timeoutMs]);

  return ready;
}
