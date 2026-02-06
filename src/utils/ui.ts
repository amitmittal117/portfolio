// Utility functions for UI

export function getBadgeColor(index: number): string {
    const colors = [
        "bg-purple-500/10 text-purple-500",
        "bg-green-500/10 text-green-500",
        "bg-orange-500/10 text-orange-500",
        "bg-cyan-500/10 text-cyan-500",
    ];
    return colors[index % colors.length];
}
