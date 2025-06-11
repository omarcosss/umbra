'use client'; // This component needs to be a Client Component to use hooks and DOM events

import React, { useState, useEffect, useRef } from 'react';

/**
 * A custom tooltip component that follows the mouse cursor.
 * It displays content from elements with a `data-pr-tooltip` attribute.
 * Similar in behavior to PrimeReact's global Tooltip.
 */
const Tooltip: React.FC = () => {
    // State to control tooltip visibility
    const [isVisible, setIsVisible] = useState(false);
    // State to store the tooltip content
    const [content, setContent] = useState<string>('');
    // State to store the tooltip's position (x, y coordinates)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // Ref to the tooltip DOM element for measuring its size
    const tooltipRef = useRef<HTMLDivElement>(null);
    // Ref to track the currently hovered element to prevent unnecessary updates
    const currentHoveredElement = useRef<HTMLElement | null>(null);

    /**
     * Handles the mousemove event to update the tooltip's position.
     * It also performs boundary checks to keep the tooltip within the viewport.
     * @param e The MouseEvent object.
     */
    const handleMouseMove = (e: MouseEvent) => {
        const offsetX = 15; // Horizontal offset from cursor to the right
        const offsetY = 15; // Vertical offset from cursor to the bottom

        let newX = e.clientX + offsetX;
        let newY = e.clientY + offsetY;

        // Adjust position if tooltip goes off-screen (right or bottom)
        if (tooltipRef.current) {
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // If tooltip goes off the right edge, position it to the left of the cursor
            if (newX + tooltipRect.width > viewportWidth) {
                newX = e.clientX - tooltipRect.width - offsetX;
            }
            // If tooltip goes off the bottom edge, position it above the cursor
            if (newY + tooltipRect.height > viewportHeight) {
                newY = e.clientY - tooltipRect.height - offsetY;
            }
        }
        setPosition({ x: newX, y: newY });
    };

    /**
     * Handles the mouseover event to determine if a tooltip should be shown.
     * It checks for `data-pr-tooltip` attribute on the hovered element.
     * @param e The MouseEvent object.
     */
    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const tooltipContent = target.dataset.tooltip;

        // If the hovered element hasn't changed, do nothing to prevent flickering
        if (target === currentHoveredElement.current) {
            return;
        }

        // Update the reference to the currently hovered element
        currentHoveredElement.current = target;

        if (tooltipContent) {
            // If the element has tooltip content, set it and make the tooltip visible
            setContent(tooltipContent);
            setIsVisible(true);
            // Immediately update position based on current mouse coordinates
            handleMouseMove(e);
        } else {
            // If the element does not have tooltip content, hide the tooltip if it's currently visible
            if (isVisible) {
                setIsVisible(false);
                setContent('');
            }
        }
    };

    /**
     * Handles the scroll event to hide the tooltip.
     * This prevents the tooltip from staying in an incorrect position after scrolling.
     */
    const handleScroll = () => {
        if (isVisible) {
            setIsVisible(false);
            setContent('');
        }
    };

    // Effect hook to attach and clean up global event listeners
    useEffect(() => {
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        // Cleanup function: remove event listeners when the component unmounts
        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isVisible]); // Dependency array: re-run effect if `isVisible` changes to ensure correct handler state

    // Render nothing if the tooltip is not visible or has no content
    if (!isVisible || !content) {
        return null;
    }

    // Render the tooltip component with dynamic positioning and styling
    return (
        <div
            ref={tooltipRef} // Attach ref to the tooltip div
            className="fixed z-50 px-3 py-2 text-sm font-medium text-[var(--calcario)] bg-[var(--breu)] rounded-lg border border-[var(--calcario)] pointer-events-none transition-opacity duration-150 ease-in-out"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                opacity: isVisible ? 1 : 0,
            }}
        >
            {content}
        </div>
    );
};

export default Tooltip;