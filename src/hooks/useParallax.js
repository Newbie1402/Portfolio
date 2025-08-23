import { useEffect, useState } from 'react';

/**
 * Hook tùy chỉnh để tạo hiệu ứng parallax khi cuộn trang
 * @param {number} speed - Tốc độ di chuyển (1 = bình thường, < 1 = chậm hơn, > 1 = nhanh hơn)
 * @param {boolean} reverse - Nếu true, hướng di chuyển sẽ ngược lại
 * @returns {number} Giá trị vị trí mới dựa trên vị trí scroll
 */
export const useParallax = (speed = 0.3, reverse = false) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Hàm xử lý khi scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOffset = reverse
        ? -scrollPosition * speed
        : scrollPosition * speed;

      setOffset(newOffset);
    };

    // Đăng ký sự kiện scroll
    window.addEventListener('scroll', handleScroll);

    // Gọi ngay lần đầu để khởi tạo giá trị
    handleScroll();

    // Hủy đăng ký khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, reverse]);

  return offset;
};

/**
 * Hook để tạo hiệu ứng parallax cho nhiều phần tử với các tốc độ khác nhau
 * @param {Array<number>} speeds - Mảng các tốc độ cho các phần tử
 * @returns {Array<number>} Mảng các giá trị offset
 */
export const useMultiParallax = (speeds = [0.2, 0.4, 0.6]) => {
  const [offsets, setOffsets] = useState(speeds.map(() => 0));

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOffsets = speeds.map(speed => scrollPosition * speed);
      setOffsets(newOffsets);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speeds]);

  return offsets;
};
