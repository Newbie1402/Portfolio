import "./App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Divider } from "./components/Divider";
import { RealImageBackground } from "./components/RealImageBackground";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  return (
    <div className={`app ${isLoaded ? "loaded" : ""}`}>
      {/* Sử dụng RealImageBackground thay vì ImageBackground */}
      <RealImageBackground />

      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Divider giữa Hero và Projects với hiệu ứng sóng */}
      <Divider variant="wave" bgColor="var(--section-alt-bg)" />

      {/* Projects Section */}
      <Projects />

      {/* Divider giữa Projects và Contact với hiệu ứng curve */}
      <Divider variant="curve" bgColor="var(--section-dark-bg)" />

      {/* Contact Section */}
      <Contact />

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p> &copy; 2025 Newbie. All rights reserved.</p>
      </motion.footer>
    </div>
  );
}

export default App;
