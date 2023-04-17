import { useEffect, useState } from "react";

function getWindowDWidth() {
  const { innerWidth: width } = window;
  return width;
}

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(
    getWindowDWidth()
  );

  useEffect(() => {
    let timer;

    function handleResize() {
        clearTimeout(timer);
        timer = setTimeout(() => setWindowWidth(getWindowDWidth()), 500);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}