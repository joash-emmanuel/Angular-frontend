export class DataTablePagination{
    
    constructor(start:number,limit:number,pageNo:number){
        this.start=start;
        this.limit=limit;
        this.pageNo=pageNo;
    }
    
    start:number=0;
    limit:number=10;
    pageNo:number=1;
}