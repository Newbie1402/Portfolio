import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log("Initializing tsParticles");
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("Particles loaded:", container);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Giá trị này phải cao hơn static-background (-2)
        pointerEvents: "none", // Cho phép tương tác với các phần tử bên dưới
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          autoPlay: true,
          background: {
            color: {
              value: "transparent",
            },
            opacity: 0,
          },
          backgroundMask: {
            composite: "destination-out",
            cover: {
              color: {
                value: "#fff",
              },
              opacity: 1,
            },
            enable: false,
          },
          fullScreen: {
            enable: false, // Tắt chế độ fullScreen mặc định và dùng container
          },
          detectRetina: true,
          fpsLimit: 60,
          particles: {
            color: {
              value: [
                "#ff9999", // Màu chính
                "#ffb8b8", // Màu phụ 1
                "#ff7a7a", // Màu phụ 2
                "#ffd1d1", // Màu nhạt hơn
              ],
            },
            links: {
              color: "#ff9999",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1.2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80, // Tăng số lượng hạt để dễ nhìn thấy hơn
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 0.5,
                opacity_min: 0.1,
                sync: false,
              },
            },
            shape: {
              type: ["circle", "triangle", "star"],
            },
            size: {
              value: { min: 1, max: 5 },
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.3,
                sync: false,
              },
            },
            twinkle: {
              lines: {
                enable: true,
                frequency: 0.05,
                opacity: 0.5,
                color: {
                  value: "#ff9999",
                },
              },
              particles: {
                enable: true,
                frequency: 0.05,
                opacity: 0.5,
                color: {
                  value: "#ff9999",
                },
              },
            },
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "bubble",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              bubble: {
                distance: 150,
                size: 6,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
            },
          },
        }}
      />
    </div>
  );
};
