import { KongFuColumn } from '../kong-fu-table-models/KongFuColumn';

export class KongFuRow {
    /**
     * Array of column data
     */
    public columns: KongFuColumn[];
    public values: any[];
    public isExpanded: boolean;
    constructor(values?: any[], columns?: KongFuColumn[], isExpanded?: boolean) {
        this.columns = columns || [];
        this.values = values || [];
        this.isExpanded = isExpanded || false;
    }
}