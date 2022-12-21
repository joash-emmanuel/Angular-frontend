export class DataTableResponse<T> {

    constructor() {

    }

    content: T[] = [];
    numberofElements: number = 0;
    totalElements: number = 0;
    totalPages: string = "";

}