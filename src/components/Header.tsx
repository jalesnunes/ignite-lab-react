import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import menuOptionImg  from "/src/assets/menu-options.svg";

export function Header() {
    const [currentScreenWidth, setCurrentScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleResizeCurrentScreen() {
            setCurrentScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResizeCurrentScreen)
        
        window.removeEventListener('resize', handleResizeCurrentScreen)
    })

    

  return (
    <header className="w-full flex justify-center items-center h-20 bg-gray-700 border-b border-gray-600">
      {currentScreenWidth < 640 ? (
        <div className="w-full p-8 flex justify-between">
          <Logo />
          <button className="flex items-center gap-2">
            <span className="cursor-auto">Aulas</span>
            <img src={menuOptionImg} alt="" />
          </button>
        </div>
      ) : (
        <Logo />
      )}
    </header>
  );
}
