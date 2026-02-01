import { ExternalLink } from 'lucide-react';
import { certificates } from '../../data';
import { Badge } from '@/components/ui/badge';
import { Marquee } from '@/components/ui/marquee';
import { cn } from '@/lib/utils';

export function Certificates() {
    const midpoint = Math.ceil(certificates.length / 2);
    const firstRow = certificates.slice(0, midpoint);
    const secondRow = certificates.slice(midpoint);

    const CertificateCard = ({
        title,
        company,
        date,
        image,
        publicUrl
    }: typeof certificates[0]) => {
        // Generate a deterministic random color based on the title
        const colors = [
            "text-blue-500 border-blue-500/20 bg-blue-500/10",
            "text-purple-500 border-purple-500/20 bg-purple-500/10",
            "text-green-500 border-green-500/20 bg-green-500/10",
            "text-orange-500 border-orange-500/20 bg-orange-500/10",
            "text-pink-500 border-pink-500/20 bg-pink-500/10",
            "text-cyan-500 border-cyan-500/20 bg-cyan-500/10",
        ];
        const colorIndex = title.length % colors.length;
        const colorClass = colors[colorIndex];
        const borderColorClass = colorClass.split(' ')[1]; // Extract border class for hover

        return (
            <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "relative w-72 cursor-pointer overflow-hidden rounded-xl border p-4 transition-all duration-300",
                    "border-gray-950/[.1] bg-gray-950/[.01]",
                    "dark:border-white/10 dark:bg-zinc-900/50",
                    "hover:scale-105 hover:shadow-xl",
                    `hover:${borderColorClass.replace('/20', '/50')}`, // Dynamically highlight border
                    "group flex flex-col justify-between mx-2"
                )}
            >
                <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                    "bg-gradient-to-br from-transparent via-transparent to-white/5 dark:to-white/5"
                )} />

                <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-start gap-3">
                            {image && (
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-10 h-10 object-contain rounded-md shrink-0 bg-white/10 p-1 border border-white/10"
                                />
                            )}
                            <h3 className="font-bold text-sm leading-tight text-foreground line-clamp-2 group-hover:text-blue-400 transition-colors">
                                {title}
                            </h3>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1 font-medium">
                        {company}
                    </p>
                </div>

                <Badge variant="secondary" className={`text-[10px] w-fit border ${colorClass}`}>
                    {date}
                </Badge>
            </a>
        );
    };

    return (
        <section id="certificates" className="section border-t overflow-hidden">
            <div className="container relative w-full">
                <h2 className="section-title mb-8">Certifications</h2>

                <div className="relative flex flex-col items-center justify-center overflow-hidden">
                    <Marquee pauseOnHover className="[--duration:150s]">
                        {firstRow.map((cert) => (
                            <CertificateCard key={cert.title} {...cert} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:150s] mt-4">
                        {secondRow.map((cert) => (
                            <CertificateCard key={cert.title} {...cert} />
                        ))}
                    </Marquee>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background dark:from-background"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background dark:from-background"></div>
                </div>
            </div>
        </section>
    );
}

export default Certificates;
