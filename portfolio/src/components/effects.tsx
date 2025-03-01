import { useEffect, useState } from "react";

// Custom hook for handling the circle effects
export const useCircleEffects = () => {
  const [circles, setCircles] = useState<any[]>([]);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const numCircles = 40;
    const newCircles = [];

    for (let i = 0; i < numCircles; i++) {
      newCircles.push({
        id: i,
        size: Math.random() * 20 + 10,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        hover: false,
        opacity: Math.random(),
        color: `hsl(${Math.random() * 360}, 100%, 75%)`,
      });
    }

    setCircles(newCircles);

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });

      setCircles((prevCircles) =>
        prevCircles.map((circle) => {
          const distance = Math.hypot(circle.x - event.clientX, circle.y - event.clientY);
          if (distance < circle.size * 2) {
            return { ...circle, hover: true };
          }
          return { ...circle, hover: false };
        })
      );
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const updateCircles = () => {
      setCircles((prevCircles) =>
        prevCircles.map((circle) => {
          let newX = circle.x + circle.speedX;
          let newY = circle.y + circle.speedY;

          if (newX < 0 || newX > window.innerWidth) circle.speedX *= -1;
          if (newY < 0 || newY > window.innerHeight) circle.speedY *= -1;

          const newOpacity = Math.max(0, circle.opacity + (Math.random() * 0.01 - 0.005));
          const newColor = `hsl(${(parseFloat(circle.color.split('(')[1].split(')')[0]) + 0.1) % 360}, 100%, 75%)`;

          return { ...circle, x: newX, y: newY, opacity: newOpacity, color: newColor };
        })
      );
    };

    const interval = setInterval(updateCircles, 16);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { circles, mousePos };
};

