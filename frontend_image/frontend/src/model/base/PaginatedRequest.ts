export abstract class PaginatedRequest {
    readonly page: number;
    readonly pageSize: number;

    constructor(page: number, pageSize: number) {
        this.page = page;
        this.pageSize = pageSize;
    }
}