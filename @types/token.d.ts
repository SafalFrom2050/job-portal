export interface Token {
    access: string | null,
    refresh: string | null
}

export interface TokenContextType {
    token: Token,
    setToken: (token: Token) => void,
}