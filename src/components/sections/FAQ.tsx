import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import faqData from '../../data/faq.json';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faq: FAQItem[] = faqData.faq;

export function FAQ() {
    return (
        <section id="faq" className="section border-t">
            <div className="container">
                <h2 className="section-title text-center sm:text-left">FAQ</h2>

                <Accordion type="single" collapsible defaultValue="backend">
                    {faq.map((item, index) => {
                        const colors = [
                            "border-blue-500/20 data-[state=open]:border-blue-500/50 hover:border-blue-500/30",
                            "border-purple-500/20 data-[state=open]:border-purple-500/50 hover:border-purple-500/30",
                            "border-green-500/20 data-[state=open]:border-green-500/50 hover:border-green-500/30",
                            "border-orange-500/20 data-[state=open]:border-orange-500/50 hover:border-orange-500/30",
                            "border-pink-500/20 data-[state=open]:border-pink-500/50 hover:border-pink-500/30",
                            "border-cyan-500/20 data-[state=open]:border-cyan-500/50 hover:border-cyan-500/30",
                        ];
                        const colorClass = colors[index % colors.length];

                        return (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className={`border rounded-lg px-4 mb-4 transition-all duration-300 ${colorClass} data-[state=open]:bg-muted/30`}
                            >
                                <AccordionTrigger className="text-left text-base hover:no-underline py-4 font-medium transition-colors">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </div>
        </section>
    );
}

export default FAQ;
