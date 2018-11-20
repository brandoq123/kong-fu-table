import { KongFuColumn } from '../kong-fu-table-models/KongFuColumn';
export class KongFuFilter {
    public columns: KongFuColumn[];
    public filterValue: any;
    public operator: string;

    constructor(columns?: KongFuColumn[], filterValue?: any, operator?: string) {
        this.columns = columns || [];
        this.filterValue = filterValue || '';
        this.operator = operator || '=';
    }
}