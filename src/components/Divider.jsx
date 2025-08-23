import React from "react";
import { motion } from "framer-motion";

// Component Divider tạo đường phân cách giữa các section
export const Divider = ({ variant = "wave", inverted = false, bgColor = "var(--background)" }) => {
  // Các biến thể divider
  const dividerVariants = {
    wave: inverted
      ? "M0,64L60,80C120,96,240,128,360,138.7C480,149,600,139,720,122.7C840,107,960,85,1080,80C1200,75,1320,85,1380,90.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      : "M0,64L60,80C120,96,240,128,360,138.7C480,149,600,139,720,122.7C840,107,960,85,1080,80C1200,75,1320,85,1380,90.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z",

    tilt: inverted
      ? "M0,160L1440,32L1440,0L0,0Z"
      : "M0,160L1440,32L1440,0L0,0Z",

    curve: inverted
      ? "M0,128L1440,32L1440,0L0,0Z"
      : "M0,32L1440,128L1440,0L0,0Z"
  };

  return (
    <motion.div
      className="section-divider"
      style={{
        position: "relative",
        width: "100%",
        marginTop: inverted ? "-100px" : "0",
        marginBottom: inverted ? "0" : "-100px",
        height: "100px",
        transform: inverted ? "rotate(180deg)" : "rotate(0deg)",
        zIndex: 10,
        pointerEvents: "none"
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          transform: inverted ? "scaleX(-1)" : "none"
        }}
      >
        <path
          fill={bgColor}
          fillOpacity="1"
          d={dividerVariants[variant]}
        ></path>
      </svg>
      <div
        className="divider-shadow"
        style={{
          position: "absolute",
          bottom: inverted ? "auto" : "-20px",
          top: inverted ? "-20px" : "auto",
          left: 0,
          width: "100%",
          height: "20px",
          background: `linear-gradient(${inverted ? "to bottom" : "to top"}, rgba(0,0,0,0.05), transparent)`,
          zIndex: 5
        }}
      />
    </motion.div>
  );
};
