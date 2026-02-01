import { scrollToSection } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { AvatarCircles } from '@/components/ui/avatar-circles';

const navLinks = [
    { label: 'Skills', href: 'skills' },
    { label: 'Experience', href: 'experience' },
    { label: 'Certifications', href: 'certificates' },
    { label: 'Blog', href: 'blog' },
    { label: 'FAQ', href: 'faq' },
    { label: 'Contact', href: 'contact' },
];

export function Header() {
    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
            <nav className="container flex items-center justify-between h-14">
                <AvatarCircles
                    numPeople={0}
                    avatarUrls={[{
                        imageUrl: "https://ui-avatars.com/api/?name=AM&background=333&color=fff&rounded=true&bold=true",
                        profileUrl: "#hero"
                    }]}
                    className="cursor-pointer"
                />

                <div className="flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Button
                            key={link.href}
                            variant="ghost"
                            size="sm"
                            onClick={() => scrollToSection(link.href)}
                        >
                            {link.label}
                        </Button>
                    ))}
                    <AnimatedThemeToggler />
                </div>
            </nav>
        </header>
    );
}

export default Header;
