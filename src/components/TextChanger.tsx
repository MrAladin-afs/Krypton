import React, { useState, useEffect, useRef } from "react";

interface TextChangerProps {
  phrases: string[];
  baseText: string;
  interval?: number;
  className?: string;
}

export default function TextChanger({
  phrases,
  baseText,
  interval = 3000,
  className = "",
}: TextChangerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const cycleText = () => {
      setIsChanging(true);

      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsChanging(false);

        timeoutRef.current = setTimeout(cycleText, interval);
      }, 500); // Time for fade out/in transition
    };

    timeoutRef.current = setTimeout(cycleText, interval);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [interval, phrases.length]);

  return (
    <div className={`relative ${className}`}>
      <span>{baseText}</span>{" "}
      <span className="relative inline-block min-w-[120px]">
        <span
          className={`absolute transition-opacity duration-300 ${
            isChanging ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden={isChanging}>
          {phrases[currentIndex]}
        </span>
      </span>
    </div>
  );
}
