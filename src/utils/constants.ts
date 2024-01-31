// Domains are allowed to access the server
export const WHITELIST_DOMAINS: string[] = [
    'https://trello-fe-five.vercel.app/',
    'http://localhost:5173' // Thực tế ko cho phép local gọi vào
]

export enum BoardType {
    PUBLIC = 'public',
    PRIVATE = 'private',
}
