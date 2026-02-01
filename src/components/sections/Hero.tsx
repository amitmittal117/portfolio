import { Github, Linkedin, Mail, FileText, MapPin, SquareTerminal, Twitter, ExternalLink, Instagram, type LucideIcon } from 'lucide-react';
import { profile } from '../../data';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Highlighter } from '@/components/ui/highlighter';
import { BlurFade } from '@/components/ui/blur-fade';
import { Dock, DockIcon } from '@/components/ui/dock';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

// Icon mapping for social links - add new icons here as needed
const iconMap: Record<string, LucideIcon> = {
    github: Github,
    linkedin: Linkedin,
    leetcode: SquareTerminal,
    twitter: Twitter,
    email: Mail,
    default: ExternalLink,
    instagram: Instagram,
};

export function Hero() {
    return (
        <section id="hero" className="section min-h-screen flex items-center pt-14 relative overflow-hidden">
            {/* Animated Grid Background */}
            <AnimatedGridPattern
                numSquares={30}
                maxOpacity={0.15}
                duration={3}
                repeatDelay={1}
                className={cn(
                    "absolute inset-0",
                    "mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
                )}
            />

            <div className="container relative z-10">
                <div className="max-w-3xl">
                    <BlurFade delay={0.1}>
                        <div className="relative mb-8 inline-block">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                            <img
                                src={profile.profileImage}
                                alt={profile.name}
                                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-2xl ring-2 ring-blue-500/20"
                            />
                        </div>
                    </BlurFade>

                    <BlurFade delay={0.2}>
                        <TypingAnimation
                            className="text-5xl md:text-6xl font-bold tracking-tight mb-3 block cursor-default w-fit mx-0 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent box-decoration-clone"
                        >
                            {profile.name}
                        </TypingAnimation>
                    </BlurFade>

                    <BlurFade delay={0.3}>
                        <p className="text-2xl font-semibold text-foreground mb-3">
                            <Highlighter action="highlight" color="hsl(var(--muted-foreground))">
                                {profile.title}
                            </Highlighter>
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.4}>
                        <p className="flex items-center gap-1.5 text-base text-primary mb-4 font-medium">
                            <MapPin className="w-4 h-4" />
                            {profile.location}
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.5}>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                            {profile.tagline}
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.6}>
                        <TooltipProvider>
                            <Dock
                                direction="middle"
                                iconSize={50}
                                iconDistance={100}
                                className="bg-background/80 border shadow-lg mx-0"
                            >
                                {/* Resume Download */}
                                <DockIcon>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <a
                                                href={profile.resumeUrl}
                                                download
                                                className={cn(
                                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                                    "size-12 rounded-full"
                                                )}
                                            >
                                                <FileText className="size-6" />
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Resume</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </DockIcon>

                                <Separator orientation="vertical" className="h-full" />

                                {/* Dynamic Social Links */}
                                {profile.social.map((social) => {
                                    const IconComponent = iconMap[social.icon.toLowerCase()] || iconMap.default;
                                    return (
                                        <DockIcon key={social.name}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <a
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={cn(
                                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                                            "size-12 rounded-full"
                                                        )}
                                                    >
                                                        <IconComponent className="size-6" />
                                                    </a>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{social.name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </DockIcon>
                                    );
                                })}

                                {/* Email */}
                                <DockIcon>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <a
                                                href={`mailto:${profile.email}`}
                                                className={cn(
                                                    buttonVariants({ variant: "ghost", size: "icon" }),
                                                    "size-12 rounded-full"
                                                )}
                                            >
                                                <Mail className="size-6" />
                                            </a>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Email</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </DockIcon>
                            </Dock>
                        </TooltipProvider>
                    </BlurFade>
                </div>
            </div>
            <ProgressiveBlur />
        </section>
    );
}

export default Hero;
