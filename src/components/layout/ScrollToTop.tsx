import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!isVisible) return null;

    return (
        <Button
            onClick={scrollToTop}
            size="icon"
            className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 rounded-full shadow-lg"
            aria-label="Scroll to top"
        >
            <ArrowUp className="w-5 h-5" />
        </Button>
    );
}

export default ScrollToTop;
