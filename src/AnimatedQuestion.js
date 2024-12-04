import React, { useEffect, useRef } from 'react';

const AnimatedQuestion = ({ questionId }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const duration = 5000; // 5 seconds

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;

    const animations = {
      1: () => {
        // Animation for question 1: Three objects floating across the screen with varied paths
        const shapes = [
          {type: 'circle', x: 0, y: canvas.height * 0.2, color: 'red', size: 80, speed: 1, amplitude: 50},
          {type: 'square', x: 0, y: canvas.height * 0.5, color: 'blue', size: 70, speed: 1.2, amplitude: 30},
          {type: 'triangle', x: 0, y: canvas.height * 0.8, color: 'green', size: 90, speed: 0.8, amplitude: 70}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          shapes.forEach((shape) => {
            const progress = (elapsedTime / duration) * shape.speed;
            const x = progress * canvas.width;
            const y = shape.y + Math.sin(progress * Math.PI * 2) * shape.amplitude;
            drawShape(shape, x, y);
          });
        };
      },
      2: () => {
        // Animation for question 2: One triangle and three circles with complex movements
        const shapes = [
          {type: 'triangle', x: canvas.width * 0.5, y: canvas.height * 0.5, color: 'darkorange', size: 120, speed: 0.7},
          {type: 'circle', x: canvas.width * 0.2, y: canvas.height * 0.3, color: 'red', size: 100, speed: 1.2},
          {type: 'circle', x: canvas.width * 0.8, y: canvas.height * 0.3, color: 'blue', size: 90, speed: 0.9},
          {type: 'circle', x: canvas.width * 0.5, y: canvas.height * 0.7, color: 'green', size: 110, speed: 1.5}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          shapes.forEach((shape, index) => {
            const angle = (elapsedTime / 1000) * shape.speed + (index * 2 * Math.PI / shapes.length);
            const radius = Math.min(canvas.width, canvas.height) * 0.3;
            const x = shape.x + Math.cos(angle) * radius;
            const y = shape.y + Math.sin(angle) * radius;
            drawShape(shape, x, y);
          });
        };
      },
      3: () => {
        // Animation for question 3: One circle, one triangle, and two squares with specific colors
        const shapes = [
          {type: 'circle', x: canvas.width * 0.2, y: canvas.height * 0.3, color: 'red', size: 100, speed: 1.2},
          {type: 'triangle', x: canvas.width * 0.5, y: canvas.height * 0.5, color: 'green', size: 120, speed: 0.9},
          {type: 'square', x: canvas.width * 0.8, y: canvas.height * 0.3, color: 'red', size: 90, speed: 1.5},
          {type: 'square', x: canvas.width * 0.5, y: canvas.height * 0.7, color: 'blue', size: 110, speed: 0.7}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          shapes.forEach((shape, index) => {
            const angle = (elapsedTime / 1000) * shape.speed + (index * 2 * Math.PI / shapes.length);
            const radius = Math.min(canvas.width, canvas.height) * 0.3;
            const x = shape.x + Math.cos(angle) * radius;
            const y = shape.y + Math.sin(angle) * radius;
            drawShape(shape, x, y);
          });
        };
      },
      4: () => {
        // Animation for question 4: Six shapes with different colors and movements
        const shapes = [
          {type: 'circle', x: canvas.width * 0.2, y: canvas.height * 0.2, color: 'red', size: 100, speed: 0.8},
          {type: 'square', x: canvas.width * 0.8, y: canvas.height * 0.2, color: 'blue', size: 90, speed: 0.6},
          {type: 'triangle', x: canvas.width * 0.5, y: canvas.height * 0.5, color: 'green', size: 110, speed: 1.0},
          {type: 'circle', x: canvas.width * 0.2, y: canvas.height * 0.8, color: 'darkorange', size: 80, speed: 1.2},
          {type: 'square', x: canvas.width * 0.8, y: canvas.height * 0.8, color: 'purple', size: 95, speed: 0.7},
          {type: 'triangle', x: canvas.width * 0.5, y: canvas.height * 0.2, color: 'orange', size: 105, speed: 0.5}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          shapes.forEach((shape, index) => {
            const angle = (elapsedTime / 1000) * shape.speed + (index * Math.PI / 3);
            const radius = Math.min(canvas.width, canvas.height) * 0.3;
            const x = shape.x + Math.cos(angle) * radius;
            const y = shape.y + Math.sin(angle) * radius;
            drawShape(shape, x, y);
          });
        };
      },
      5: () => {
        // Animation for question 5: Two circles moving at different speeds
        const shapes = [
          {type: 'circle', x: 0, y: canvas.height * 0.3, color: 'gray', size: 80, speed: 0.5},
          {type: 'circle', x: 0, y: canvas.height * 0.7, color: 'orange', size: 80, speed: 1}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          shapes.forEach((shape) => {
            const progress = (elapsedTime / duration) * shape.speed;
            const x = (progress % 1) * canvas.width;
            const y = shape.y + Math.sin(progress * Math.PI * 2) * 50;
            drawShape(shape, x, y);
          });
        };
      },
      6: () => {
        // Animation for question 6: Shapes appearing one by one, with the last one being purple
        const shapes = [
          {type: 'circle', x: canvas.width * 0.2, y: canvas.height * 0.3, color: 'red', size: 80, delay: 0},
          {type: 'square', x: canvas.width * 0.5, y: canvas.height * 0.5, color: 'blue', size: 80, delay: 1000},
          {type: 'triangle', x: canvas.width * 0.8, y: canvas.height * 0.7, color: 'green', size: 80, delay: 2000},
          {type: 'circle', x: canvas.width * 0.5, y: canvas.height * 0.2, color: 'purple', size: 80, delay: 3000}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          shapes.forEach((shape) => {
            if (elapsedTime > shape.delay) {
              drawShape(shape, shape.x, shape.y);
            }
          });
        };
      },
      7: () => {
        // Animation for question 7: Five red stars appearing and twinkling
        const stars = [
          {x: canvas.width * 0.2, y: canvas.height * 0.2, size: 60},
          {x: canvas.width * 0.4, y: canvas.height * 0.6, size: 50},
          {x: canvas.width * 0.6, y: canvas.height * 0.3, size: 70},
          {x: canvas.width * 0.8, y: canvas.height * 0.7, size: 55},
          {x: canvas.width * 0.5, y: canvas.height * 0.5, size: 65}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          stars.forEach((star, index) => {
            const twinkle = Math.sin(elapsedTime * 0.01 + index) * 0.5 + 0.5;
            drawStar(star.x, star.y, 5, star.size / 2, star.size / 4, `rgba(255, 0, 0, ${twinkle})`);
          });
        };
      },
      8: () => {
        // Animation for question 8: Pulsing square in the center with other shapes
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxSize = 100;

        const shapes = [
          {type: 'circle', x: canvas.width * 0.2, y: canvas.height * 0.2, color: 'green', size: 60},
          {type: 'triangle', x: canvas.width * 0.8, y: canvas.height * 0.2, color: 'red', size: 70},
          {type: 'circle', x: canvas.width * 0.2, y: canvas.height * 0.8, color: 'purple', size: 50},
          {type: 'triangle', x: canvas.width * 0.8, y: canvas.height * 0.8, color: 'orange', size: 60}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw other shapes
          shapes.forEach(shape => {
            drawShape(shape, shape.x, shape.y);
          });

          // Draw pulsing square in the center
          const size = Math.sin(elapsedTime * 0.005) * (maxSize / 4) + (maxSize / 2);
          ctx.fillStyle = 'blue';
          ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size);
        };
      },
      9: () => {
        // Animation for question 9: Shapes moving in a circular pattern
        const shapes = [
          {type: 'circle', color: 'red', size: 40},
          {type: 'square', color: 'blue', size: 40},
          {type: 'triangle', color: 'green', size: 40}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          const radius = Math.min(canvas.width, canvas.height) * 0.3;

          shapes.forEach((shape, index) => {
            const angle = (elapsedTime / 1000) * 2 + (index * 2 * Math.PI / shapes.length);
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            drawShape(shape, x, y);
          });
        };
      },
      10: () => {
        // Animation for question 10: Shapes appearing one by one, with the last one being red
        const shapes = [
          {type: 'circle', x: canvas.width * 0.2, y: canvas.height * 0.5, color: 'blue', size: 60, delay: 0},
          {type: 'square', x: canvas.width * 0.4, y: canvas.height * 0.3, color: 'green', size: 60, delay: 1000},
          {type: 'triangle', x: canvas.width * 0.6, y: canvas.height * 0.7, color: 'yellow', size: 60, delay: 2000},
          {type: 'circle', x: canvas.width * 0.8, y: canvas.height * 0.5, color: 'red', size: 60, delay: 3000}
        ];

        return (elapsedTime) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          shapes.forEach((shape) => {
            if (elapsedTime > shape.delay) {
              drawShape(shape, shape.x, shape.y);
            }
          });
        };
      },
    };

    const drawShape = (shape, x, y, scale = 1) => {
      ctx.beginPath();
      if (shape.type === 'circle') {
        ctx.arc(x, y, shape.size / 2, 0, Math.PI * 2);
      } else if (shape.type === 'square') {
        ctx.rect(x - shape.size / 2, y - shape.size / 2, shape.size, shape.size);
      } else if (shape.type === 'triangle') {
        ctx.moveTo(x, y - shape.size / 2);
        ctx.lineTo(x - shape.size / 2, y + shape.size / 2);
        ctx.lineTo(x + shape.size / 2, y + shape.size / 2);
        ctx.closePath();
      }
      ctx.fillStyle = shape.color;
      ctx.fill();
    };

    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, color) => {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      let step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = (startTime) => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < duration) {
        const animationFunction = animations[questionId] ? animations[questionId]() : () => {};
        animationFunction(elapsedTime);
        requestAnimationFrame(() => animate(startTime));
      }
    };

    const hexToRgb = (hex) => {
      // Provide a default color if hex is invalid
      const defaultColor = { r: 0, g: 0, b: 0 };
      if (!hex || typeof hex !== 'string') return defaultColor;

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : defaultColor;
    };

    const interpolateColor = (color1, color2, factor = 0.5) => {
      // Ensure both colors are valid
      const c1 = hexToRgb(color1);
      const c2 = hexToRgb(color2);

      const result = {
        r: Math.round(c1.r + factor * (c2.r - c1.r)),
        g: Math.round(c1.g + factor * (c2.g - c1.g)),
        b: Math.round(c1.b + factor * (c2.b - c1.b))
      };
      return `rgb(${result.r}, ${result.g}, ${result.b})`;
    };

    const drawMorphingShape = (fromShape, toShape, x, y, size, color, progress) => {
      ctx.fillStyle = color;
      ctx.beginPath();

      if (fromShape === 'circle' && toShape === 'square') {
        const radius = size / 2;
        const squareSize = size * Math.sqrt(2); // To make the square's area roughly equal to the circle's
        for (let i = 0; i < 4; i++) {
          const angle = (Math.PI / 4) + (i * Math.PI / 2);
          const cornerX = x + Math.cos(angle) * (radius + (squareSize / 2 - radius) * progress);
          const cornerY = y + Math.sin(angle) * (radius + (squareSize / 2 - radius) * progress);
          if (i === 0) ctx.moveTo(cornerX, cornerY);
          else ctx.lineTo(cornerX, cornerY);
        }
      } else if (fromShape === 'square' && toShape === 'triangle') {
        const squareSize = size;
        const triangleHeight = size * Math.sqrt(3) / 2;
        const top = y - triangleHeight / 2 + (triangleHeight / 2) * (1 - progress);
        const bottom = y + triangleHeight / 2;
        const left = x - size / 2;
        const right = x + size / 2;
        ctx.moveTo(x, top);
        ctx.lineTo(left + (x - left) * progress, bottom);
        ctx.lineTo(right - (right - x) * progress, bottom);
      } else if (fromShape === 'triangle' && toShape === 'pentagon') {
        const radius = size / 2;
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI / 2) + (i * 2 * Math.PI / 5);
          const cornerX = x + Math.cos(angle) * radius;
          const cornerY = y + Math.sin(angle) * radius;
          if (i === 0) ctx.moveTo(cornerX, cornerY);
          else ctx.lineTo(cornerX, cornerY);
        }
      } else {
        // Default to circle if shapes don't match any transition
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      }

      ctx.closePath();
      ctx.fill();
    };

    const startTime = Date.now();
    animate(startTime);

    return () => {
      // Cleanup if needed
    };
  }, [questionId]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: '60px', left: 0 }} />;
};

export default AnimatedQuestion;
