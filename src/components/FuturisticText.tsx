import React, { useState, useEffect, useRef } from "react";

interface FuturisticTextProps {
  phrases: string[];
  baseText?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenPhrases?: number;
  className?: string;
  highlightClassName?: string;
  cursorStyle?: "bar" | "underscore" | "block" | "none";
  glowEffect?: boolean;
  shimmerEffect?: boolean;
  cursorColor?: string;
  showBaseTextOnMobile?: boolean;
}

export default function FuturisticText({
  phrases,
  baseText = "",
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBetweenPhrases = 2000,
  className = "",
  highlightClassName = "text-primary font-bold",
  cursorStyle = "bar",
  glowEffect = true,
  shimmerEffect = false,
  cursorColor = "var(--primary)",
  showBaseTextOnMobile = true,
}: FuturisticTextProps) {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Cursor blinking effect
  useEffect(() => {
    if (!isMounted) return;

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [isMounted]);

  // Typing effect
  useEffect(() => {
    if (!isMounted) return;

    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length < currentPhrase.length) {
            setCurrentText(currentPhrase.substring(0, currentText.length + 1));
          } else {
            // Pause at the end of typing before deleting
            setTimeout(() => {
              setIsDeleting(true);
            }, delayBetweenPhrases);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(currentText.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((phraseIndex + 1) % phrases.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    isDeleting,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    delayBetweenPhrases,
    isMounted,
  ]);

  // Cursor character based on style
  const getCursorChar = () => {
    switch (cursorStyle) {
      case "bar":
        return "|";
      case "underscore":
        return "_";
      case "block":
        return "■";
      case "none":
        return "";
      default:
        return "|";
    }
  };

  // Determine which CSS class to use for text effects
  const getTextEffectClass = () => {
    if (shimmerEffect) return "text-shimmer";
    if (glowEffect) return "futuristic-text";
    return "";
  };

  // Enhanced cursor style with glow
  const cursorStyles = {
    color: cursorColor,
    textShadow: glowEffect
      ? `0 0 10px ${cursorColor}, 0 0 20px ${cursorColor}`
      : "none",
    animation: glowEffect ? "neon-pulse 2s infinite" : "none",
    display: cursorStyle === "none" ? "none" : "inline",
  };

  return (
    <span className={`${className} inline-flex items-center`}>
      {baseText && (
        <span className={showBaseTextOnMobile ? "" : "hidden sm:inline"}>
          {baseText}&nbsp;
        </span>
      )}
      <span
        className={`${highlightClassName} ${getTextEffectClass()} whitespace-nowrap`}>
        {currentText}
        {cursorStyle !== "none" && (
          <span
            className={`inline-block transition-opacity duration-300 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
            style={cursorStyles}
            aria-hidden="true">
            {getCursorChar()}
          </span>
        )}
      </span>
    </span>
  );
}
