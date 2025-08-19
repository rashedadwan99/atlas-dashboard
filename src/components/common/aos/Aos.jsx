import { useCallback, useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

// Debounce function to reduce scroll event frequency
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// Init AOS once globally when the module is first imported
if (typeof window !== "undefined") {
  Aos.init({
    duration: 200,
    easing: "ease-in-out",
    once: false,
  });
}

function AosContainer({
  delay = 0,
  children,
  dataaos,
  style,
  animation_name_scroll_down = "fade-up",
  animation_name_scroll_up = "fade-down",
  ...rest
}) {
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScroll, setLastScroll] = useState(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  const handleScroll = useCallback(
    debounce(() => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && scrollDirection !== "down") {
        setScrollDirection("down");
      } else if (currentScroll < lastScroll && scrollDirection !== "up") {
        setScrollDirection("up");
      }

      setLastScroll(currentScroll);
    }, 100),
    [lastScroll, scrollDirection]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Refresh AOS on children or dataaos prop changes
  useEffect(() => {
    Aos.refresh();
  }, [children, dataaos]);

  return (
    <div
      data-aos={
        dataaos
          ? dataaos
          : scrollDirection === "down"
          ? animation_name_scroll_down
          : animation_name_scroll_up
      }
      data-aos-delay={delay}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

export default AosContainer;
