export class KongFuColumn {
    /**
     * Column key/id name
     */
    public name: string;

    /**
     * Text for the column header
     */
    public title: string;

    /**
     * Value for column (used for rows)
     */
    // public value: any;

    /**
     * Breakpoints to show on mobile (Use bootstrap xs, sm, md, etc...)
     */
    public breakpoints: string;

    /**
     * Value to decide if this column should be sortable
     */
    public sortable: boolean;

    /**
     * Value to decide if this column should be filterable
     */
    public filterable: boolean;

    /**
     * Column data type (date, number, string (default))
     */
    public type: string;

    /**
     * Format for the string. Only used for dates
     */
    public formatString: string;

    /**
     * Determines if the date range filter will use this column
     */
    public useDateRangeFilter: boolean;

    public width: number;
    public left: number;
    public minWidthDiff: number;
    
    public ascending: boolean;
    public isSorted: boolean;
    public isChecked: boolean;

    private _position: number;

    /**
     * Determines if column is the first non-breakable column
     */
    private _isFirst: boolean;
    /**
     * Determins if column is the last non-breakable column
     */
    private _isLast: boolean;

    get position(): number {
        return this._position;
    }

    set position(newPosition: number) {
        this._position = newPosition;
    }

    get isFirst(): boolean {
        return this._isFirst;
    }

    set isFirst(isFirst: boolean) {
        this._isFirst = isFirst;
    }

    constructor(name?: string, title?: string, /*value?: any,*/ sortable?: boolean, filterable?: boolean, breakpoints?: string, type?: string, formatString?: string,
                useDateRangeFilter?: boolean) {
        this.name = name || '';
        this.title = title || '';
        // if (value === 0) {
        //     this.value = value;
        // } else {
        //     this.value = value || null;
        // }
        this.sortable = sortable || false;
        this.filterable = filterable || false;
        this.breakpoints = breakpoints || '';
        this.type = type || 'string';
        this.formatString = formatString || null;
        this.ascending = true;
        this.isSorted = false;
        this.isChecked = true;
        this.useDateRangeFilter = useDateRangeFilter || true;
        this.width = 0;
        this.left = 0;
    }
}