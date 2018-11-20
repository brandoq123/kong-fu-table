export class KongFuDropdownItem {
    public itemId: string;
    public itemName; string;
    public isChecked: boolean;

    constructor(itemId?: string, itemName?: string, isChecked?: boolean) {
        this.itemId = itemId || '';
        this.itemName = itemName || '';
        this.isChecked = isChecked || false;
    }
}