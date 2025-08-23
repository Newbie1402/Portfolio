import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Component hiển thị background với hình ảnh thực tế cho portfolio developer
 */
export const RealImageBackground = () => {
  // Danh sách các hình ảnh background phù hợp
  const backgroundImages = [
    // Hình ảnh code thực tế
    {
      url: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1470&auto=format&fit=crop",
      opacity: 0.2
    },
    // Hình ảnh laptop và code
    {
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop",
      opacity: 0.25
    },
    // Hình ảnh workspace developer
    {
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1469&auto=format&fit=crop",
      opacity: 0.2
    }
  ];
  
  // State để lưu trữ index của hình nền đang hiển thị
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Tự động chuyển đổi hình ảnh sau mỗi 10 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Lấy hình ảnh hiện tại
  const currentImage = backgroundImages[currentIndex];
  
  return (
    <>
      {/* Background với hình ảnh thực tế */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url("${currentImage.url}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: currentImage.opacity,
          zIndex: -10, // Đảm bảo z-index thấp hơn mọi thành phần khác
        }}
      />

      {/* Vô hiệu hóa tất cả các background khác */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "transparent",
          zIndex: -5, // Đặt z-index cao hơn các background cũ
        }}
      />
      
      {/* Gradient overlay để tăng độ tương phản với nội dung */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at center top, rgba(255, 245, 245, 0.7) 0%, rgba(255, 153, 153, 0.1) 100%)",
          zIndex: -4, // Đặt z-index cao hơn background nhưng thấp hơn nội dung
        }}
      />
      
      {/* Hiệu ứng sáng ở góc trên bên phải */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "fixed",
          top: "-10%",
          right: "-10%",
          width: "30%",
          height: "30%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,153,153,0.15) 0%, rgba(255,153,153,0) 70%)",
          filter: "blur(40px)",
          zIndex: -3,
        }}
      />
      
      {/* Hiệu ứng sáng ở góc dưới bên trái */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          delay: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "fixed",
          bottom: "-5%",
          left: "-5%",
          width: "25%",
          height: "25%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,153,153,0.1) 0%, rgba(255,153,153,0) 70%)",
          filter: "blur(30px)",
          zIndex: -3,
        }}
      />
    </>
  );
};
