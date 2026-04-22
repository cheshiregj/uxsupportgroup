import { useEffect, useRef, useState } from "react";

const FINE_POINTER_MQ = "(hover: hover) and (pointer: fine)";

/**
 * Soft yellow halo that follows the pointer on `/summit`, matching the hero “X” glow.
 * Native cursor is unchanged; layer is `pointer-events-none` and sits under sticky header (`z-40`).
 */
export function Summit2026PointerGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const scheduledRef = useRef(false);
  const revealedRef = useRef(false);

  const [enabled, setEnabled] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(FINE_POINTER_MQ).matches : false
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER_MQ);
    const onMq = () => setEnabled(mq.matches);
    mq.addEventListener("change", onMq);
    setEnabled(mq.matches);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const flush = () => {
      scheduledRef.current = false;
      rafRef.current = null;
      const el = outerRef.current;
      if (!el) return;
      const { x, y } = posRef.current;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: PointerEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!scheduledRef.current) {
        scheduledRef.current = true;
        rafRef.current = requestAnimationFrame(flush);
      }
      if (!revealedRef.current) {
        revealedRef.current = true;
        setVisible(true);
      }
    };

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={outerRef}
      className={`pointer-events-none fixed left-0 top-0 z-40 h-16 w-16 transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden
    >
      <div
        className="h-full w-full origin-center rounded-full bg-[#facc15]/55 blur-md shadow-[0_0_24px_rgba(250,204,21,0.45)] motion-safe:animate-summit-pointer-glow-pulse motion-reduce:animate-none"
      />
    </div>
  );
}
