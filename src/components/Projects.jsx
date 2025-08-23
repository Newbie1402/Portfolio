import { motion, useScroll, useTransform } from "framer-motion";
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

// Hiệu ứng nổi nhẹ nhàng cho các project card
const floatAnimation = (delay = 0) => ({
  y: [0, -5, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
    delay,
  },
});

export const Projects = () => {
  const projectsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const headerY = useTransform(scrollYProgress, [0, 0.5], [-50, 50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    [0, 1, 1, 0.5]
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  const projects = [
    {
      title: "Koi Service",
      image: "/projects/img_1.png",
      description:
        "The Koi Fish Veterinary Service Management System optimizes service booking and management for Koi care centers, providing professional care features and easy access for customers.",
      technologies: ["React", "CSS", "Spring boot"],
      link: "https://github.com/Newbie1402/Service-Koi",
      delay: 0,
      parallaxSpeed: 0.8,
    },
    {
      title: "Shoe Store",
      image: "/projects/img.png",
      description:
        "ShoeStore is a modern platform for online and in-store shoe shopping, offering customers convenience and staff efficient tools like barcode scanning, carts, AI chatbot, and scheduling.",
      technologies: ["React", "CSS","Spring boot", "Redis", "Kafka", "AWS S3"],
      link: "https://github.com/Newbie1402/ShoeStore",
      delay: 0.1,
      parallaxSpeed: 1,
    },
    {
      title: "Doctor Appointment Booking System",
      image: "/projects/img_2.png",
      description:
        "The Online Doctor Appointment System allows patients to easily book appointments with doctors, providing a convenient and efficient healthcare experience.",
      technologies: ["React", "CSS","Spring boot", "Redis"],
      link: "https://github.com/Ho4Vit/Doctor-Appointment-Booking-System",
      delay: 0.2,
      parallaxSpeed: 1.2,
    },
  ];

  return (
    <motion.section
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      ref={projectsRef}
      style={{ position: "relative", opacity }}
    >
      {/* Background elements */}
      <motion.div
        style={{
          position: "absolute",
          top: "15%",
          right: "10%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,153,153,0.08) 0%, rgba(255,153,153,0) 70%)",
          filter: "blur(40px)",
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          zIndex: 0,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "5%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,153,153,0.1) 0%, rgba(255,153,153,0) 70%)",
          filter: "blur(50px)",
          y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          zIndex: 0,
        }}
      />

      <div className="section-header glowing-effect">
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          style={{ y: headerY }}
        >
          My Projects
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
        </motion.p>
      </div>

      <motion.div
        className="projects-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        style={{ scale }}
      >
        {projects.map((project, index) => {
          // Tính toán hiệu ứng parallax cho từng project card dựa vào scrollYProgress
          const cardY = useTransform(
            scrollYProgress,
            [0, 1],
            [50 * project.parallaxSpeed, -50 * project.parallaxSpeed]
          );

          return (
            <motion.div
              key={index}
              className="project-card shimmer-effect"
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(255, 153, 153, 0.3)",
                transition: { duration: 0.3 },
              }}
              style={{
                y: cardY,
                transition: "box-shadow 0.3s ease",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="project-img"
              />
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech">
                      {tech}
                    </span>
                  ))}
                </div>
                <motion.a
                  href={project.link}
                  className="primary-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Project
                </motion.a>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};
