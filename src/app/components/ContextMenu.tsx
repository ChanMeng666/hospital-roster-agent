"use client";

import React, { useEffect, useRef } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
  items: Array<{
    label: string;
    action: string;
    icon?: React.ReactNode;
    divider?: boolean;
  }>;
}

export default function ContextMenu({ x, y, onClose, onAction, items }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
      style={{ left: x, top: y }}
    >
      {items.map((item, index) => (
        item.divider ? (
          <div key={index} className="border-t border-gray-200 my-1" />
        ) : (
          <button
            key={index}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => {
              onAction(item.action);
              onClose();
            }}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </button>
        )
      ))}
    </div>
  );
}