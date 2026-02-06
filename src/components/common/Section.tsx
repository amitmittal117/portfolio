import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    id: string;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
    return (
        <section id={id} className={cn("section border-t", className)}>
            <div className="container">
                {title && (
                    <h2 className="section-title text-center sm:text-left">{title}</h2>
                )}
                {children}
            </div>
        </section>
    );
}

export default Section;
