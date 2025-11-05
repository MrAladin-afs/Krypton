import React, { useState, useEffect, useRef } from "react";

interface LazyYouTubeProps {
  videoId: string;
  title: string;
  thumbnailQuality?:
    | "default"
    | "mqdefault"
    | "hqdefault"
    | "sddefault"
    | "maxresdefault";
  aspectRatio?: "16:9" | "4:3" | "1:1";
  params?: Record<string, string | number | boolean>;
  thumbnailUrl?: string;
  className?: string;
  autoplayOnLoad?: boolean;
}

export default function LazyYouTube({
  videoId,
  title,
  thumbnailQuality = "maxresdefault",
  aspectRatio = "16:9",
  params = {},
  thumbnailUrl,
  className = "",
  autoplayOnLoad = false,
}: LazyYouTubeProps) {
  const [isLoaded, setIsLoaded] = useState(autoplayOnLoad);
  const [isMounted, setIsMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoplayOnLoad);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set mounted state for client-side only code
  useEffect(() => {
    setIsMounted(true);

    // If autoplayOnLoad is true, we should immediately load and play the video
    if (autoplayOnLoad) {
      setIsLoaded(true);
      setIsPlaying(true);
    }

    return () => setIsMounted(false);
  }, [autoplayOnLoad]);

  // Default YouTube embed parameters
  const defaultParams = {
    autoplay: 1,
    mute: 1,
    controls: 1, // Enable controls by default
    rel: 0,
    modestbranding: 1,
    loop: 1,
    playlist: videoId,
    playsinline: 1,
  };

  // Merge default params with custom params
  const mergedParams = { ...defaultParams, ...params };

  // Convert params object to URL query string
  const paramsString = Object.entries(mergedParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  // Calculate aspect ratio padding
  const getPaddingBottom = () => {
    switch (aspectRatio) {
      case "16:9":
        return "56.25%"; // 9/16 * 100%
      case "4:3":
        return "75%"; // 3/4 * 100%
      case "1:1":
        return "100%"; // 1/1 * 100%
      default:
        return "56.25%"; // Default to 16:9
    }
  };

  // Handle play button click
  const handlePlayClick = () => {
    setIsLoaded(true);
    setIsPlaying(true);
  };

  // Ensure video plays when iframe is loaded
  useEffect(() => {
    if (isLoaded && iframeRef.current) {
      // Force iframe reload to ensure autoplay works
      const currentSrc = iframeRef.current.src;
      iframeRef.current.src = currentSrc;
    }
  }, [isLoaded]);

  // Add intersection observer to autoplay when visible
  useEffect(() => {
    if (!isMounted || !containerRef.current || isPlaying) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isPlaying && isLoaded) {
          // If the video is loaded but not playing and becomes visible, play it
          if (iframeRef.current) {
            const currentSrc = iframeRef.current.src;
            iframeRef.current.src = currentSrc;
            setIsPlaying(true);
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMounted, isPlaying, isLoaded]);

  // Allow pointer events when controls are enabled
  const pointerEventsStyle = mergedParams.controls
    ? {}
    : { pointerEvents: "none" as const };

  return (
    <div
      ref={containerRef}
      className={`youtube-container relative w-full h-full ${className}`}
      style={{ width: "100%" }}>
      <div
        className="youtube-wrapper relative w-full h-full"
        style={{
          paddingBottom: !isLoaded ? getPaddingBottom() : "0",
          height: isLoaded ? "100%" : "auto",
        }}>
        {!isLoaded && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer"
            aria-label={`Play ${title} video`}>
            {/* Play button overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 dark:bg-black/50 dark:group-hover:bg-black/60 transition-colors duration-300"></div>
            <div className="relative z-10 w-24 h-24 flex items-center justify-center rounded-full bg-white/95 dark:bg-white/90 group-hover:bg-white transition-all duration-300 group-hover:scale-110 shadow-2xl dark:shadow-white/20 group-hover:shadow-white/40 backdrop-blur-sm border-2 border-white dark:border-white/80 ring-2 ring-white/30 dark:ring-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#5E5FEE"
                className="w-14 h-14 ml-1 drop-shadow-lg"
                aria-hidden="true">
                <path 
                  d="M8 5v14l11-7z" 
                />
              </svg>
            </div>

            {/* Video title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-white text-lg font-medium">{title}</h3>
            </div>
          </button>
        )}

        {isMounted && isLoaded && (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?${paramsString}`}
            title={title}
            className="absolute top-0 left-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            loading="eager"
            style={pointerEventsStyle}></iframe>
        )}
      </div>
    </div>
  );
}
