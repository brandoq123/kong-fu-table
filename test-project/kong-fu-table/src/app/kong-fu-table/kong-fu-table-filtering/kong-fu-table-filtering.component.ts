﻿import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { KongFuColumn } from '../kong-fu-table-models/KongFuColumn';
import { KongFuFilter } from '../kong-fu-table-models/KongFuFilter';
import { KongFuDropdownItem } from '../kong-fu-table-models/KongFuDropdownItem';
import { KongFuFiltering } from '../kong-fu-table-models/KongFuFiltering';
import { KongFuConstants } from '../kong-fu-table-models/KongFuConstants';
import * as moment from 'moment';

@Component({
    selector: 'kong-fu-table-filtering',
    templateUrl: './kong-fu-table-filtering.component.html',
    styleUrls: ['./kong-fu-table-filtering.component.css']
})
export class KongFuTableFilteringComponent implements OnInit {
    @Input() options: KongFuFiltering;
    @Input() columns: KongFuColumn[];
    @Output() filterData: EventEmitter<KongFuFilter[]>;
    private columnsToFilter: KongFuColumn[];
    private showFilterDropdown: boolean;
    private filterText: string;

    ngOnInit(): void {
        this.showFilterDropdown = false;
    }


    filterDropdownClicked(): void {
        this.showFilterDropdown = !this.showFilterDropdown;
    }

    dropdownClosed(isDropdownClosed): void {
        this.showFilterDropdown = !isDropdownClosed;
    }

    getColumnsToFilter(): void {
        let filters: KongFuFilter[] = [];
        this.columnsToFilter = [];
        this.filterText = this.filterText.trim();
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].isChecked) {
                this.columnsToFilter.push(this.columns[i]);
            }
        }
        if (this.filterText != null && this.filterText !== '') {
            let textFilter = new KongFuFilter(
                this.columnsToFilter,
                this.filterText,
                KongFuConstants.OP_EQ
            );
            filters.push(textFilter);
        }
        this.filterData.emit(filters);
    }
}