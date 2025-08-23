import { useEffect, useRef, useState } from 'react';

export const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    // Cần nhập động để tránh lỗi khi server-side rendering
    const loadVanta = async () => {
      try {
        const THREE = await import('three');
        const BIRDS = await import('vanta/dist/vanta.birds.min');

        if (!vantaEffect && backgroundRef.current) {
          const effect = BIRDS.default({
            el: backgroundRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xfff5f5, // Màu nền phù hợp với tone hồng pastel
            color1: 0xff9999, // Màu chính - hồng pastel
            color2: 0xffb8b8, // Màu phụ 1
            colorMode: "variance",
            birdSize: 1.10,
            wingSpan: 24.00,
            speedLimit: 4.00,
            separation: 35.00,
            alignment: 20.00,
            cohesion: 20.00,
            quantity: 3.00 // Số lượng birds - điều chỉnh phù hợp
          });
          setVantaEffect(effect);
        }
      } catch (error) {
        console.error("Không thể tải Vanta.js:", error);
        // Fallback để trang web không bị trắng
        if (backgroundRef.current) {
          backgroundRef.current.style.background = "linear-gradient(135deg, #fff5f5, #ffe8e8)";
        }
      }
    };

    loadVanta();

    // Cleanup effect khi component unmount
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div 
      ref={backgroundRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    >
      {/* Fallback background với CSS gradient để tránh màn hình trắng */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(255,245,245,1) 0%, rgba(255,232,232,1) 100%)',
        zIndex: -1,
        opacity: 0.8
      }}></div>
    </div>
  );
};
