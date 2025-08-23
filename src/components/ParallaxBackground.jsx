import { useMultiParallax } from "../hooks/useParallax";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef(null);

  // Tạo các giá trị transform dựa trên scroll
  const y1 = useTransform(scrollY, [0, 1000], [0, -300]); // Chậm
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]); // Trung bình
  const y3 = useTransform(scrollY, [0, 1000], [0, -100]); // Nhanh

  // Hiệu ứng parallax cho các hình tròn
  const circlesOffset = useMultiParallax([0.1, 0.15, 0.2, 0.25, 0.3]);

  // Tạo mảng các đối tượng hình tròn với các thuộc tính khác nhau
  const circles = [
    { size: 120, left: "10%", top: "20%", opacity: 0.4, delay: 0, offsetIndex: 0 },
    { size: 80, left: "75%", top: "15%", opacity: 0.3, delay: 0.1, offsetIndex: 1 },
    { size: 200, left: "20%", top: "60%", opacity: 0.2, delay: 0.2, offsetIndex: 2 },
    { size: 150, left: "80%", top: "70%", opacity: 0.3, delay: 0.3, offsetIndex: 3 },
    { size: 100, left: "50%", top: "30%", opacity: 0.2, delay: 0.4, offsetIndex: 4 }
  ];

  // Tạo mảng các phần tử pattern với các thuộc tính khác nhau
  const patterns = [
    {
      backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h20L0 20z\" fill=\"%23ff9999\" fill-opacity=\"0.05\"/%3E%3C/svg%3E')",
      backgroundSize: "20px 20px",
      y: y1,
      opacity: 0.7
    },
    {
      backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ff9999\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"20\" cy=\"20\" r=\"5\"/%3E%3C/g%3E%3C/svg%3E')",
      backgroundSize: "40px 40px",
      y: y2,
      opacity: 0.5
    },
    {
      backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ff9999\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      backgroundSize: "60px 60px",
      y: y3,
      opacity: 0.3
    }
  ];

  return (
    <div
      ref={containerRef}
      className="parallax-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -10
      }}
    >
      {/* Lớp nền gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #fff5f5, #ffe8e8)',
          zIndex: -9
        }}
      />

      {/* Các lớp pattern với hiệu ứng parallax */}
      {patterns.map((pattern, index) => (
        <motion.div
          key={`pattern-${index}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '200%',
            backgroundImage: pattern.backgroundImage,
            backgroundSize: pattern.backgroundSize,
            opacity: pattern.opacity,
            y: pattern.y,
            zIndex: -8 + index
          }}
        />
      ))}

      {/* Các hình tròn với hiệu ứng parallax */}
      {circles.map((circle, index) => (
        <motion.div
          key={`circle-${index}`}
          className="parallax-circle"
          style={{
            position: 'absolute',
            width: circle.size,
            height: circle.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at center, rgba(255, 153, 153, ${circle.opacity}) 0%, rgba(255, 153, 153, 0) 70%)`,
            left: circle.left,
            top: circle.top,
            opacity: circle.opacity,
            filter: 'blur(20px)',
            zIndex: -7,
            transform: `translateY(${circlesOffset[circle.offsetIndex]}px)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: circle.opacity }}
          transition={{ duration: 1, delay: circle.delay }}
        />
      ))}
    </div>
  );
};
