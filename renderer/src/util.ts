export const createKey = () => (Math.random() + 1).toString(36).substring(2)

export const ordinal = (n: number): string => {
    const s = ['th', 'st', 'nd', 'rd'],
        v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
}