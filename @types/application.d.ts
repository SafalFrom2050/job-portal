export interface Application {
    id?: string,
    email?: string,
    phone?: string,
    cv?: string,
    cover_letter?: string,
    created_at?: string,
    reviewed?: boolean,
    reviewed_at?: string,
    user?: string,
    post?: string,
}

export interface ApplicationListResponse {
    count?: number,
    next?: string,
    previous?: string,
    results?: Application[]
}