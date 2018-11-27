import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { KongFuColumn } from '../kong-fu-table-models/KongFuColumn';
import { KongFuFilter } from '../kong-fu-table-models/KongFuFilter';
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
    @Output() filteringStart: EventEmitter<boolean>;
    private columnsToFilter: KongFuColumn[];
    private showFilterDropdown: boolean;
    private txtFilterText: string;
    private txtStartDate: string;
    private txtEndDate: string;
    private activeFilters: KongFuFilter[];

    constructor() {
        this.filterData = new EventEmitter<KongFuFilter[]>();
        this.filteringStart = new EventEmitter<boolean>();
        this.activeFilters = [];
    }

    ngOnInit(): void {
        this.showFilterDropdown = false;
    }

    filterDropdownClicked(): void {
        this.showFilterDropdown = !this.showFilterDropdown;
    }

    dropdownClosed(isDropdownClosed): void {
        this.showFilterDropdown = !isDropdownClosed;
    }

    applyFilterClicked(): void {
        this.filteringStart.emit(true);
        let filters: KongFuFilter[] = [];
        this.columnsToFilter = [];
        this.txtFilterText = this.txtFilterText.trim();
        this.txtStartDate = this.txtStartDate.trim();
        this.txtEndDate = this.txtEndDate.trim();
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].isChecked && this.columns[i].name !== KongFuConstants.SELECT_ALL_NAME) {
                this.columnsToFilter.push(this.columns[i]);
            }
        }
        if ((this.txtFilterText != null && this.txtFilterText !== '') || this.activeFilters.length > 0) {
            let textFilter = new KongFuFilter(
                this.columnsToFilter,
                this.txtFilterText,
                KongFuConstants.OP_EQ
            );
            filters.push(textFilter);
        }

        this.activeFilters = filters;
        this.filterData.emit(filters);
    }
}
