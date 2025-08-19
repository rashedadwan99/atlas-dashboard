import React from "react";
import { useSelector } from "react-redux";
import Typed from "typed.js";

export default function Writer({ sentence }) {
  // const isSwitched = useSelector((state) => state.language.isSwitched);
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [sentence],
      typeSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
    //isSwitched,
  }, [sentence]);

  return <span ref={el} />;
}
