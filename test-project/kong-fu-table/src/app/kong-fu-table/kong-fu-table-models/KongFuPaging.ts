export class KongFuPaging {
    public enabled: boolean;
    public items: number;
    public pageButtons: number;
    public showPageNumber: boolean;

    constructor(enabled?: boolean, items?: number, pageButtons?: number, showPageNumber?: boolean) {
        this.enabled = enabled || false;
        this.items = items || 10;
        this.pageButtons = pageButtons || 5;
        this.showPageNumber = showPageNumber || true;
    }
}