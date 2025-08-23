import { motion, useScroll, useTransform } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState, useRef, useEffect } from "react";

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

export const Contact = () => {
  // Khởi tạo EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const contactRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const headerY = useTransform(scrollYProgress, [0, 0.5], [-30, 30]);
  const formY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const infoY = useTransform(scrollYProgress, [0, 1], [100, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: "",
    });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        }
      );

      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: "Message sent successfully!",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <motion.section
      id="contact"
      className="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      ref={contactRef}
      style={{ position: "relative", opacity }}
    >
      {/* Background elements */}
      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,153,153,0.1) 0%, rgba(255,153,153,0) 70%)",
          filter: "blur(60px)",
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
          zIndex: 0,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,153,153,0.08) 0%, rgba(255,153,153,0) 70%)",
          filter: "blur(40px)",
          y: useTransform(scrollYProgress, [0, 1], [-50, 50]),
          zIndex: 0,
        }}
      />

      {/* Dots pattern */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ff9999\" fill-opacity=\"0.05\" fill-rule=\"evenodd\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"3\"/%3E%3Ccircle cx=\"13\" cy=\"13\" r=\"3\"/%3E%3C/g%3E%3C/svg%3E')",
          backgroundSize: "20px 20px",
          opacity: 0.5,
          zIndex: -1,
          y: useTransform(scrollYProgress, [0, 1], [0, -30]),
        }}
      />

      <div className="contact-container">
        <div className="section-header glowing-effect">
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            style={{ y: headerY }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Have a project in mind? Let's talk about it!
          </motion.p>
        </div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            style={{ y: infoY, scale }}
          >
            <motion.div className="contact-method" variants={fadeInUp}>
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-details">
                <h4>Location</h4>
                <p>An Phú Đông, Hồ Chí Minh</p>
              </div>
            </motion.div>

            <motion.div className="contact-method" variants={fadeInUp}>
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>phananhthai.dao04@gmail.com</p>
              </div>
            </motion.div>

            <motion.div className="contact-method" variants={fadeInUp}>
              <div className="contact-icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p>+84 98 3568 708</p>
              </div>
            </motion.div>

            <motion.div
              className="contact-socials"
              variants={fadeInUp}
              style={{ marginTop: "1rem" }}
            >
              <h4 style={{ marginBottom: "1rem" }}>Follow Me</h4>
              <div className="social-links">
                <motion.a
                  href="https://github.com/Newbie1402"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <i className="fab fa-github"></i>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/%C4%91%C3%A0o-phan-anh-th%C3%A1i-b63618325/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <i className="fab fa-linkedin"></i>
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/aophananhthai"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                >
                  <i className="fab fa-facebook"></i>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            className="contact-form glass-effect"
            onSubmit={handleSubmit}
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            style={{ y: formY }}
          >
            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your Name"
              />
            </motion.div>

            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="abc@example.com"
              />
            </motion.div>

            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Hi, I'd like to discuss a project..."
              ></textarea>
            </motion.div>

            {formStatus.message && (
              <motion.div
                className={`form-message ${
                  formStatus.success ? "success" : "error"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "0.8rem",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  background:
                    formStatus.success
                      ? "rgba(52, 211, 153, 0.1)"
                      : "rgba(239, 68, 68, 0.1)",
                  color: formStatus.success ? "#059669" : "#dc2626",
                  border:
                    formStatus.success
                      ? "1px solid rgba(52, 211, 153, 0.2)"
                      : "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                {formStatus.message}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={formStatus.submitting}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="shimmer-effect"
            >
              {formStatus.submitting ? "Sending..." : "Send Message"}
              <i
                className="fas fa-paper-plane"
                style={{ marginLeft: "0.5rem" }}
              ></i>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};
