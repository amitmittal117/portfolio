import { useState, useEffect, useCallback } from 'react';

interface RotatingTitleProps {
    titles: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    className?: string;
}

export function RotatingTitle({
    titles,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseDuration = 2000,
    className = '',
}: RotatingTitleProps) {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const currentTitle = titles[currentTitleIndex];

    const handleTyping = useCallback(() => {
        if (isPaused) {
            return;
        }

        if (!isDeleting) {
            // Typing
            if (displayedText.length < currentTitle.length) {
                setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
            } else {
                // Finished typing, pause before deleting
                setIsPaused(true);
                setTimeout(() => {
                    setIsPaused(false);
                    setIsDeleting(true);
                }, pauseDuration);
            }
        } else {
            // Deleting
            if (displayedText.length > 0) {
                setDisplayedText(displayedText.slice(0, -1));
            } else {
                // Finished deleting, move to next title
                setIsDeleting(false);
                setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
            }
        }
    }, [displayedText, isDeleting, isPaused, currentTitle, titles.length, pauseDuration]);

    useEffect(() => {
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        const timer = setTimeout(handleTyping, speed);
        return () => clearTimeout(timer);
    }, [handleTyping, isDeleting, typingSpeed, deletingSpeed]);

    return (
        <span className={className}>
            {displayedText}
            <span className="animate-pulse">|</span>
        </span>
    );
}

export default RotatingTitle;
