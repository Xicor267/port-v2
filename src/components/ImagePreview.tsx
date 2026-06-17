/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  RotateCw, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight,
  Maximize,
  Move
} from "lucide-react";
import { useLanguage } from "../LanguageContext";

interface ImagePreviewProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export default function ImagePreview({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose,
  onIndexChange 
}: ImagePreviewProps) {
  const { t } = useLanguage();
  
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setScale(prev => Math.min(10, prev + 0.25));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(0.1, prev - 0.25));
  };

  const handleRotateLeft = () => {
    setRotate(prev => prev - 90);
  };

  const handleRotateRight = () => {
    setRotate(prev => prev + 90);
  };

  const handleFlipHorizontal = () => {
    setFlipH(prev => !prev);
  };

  const handleFlipVertical = () => {
    setFlipV(prev => !prev);
  };

  const handleReset = () => {
    setScale(1);
    setRotate(0);
    setFlipH(false);
    setFlipV(false);
    setOffset({ x: 0, y: 0 });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIndexChange && images && images.length > 0) {
      const nextIdx = (currentIndex - 1 + images.length) % images.length;
      onIndexChange(nextIdx);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onIndexChange && images && images.length > 0) {
      const nextIdx = (currentIndex + 1) % images.length;
      onIndexChange(nextIdx);
    }
  };

  // Dragging mechanisms
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset transform state when image or open status changes
  useEffect(() => {
    handleReset();
  }, [currentIndex, isOpen]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && images && images.length > 1) {
        if (onIndexChange) {
          const nextIdx = (currentIndex - 1 + images.length) % images.length;
          onIndexChange(nextIdx);
        }
      }
      if (e.key === "ArrowRight" && images && images.length > 1) {
        if (onIndexChange) {
          const nextIdx = (currentIndex + 1) % images.length;
          onIndexChange(nextIdx);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images, onClose, onIndexChange]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex flex-col items-center justify-center select-none overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-xs cursor-default"
          />

          {/* Top Control Bar (Paging Info & Close Button) */}
          <div className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 z-10 text-white select-none">
            <div className="text-sm font-mono text-gray-300 font-bold bg-black/40 px-3 py-1.5 rounded-full">
              {images.length > 1 ? `${currentIndex + 1} / ${images.length}` : "1 / 1"}
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-900/60 border border-zinc-700/50 hover:bg-zinc-800 text-gray-300 hover:text-white transition-all cursor-pointer shadow-lg hover:scale-105"
              aria-label="Close Preview"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main Canvas Area */}
          <div className="relative flex-1 w-full h-full flex items-center justify-center p-4">
            
            {/* Left Arrow */}
            {images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-6 p-3 rounded-full bg-zinc-900/60 border border-zinc-700/50 text-gray-400 hover:text-white hover:bg-zinc-800 select-none z-10 hover:scale-105 transition-all cursor-pointer active:scale-95 shadow-md"
                title={t("portfolio.page.preview.prev")}
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Rendered Image under Transform operations */}
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                style={{
                  x: offset.x,
                  y: offset.y,
                  scale: scale,
                  rotate: rotate,
                  scaleX: flipH ? -1 : 1,
                  scaleY: flipV ? -1 : 1,
                }}
                onMouseDown={handleMouseDown}
                className={`max-w-full max-h-full aspect-auto flex justify-center items-center ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              >
                <img 
                  src={currentImage} 
                  alt="Fullscreen Preview" 
                  referrerPolicy="no-referrer"
                  className="max-w-[90vw] max-h-[75vh] md:max-h-[80vh] object-contain select-none pointer-events-none roundedshadow-2xl border border-zinc-800/80"
                />
              </motion.div>
            </div>

            {/* Right Arrow */}
            {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-6 p-3 rounded-full bg-zinc-900/60 border border-zinc-700/50 text-gray-400 hover:text-white hover:bg-zinc-800 select-none z-10 hover:scale-105 transition-all cursor-pointer active:scale-95 shadow-md"
                title={t("portfolio.page.preview.next")}
              >
                <ChevronRight size={20} />
              </button>
            )}

          </div>

          {/* Ant-Design inspired Semi-transparent Floating Bottom Controller Toolbar */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="absolute bottom-6 bg-zinc-900/85 backdrop-blur-md border border-zinc-700/50 text-gray-300 font-sans shadow-2xl flex items-center justify-center gap-1.5 sm:gap-3 rounded-full py-2.5 px-6 shrink-0 z-10 select-none mb-4"
          >
            {/* Zoom Out Button */}
            <button 
              onClick={handleZoomOut} 
              className="p-1.5 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors cursor-pointer"
              title={t("portfolio.page.preview.zoom_out")}
            >
              <ZoomOut size={16} />
            </button>

            {/* Zoom In Button */}
            <button 
              onClick={handleZoomIn} 
              className="p-1.5 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors cursor-pointer"
              title={t("portfolio.page.preview.zoom_in")}
            >
              <ZoomIn size={16} />
            </button>

            {/* Horizontal Split Line Divider */}
            <div className="w-[1px] h-4 bg-zinc-700/60 mx-1" />

            {/* Rotate Left Button */}
            <button 
              onClick={handleRotateLeft} 
              className="p-1.5 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors cursor-pointer"
              title={t("portfolio.page.preview.rotate_left")}
            >
              <RotateCcw size={16} />
            </button>

            {/* Rotate Right Button */}
            <button 
              onClick={handleRotateRight} 
              className="p-1.5 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors cursor-pointer"
              title={t("portfolio.page.preview.rotate_right")}
            >
              <RotateCw size={16} />
            </button>

            {/* Split line */}
            <div className="w-[1px] h-4 bg-zinc-700/60 mx-1" />

            {/* Flip Horizontal Button */}
            <button 
              onClick={handleFlipHorizontal} 
              className="p-1.5 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title={t("portfolio.page.preview.flip_h")}
            >
              {/* Mirror SVG or custom icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 rotate-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16m-4-6l4 6-4 6M8 6L4 12l4 12" />
              </svg>
            </button>

            {/* Flip Vertical Button */}
            <button 
              onClick={handleFlipVertical} 
              className="p-1.5 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center"
              title={t("portfolio.page.preview.flip_v")}
            >
              {/* Mirror portrait SVG */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16M4 12h16m-4-6l4 6-4 6M8 6L4 12l4 12" />
              </svg>
            </button>

            {/* Split line */}
            <div className="w-[1px] h-4 bg-zinc-700/60 mx-1" />

            {/* Reset Button */}
            <button 
              onClick={handleReset} 
              className="p-1.5 hover:bg-zinc-800 hover:text-white rounded-lg transition-colors cursor-pointer"
              title={t("portfolio.page.preview.reset")}
            >
              <RefreshCw size={14} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
