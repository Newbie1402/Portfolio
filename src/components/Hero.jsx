import { motion, useScroll, useTransform } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Tạo các giá trị transform dựa trên scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]); // Hero content moves slower
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]); // Code container moves faster in opposite direction
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, -5]);

  return (
    <motion.section
      id="home"
      className="hero"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background elements */}
      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,153,153,0.1) 0%, rgba(255,153,153,0) 70%)",
          filter: "blur(40px)",
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
          x: useTransform(scrollYProgress, [0, 1], [0, -100]),
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,153,153,0.15) 0%, rgba(255,153,153,0) 70%)",
          filter: "blur(30px)",
          y: useTransform(scrollYProgress, [0, 1], [0, 150]),
          x: useTransform(scrollYProgress, [0, 1], [0, 100]),
        }}
      />

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{ y: y1, scale }}
        >
          <motion.div
            className="hero-badge shimmer-effect"
            variants={fadeInUp}
          >
            <span>👋 Hello, I'm</span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            className="glowing-effect"
          >
            New<span style={{ color: "var(--primary-color)" }}>bie</span>
          </motion.h1>
          <motion.h2
              className="hero-subtitle"
              variants={fadeInUp}
          >
            Backend Developer & System Architect
          </motion.h2>
          <motion.p
              className="hero-description"
              variants={fadeInUp}
          >
            I specialize in building scalable, secure, and high-performance backend systems.
            With strong experience in designing APIs, database management, and cloud infrastructure,
            I turn complex business requirements into reliable software solutions.
          </motion.p>

          <motion.div
            className="buttons"
            variants={staggerContainer}
          >
            <motion.a
              href="#projects"
              className="primary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeInUp}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="secondary-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeInUp}
            >
              Contact Me
            </motion.a>
          </motion.div>

          <motion.div
            className="social-links"
            variants={staggerContainer}
          >
            <motion.a
              href="https://github.com/Newbie1402"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              variants={fadeInUp}
            >
              <i className="fab fa-github"></i>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/%C4%91%C3%A0o-phan-anh-th%C3%A1i-b63618325/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              variants={fadeInUp}
            >
              <i className="fab fa-linkedin"></i>
            </motion.a>
            <motion.a
              href="https://www.facebook.com/aophananhthai"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              variants={fadeInUp}
            >
              <i className="fab fa-facebook"></i>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image-container glass-effect"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            y: y2,
            rotate,
            display: 'block',
            flex: '1',
            maxWidth: '500px',
            transformOrigin: "center right"
          }}
        >
          <div className="code-display">
            <SyntaxHighlighter
              language="typescript"
              customStyle={{
                margin: 0,
                padding: "2rem",
                height: "100%",
                borderRadius: "20px",
                background: "rgba(255, 248, 248, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 153, 153, 0.2)",
              }}
              codeTagProps={{
                style: {
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                }
              }}
              wrapLongLines={true}
            >
              {`// Welcome to my portfolio
package com.newbie.portfolio;

import java.util.List;

public class Project {
    private String title;
    private String description;
    private List<String> technologies;
    private String link;

    // constructor, getters, setters
}

public class NewbieBE {
    private String name = "Newbie";
    private String role = "Backend Developer";
    private List<String> skills = List.of(
        "Java", "Spring Boot", "Spring Security",
        "Spring Data JPA", "Hibernate",
        "REST API", "Microservices",
        "MySQL", "PostgreSQL",
        "Redis", "Kafka"
    );

    private List<Project> projects;

    public void contact() {
        System.out.println("Let's build robust backend systems together!");
    }
}
`}
            </SyntaxHighlighter>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <p style={{
          fontSize: "14px",
          fontWeight: 500,
          marginBottom: "8px",
          color: "var(--light-text)"
        }}>
          Scroll Down
        </p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary-color)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </motion.section>
  );
};
