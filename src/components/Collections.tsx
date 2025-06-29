import React from "react";

const Collections: React.FC = () => {
  const collectionItems: string[] = [
    "https://images.meesho.com/images/products/304116583/2g0gv_512.webp",
    "https://i.pinimg.com/736x/37/64/ed/3764edcd3455f35f33d53580ce597a3e.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbntf-CnsLyS9Hwlm9KmTRE6kpB59t1eDsAg&s",
    "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
    "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
    "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
    "https://img.theloom.in/blog/wp-content/uploads/2023/09/14-03-23-918-e1695289116121.png",
  ];

  const topRow = collectionItems.slice(0, 4);
  const bottomRow = collectionItems.slice(4);

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
        `}
      </style>

      <div className="relative overflow-hidden">
        <div className="bg-[#CC7351] p-4 md:p-6 lg:p-8 clip-zigzag w-full h-[18rem] md:h-[26rem] lg:h-[34rem]">
          <div className="flex flex-col gap-10 md:gap-16 lg:gap-20 items-center w-full max-w-6xl mx-auto">
            <div className="flex justify-center flex-wrap gap-4 md:gap-8 lg:gap-12">
              {topRow.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white rounded-full overflow-hidden
                     w-16 h-16
                    md:w-28 md:h-28
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

            <div className="flex justify-center flex-wrap gap-4 md:gap-8 lg:gap-12">
              {bottomRow.map((item, index) => (
                <div
                  key={index + 4}
                  className="
                    bg-white rounded-full  overflow-hidden
                    w-16 h-16
                    md:w-28 md:h-28
                    lg:w-40 lg:h-40
                    transition-all duration-300
                  "
                >
                  <img
                    src={item}
                    alt={"Item " + (index + 5)}
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
