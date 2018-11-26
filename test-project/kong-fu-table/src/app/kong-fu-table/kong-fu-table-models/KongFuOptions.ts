import { KongFuPaging } from '../kong-fu-table-models/KongFuPaging';
import { KongFuSorting } from '../kong-fu-table-models/KongFuSorting';
import { KongFuFiltering} from '../kong-fu-table-models/KongFuFiltering';

export class KongFuOptions {

    /**
     * Custom styles for the table
     */
    public styles: string;
    public paging: KongFuPaging;
    public sorting: KongFuSorting;
    public filtering: KongFuFiltering;
    public showResultCount: boolean;
    public title: string;

    constructor(styles?: string, paging?: KongFuPaging, showResultCount?: boolean, sorting?: KongFuSorting, filtering?: KongFuFiltering,
                title?: string) {
        this.styles = styles || '';
        this.paging = paging || new KongFuPaging();
        this.showResultCount = showResultCount || true;
        this.sorting = sorting || new KongFuSorting();
        this.filtering = filtering || new KongFuFiltering();
        this.title = title || '';
    }
}