import { useEffect, useState } from "react";

function FlipText({ words = ["beautiful", "precise", "quantum"], interval = 1800 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [words, interval]);

  return (
    <span className="inline-block overflow-hidden align-bottom text-white">
      <span key={index} className="inline-block animate-[flip-in_.55s_ease_both]">
        {words[index]}
      </span>
      <style>{`@keyframes flip-in { from { opacity:0; transform:rotateX(-90deg) translateY(8px); } to { opacity:1; transform:rotateX(0) translateY(0); } }`}</style>
    </span>
  );
}

export default FlipText;
