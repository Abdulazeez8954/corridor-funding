export function generateAppNumber() {
    const year = new Date().getFullYear();
    const random = Math.floor(10000000 + Math.random() * 90000000);
    return `CF-${year}-${random}`;
}