export function isValidUrl(input: string): boolean {
    try {
        const u = new URL(input);
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

export function isValidAlias(alias: string): boolean {
    return /^[a-zA-Z0-9_-]+$/.test(alias);
}