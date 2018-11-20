export class KongFuFiltering {
    public enabled: boolean;
    public placeholder: string;
    public delay: number;
    public min: number;
    public ignoreCase: boolean;
    public useDateRangeFilter: boolean;
    public useLiveFiltering: boolean;

    constructor(enabled?: boolean, placeholder?: string, delay?: number, min?: number, ignoreCase?: boolean, useDateRangeFilter?: boolean,
                useLiveFiltering?: boolean) {
        this.enabled = enabled || false;
        this.placeholder = placeholder || 'Search';
        this.delay = delay || 0;
        this.min = min || 1;
        this.ignoreCase = ignoreCase || true;
        this.useDateRangeFilter = useDateRangeFilter || false;
        this.useLiveFiltering = useLiveFiltering || true;
    }
}