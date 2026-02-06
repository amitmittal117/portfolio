import { useState } from 'react';
import { scrollToSection } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { AvatarCircles } from '@/components/ui/avatar-circles';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { label: 'Skills', href: 'skills' },
    { label: 'Experience', href: 'experience' },
    { label: 'Certifications', href: 'certificates' },
    { label: 'Blog', href: 'blog' },
    { label: 'FAQ', href: 'faq' },
    { label: 'Contact', href: 'contact' },
];

import { profile } from '@/data';

// ... (existing imports)

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (href: string) => {
        scrollToSection(href);
        setIsMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
            <nav className="container flex items-center justify-between h-14">
                <AvatarCircles
                    numPeople={0}
                    avatarUrls={[{
                        imageUrl: profile.profileImage,
                        profileUrl: "#hero"
                    }]}
                    className="cursor-pointer"
                />

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Button
                            key={link.href}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleNavClick(link.href)}
                        >
                            {link.label}
                        </Button>
                    ))}
                    <AnimatedThemeToggler />
                </div>

                {/* Mobile Navigation Toggle */}
                <div className="flex md:hidden items-center gap-2">
                    <AnimatedThemeToggler />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur-sm">
                    <div className="container py-4 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Button
                                key={link.href}
                                variant="ghost"
                                className="justify-start w-full"
                                onClick={() => handleNavClick(link.href)}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
