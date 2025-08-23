import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Component tạo các điểm 3D đơn giản hơn và tương thích với React 18
function StarField({ count = 3000 }) {
  const pointsRef = useRef();

  // Tạo các vị trí ngẫu nhiên
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  // Màu chủ đạo: #FF9999 (hồng pastel)
  const mainColor = new THREE.Color("#FF9999");

  // Tạo các điểm với màu sắc và vị trí
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Vị trí
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;

    // Màu sắc - biến thể của màu chủ đạo
    const color = new THREE.Color(mainColor);
    color.multiplyScalar(0.5 + Math.random() * 0.5);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
  }

  // Animation đơn giản hơn để tránh lỗi
  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <Points ref={pointsRef}>
      <bufferAttribute
        attach="geometry.attributes.position"
        count={positions.length / 3}
        array={positions}
        itemSize={3}
      />
      <bufferAttribute
        attach="geometry.attributes.color"
        count={colors.length / 3}
        array={colors}
        itemSize={3}
      />
      <PointMaterial
        transparent
        vertexColors
        size={0.1}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Fallback component để hiển thị khi có lỗi với 3D
function FallbackBackground() {
  return (
    <div
      className="fallback-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #FFF1F2, #FEF4F5)",
        zIndex: -1,
      }}
    />
  );
}

// Component chính cho background 3D với error boundary
export function Background3D() {
  try {
    return (
      <motion.div
        className="background3d"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <StarField />
        </Canvas>
      </motion.div>
    );
  } catch (error) {
    console.error("Error rendering 3D background:", error);
    return <FallbackBackground />;
  }
}
