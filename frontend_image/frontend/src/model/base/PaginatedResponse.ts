export abstract class PaginatedResponse<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;

    constructor(content: T[], empty: boolean, first: boolean, last: boolean, number: number, numberOfElements: number, size: number, totalElements: number, totalPages: number) {
        this.content = content;
        this.empty = empty;
        this.first = first;
        this.last = last;
        this.number = number;
        this.numberOfElements = numberOfElements;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }
}