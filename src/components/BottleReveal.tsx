import { useCallback, useEffect, useRef, useState } from 'react';

interface BottleRevealProps {
  frameCount?: number;
  framePath?: string;
  frameExtension?: string;
  progress: number;
}

const BottleReveal = ({
  frameCount = 151,
  framePath = '/bottle-frames/frame_',
  frameExtension = '.jpg',
  progress,
}: BottleRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const drawFrame = useCallback((index: number): void => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.drawImage(img, 0, 0);
  }, []);

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = images;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNumber = String(i + 1).padStart(3, '0');
      img.src = `${framePath}${frameNumber}${frameExtension}`;

      const onComplete = () => {
        loaded++;
        setLoadProgress(Math.floor((loaded / frameCount) * 100));
        if (loaded === frameCount) {
          setIsLoaded(true);
        }
      };

      img.onload = onComplete;
      img.onerror = onComplete;
      images[i] = img;
    }
  }, [frameCount, framePath, frameExtension]);

  // Draw frame whenever progress or loaded state changes
  useEffect(() => {
    if (!isLoaded) return;

    const frameIndex = reducedMotion
      ? frameCount - 1
      : Math.min(frameCount - 1, Math.floor(progress * frameCount));

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;
      drawFrame(frameIndex);
    }
  }, [progress, isLoaded, reducedMotion, frameCount, drawFrame]);

  return (
    <div className="relative w-full flex justify-center">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          opacity: isLoaded ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
        aria-hidden={isLoaded}
      >
        <span
          className="font-serif text-4xl font-light tracking-widest"
          style={{ color: '#C9A84C' }}
        >
          {loadProgress}%
        </span>
      </div>
      <canvas
        ref={canvasRef}
        className="max-w-[180px] md:max-w-[280px] max-h-[38vh] md:max-h-[75vh] w-auto h-auto block"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 70% 85% at center, black 45%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 70% 85% at center, black 45%, transparent 100%)',
        }}
      />
    </div>
  );
};

export default BottleReveal;
