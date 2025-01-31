"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, CircleUser, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" });
  const menuRefs = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = menuRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement;
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    const activeElement = menuRefs.current[activeIndex];
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const firstElement = menuRefs.current[0];
      if (firstElement) {
        const { offsetLeft, offsetWidth } = firstElement;
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        });
      }
    });
  }, []);

  if (!mounted) return null;

  const menus = [
    { name: "Accueil", href: "/#" },
    { name: "Services", href: "/#" },
    { name: "Professionnels", href: "/#" },
    { name: "Pharmacies", href: "/#" },
    { name: "Blog", href: "/#" },
  ];

  return (
    <header className="container mx-auto py-4 relative space-x-5">
      <nav className="flex items-center justify-between w-full">
        <div className="flex items-end gap-2 z-20">
          <Image
            src="/my.png"
            alt="photo"
            className="w-8 h-8"
            width={32}
            height={32}
          />
          <span className="text-2xl font-semibold">Check-in</span>
        </div>

        <button
          className="lg:hidden z-20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600 dark:text-white" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600 dark:text-white" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white dark:bg-gray-900 z-10 lg:hidden transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full justify-center items-center">
            {menus.map((menu, index) => (
              <a
                key={menu.name}
                href={menu.href}
                className="text-gray-600 dark:text-white hover:text-[#00B6F1] py-4 text-xl"
                onClick={() => {
                  setIsMenuOpen(false);
                  setActiveIndex(index);
                }}
              >
                {menu.name}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-8">
              <CircleUser className="h-6 w-6 text-gray-600 dark:text-white" />
              <button
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                  setIsMenuOpen(false);
                }}
                className="p-2 rounded-full focus:outline-none"
              >
                {theme === "light" ? (
                  <Sun className="h-6 w-6 text-gray-600" />
                ) : (
                  <Moon className="h-6 w-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden ml-10 lg:flex items-center justify-end w-full lg:w-2/4">
          <div className="relative">
            {/* Hover Highlight */}
            <div
              className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
              style={{
                ...hoverStyle,
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {/* Active Indicator */}
            <div
              className="absolute bottom-[-6px] h-[2px] bg-[#00afef] transition-all duration-300 ease-out"
              style={activeStyle}
            />

            {/* Menu Items */}
            <div className="relative flex space-x-[6px] items-center justify-end">
              {menus.map((menu, index) => (
                <div
                  key={index}
                  ref={(el) => (menuRefs.current[index] = el)}
                  className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                    index === activeIndex
                      ? "text-[#00afef]"
                      : "text-[#0e0f1199] dark:text-[#ffffff99]"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveIndex(index)}
                >
                  <a
                    href={menu.href}
                    className="text-base font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 whitespace-nowrap flex items-center justify-center h-full"
                  >
                    {menu.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop User and Theme Toggle */}
        <div className="hidden lg:flex items-center justify-end w-full lg:w-1/4">
          <div className="flex items-center gap-4">
            <CircleUser className="h-5 w-5 text-gray-600 dark:text-white" />
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full focus:outline-none"
            >
              {theme === "light" ? (
                <Sun className="h-5 w-5 text-gray-600" />
              ) : (
                <Moon className="h-5 w-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
