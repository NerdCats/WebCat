export interface Pagination {
    Total: number,
    Page: number,
    Start: number,
    PageSize: number,
    TotalPages: number,
    Returned: number
}

export class PageEnvelope<T>  {
    pagination: Pagination;
    data: Array<T>
}