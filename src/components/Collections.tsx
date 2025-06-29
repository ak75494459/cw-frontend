import React from "react";

const Collections: React.FC = () => {
  const collectionItems: string[] = [
    "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
    "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
    "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
    "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
    "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
  ];

  // Responsive detection
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Adjust images based on screen size
  const topRow = isMobile
    ? collectionItems.slice(0, 2)
    : collectionItems.slice(0, 3);
  const bottomRow = isMobile
    ? collectionItems.slice(2, 3)
    : collectionItems.slice(3, 5);

  return (
    <div className="flex flex-col w-full bg-white py-8">
      <div className="m-auto p-4 md:p-6 mb-3 font-bold text-xl md:text-2xl lg:text-3xl text-center">
        Shop Our Latest Collections
      </div>

      <style>
        {`
          .clip-zigzag {
            animation: zigzagWave 3s infinite linear;
          }

          @keyframes zigzagWave {
            0% {
              clip-path: polygon(
                0% 85%, 10% 100%, 20% 85%, 30% 100%, 40% 85%, 50% 100%, 
                60% 85%, 70% 100%, 80% 85%, 90% 100%, 100% 85%, 100% 0%, 0% 0%
              );
            }
            25% {
              clip-path: polygon(
                0% 85%, 0% 100%, 10% 85%, 20% 100%, 30% 85%, 40% 100%, 
                50% 85%, 60% 100%, 70% 85%, 80% 100%, 90% 85%, 100% 100%, 100% 0%, 0% 0%
              );
            }
            50% {
              clip-path: polygon(
                0% 85%, 0% 100%, 0% 85%, 10% 100%, 20% 85%, 30% 100%, 
                40% 85%, 50% 100%, 60% 85%, 70% 100%, 80% 85%, 90% 100%, 100% 85%, 100% 0%, 0% 0%
              );
            }
            75% {
              clip-path: polygon(
                0% 85%, 0% 100%, 0% 85%, 0% 100%, 10% 85%, 20% 100%, 
                30% 85%, 40% 100%, 50% 85%, 60% 100%, 70% 85%, 80% 100%, 90% 85%, 100% 100%, 100% 0%, 0% 0%
              );
            }
            100% {
              clip-path: polygon(
                0% 85%, 10% 100%, 20% 85%, 30% 100%, 40% 85%, 50% 100%, 
                60% 85%, 70% 100%, 80% 85%, 90% 100%, 100% 85%, 100% 0%, 0% 0%
              );
            }
          }

          @media (max-width: 768px) {
            .clip-zigzag {
              animation: zigzagWaveMobile 3s infinite linear;
            }

            @keyframes zigzagWaveMobile {
              0% {
                clip-path: polygon(
                  0% 95%, 10% 100%, 20% 95%, 30% 100%, 40% 95%, 50% 100%, 
                  60% 95%, 70% 100%, 80% 95%, 90% 100%, 100% 95%, 100% 0%, 0% 0%
                );
              }
              25% {
                clip-path: polygon(
                  0% 95%, 0% 100%, 10% 95%, 20% 100%, 30% 95%, 40% 100%, 
                  50% 95%, 60% 100%, 70% 95%, 80% 100%, 90% 95%, 100% 100%, 100% 0%, 0% 0%
                );
              }
              50% {
                clip-path: polygon(
                  0% 95%, 0% 100%, 0% 95%, 10% 100%, 20% 95%, 30% 100%, 
                  40% 95%, 50% 100%, 60% 95%, 70% 100%, 80% 95%, 90% 100%, 100% 95%, 100% 0%, 0% 0%
                );
              }
              75% {
                clip-path: polygon(
                  0% 95%, 0% 100%, 0% 95%, 0% 100%, 10% 95%, 20% 100%, 
                  30% 95%, 40% 100%, 50% 95%, 60% 100%, 70% 95%, 80% 100%, 90% 95%, 100% 100%, 100% 0%, 0% 0%
                );
              }
              100% {
                clip-path: polygon(
                  0% 95%, 10% 100%, 20% 95%, 30% 100%, 40% 95%, 50% 100%, 
                  60% 95%, 70% 100%, 80% 95%, 90% 100%, 100% 95%, 100% 0%, 0% 0%
                );
              }
            }
          }
        `}
      </style>

      <div className="relative overflow-hidden">
        <div className="bg-[#482923] p-4 md:p-6 lg:p-8 clip-zigzag w-full h-[20rem] md:h-[26rem] lg:h-[34rem]">
          <div className="flex flex-col gap-10 md:gap-16 lg:gap-20 items-center w-full max-w-6xl mx-auto">
            {/* Upper Row */}
            <div className="flex justify-center flex-wrap gap-20 md:gap-35 lg:gap-45">
              {topRow.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white rounded-full border-4 border-[#492822] overflow-hidden
                    w-30 h-30
                    md:w-32 md:h-32
                    lg:w-40 lg:h-40
                    transition-all duration-300
                  "
                >
                  <img
                    src={item}
                    alt={"Item " + (index + 1)}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Lower Row */}
            <div className="flex justify-center flex-wrap gap-20 md:gap-35 lg:gap-45">
              {bottomRow.map((item, index) => (
                <div
                  key={index + topRow.length}
                  className="
                    bg-white rounded-full border-4 border-[#492822] overflow-hidden
                    w-30 h-30
                    md:w-32 md:h-32
                    lg:w-40 lg:h-40
                    transition-all duration-300
                  "
                >
                  <img
                    src={item}
                    alt={"Item " + (index + topRow.length + 1)}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="m-auto p-4 md:p-6 mt-3 font-bold text-xl md:text-2xl lg:text-3xl text-center">
        One Look, One Hint!!!
      </div>
    </div>
  );
};

export default Collections;
