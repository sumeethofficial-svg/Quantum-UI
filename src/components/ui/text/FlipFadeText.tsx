import { useEffect, useState } from "react";

function FlipFadeText({ words = ["BUILDING", "PROTOTYPING", "SHIPPING"], interval = 2200 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [words, interval]);

  return (
    <span className="inline-block min-w-[9ch] text-center font-semibold tracking-tight text-white">
      <span key={index} className="inline-block animate-[word-fade_.8s_ease_both]">
        {words[index]}
      </span>
      <style>{`@keyframes word-fade { 0% { opacity:0; filter:blur(10px); transform:translateY(10px) rotateX(-35deg); } 45% { opacity:1; filter:blur(0); } 100% { opacity:1; transform:translateY(0) rotateX(0); } }`}</style>
    </span>
  );
}

export default FlipFadeText;
