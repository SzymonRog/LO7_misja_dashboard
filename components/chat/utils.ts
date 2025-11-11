export const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC", // <-- tu
    });
};

export const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();

    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "TODAY";
    if (diffDays <= 7) {
        // Ustalony format: np. 'MONDAY'
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            timeZone: "UTC",
        }).toUpperCase();
    }

    // Format dzień.miesiąc.rok
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // miesiące liczone od 0
    const year = date.getUTCFullYear();

    return `${day}.${month}.${year}`;
};

