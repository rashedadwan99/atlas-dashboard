import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

function ManualCountUp({ end, duration = 1000, ...props }) {
  const { ref: viewRef, inView } = useInView({ triggerOnce: true });
  const [count, setCount] = useState(0);
  const frameRef = useRef();

  useEffect(() => {
    if (!inView) return;

    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      const current = Math.floor(percentage * end);
      setCount(current);

      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, end, duration]);

  return (
    <div ref={viewRef} {...props}>
      {count.toLocaleString()}
    </div>
  );
}

export default ManualCountUp;
