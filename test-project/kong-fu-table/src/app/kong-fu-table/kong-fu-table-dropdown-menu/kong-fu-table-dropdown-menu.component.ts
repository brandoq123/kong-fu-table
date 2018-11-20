import { Component, Input, OnInit, HostListener, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { KongFuColumn } from '../kong-fu-table-models/KongFuColumn';

@Component({
    selector: 'kong-fu-table-dropdown-menu',
    templateUrl: './kong-fu-table-dropdown-menu.component.html',
    styleUrls: ['./kong-fu-table-dropdown-menu.component.css']
})
export class KongFuTableDropdownMenuComponent implements OnInit, OnChanges {
    @Input() items: KongFuColumn[];
    @Input() showDropdown: boolean;
    @Output() public dropdownClosed: EventEmitter<boolean>;
    private hasOpened: boolean;

    //close the dropdown menu when a click occurs outside of the dropdown menu
    @HostListener('document:click', ['$event'])
    clickout(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            if (this.hasOpened === true) {
                this.showDropdown = false;
                this.hasOpened = false;
                this.dropdownClosed.emit(true);
            }
        }
    }

    constructor(private eRef: ElementRef) {
        this.hasOpened = false;
        this.dropdownClosed = new EventEmitter<boolean>();
    }

    ngOnInit(): void {
        let selectAll = new KongFuColumn('SelectAll', 'Select All');
        this.items.unshift(selectAll);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.showDropdown === true) {
            event.stopPropagation();
            this.hasOpened = true;
        }
    }

    itemClicked(item: KongFuColumn): void {
        event.stopPropagation();
        if (item.name !== 'SelectAll') {
            item.isChecked = !item.isChecked;
            let isAllChecked = true;
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].name !== 'SelectAll') {
                    if (!this.items[i].isChecked) {
                        isAllChecked = false;
                    }
                }
            }
            this.items[0].isChecked = isAllChecked;
        }
        else {
            let isChecked = item.isChecked;
            for (let i = 0; i < this.items.length; i++) {
                this.items[i].isChecked = !isChecked;
            }
        }
    }
}
