import { Github, Linkedin, Mail, FileText, SquareTerminal, Twitter, ExternalLink, Instagram, type LucideIcon } from 'lucide-react';
import { profile } from '../../data';
import { Dock, DockIcon } from '@/components/ui/dock';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

// Icon mapping for social links
const iconMap: Record<string, LucideIcon> = {
    github: Github,
    linkedin: Linkedin,
    leetcode: SquareTerminal,
    twitter: Twitter,
    email: Mail,
    default: ExternalLink,
    instagram: Instagram,
};

export function MobileDock() {
    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center sm:hidden">
            <TooltipProvider>
                <Dock
                    direction="middle"
                    iconSize={44}
                    iconDistance={80}
                    className="bg-background/95 backdrop-blur-md border shadow-xl"
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
                                        "size-10 rounded-full"
                                    )}
                                >
                                    <FileText className="size-5" />
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
                                                "size-10 rounded-full"
                                            )}
                                        >
                                            <IconComponent className="size-5" />
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
                                        "size-10 rounded-full"
                                    )}
                                >
                                    <Mail className="size-5" />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Email</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                </Dock>
            </TooltipProvider>
        </div>
    );
}

export default MobileDock;
