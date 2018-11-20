import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output, HostListener } from '@angular/core';
import { KongFuColumn } from '../kong-fu-table-models/KongFuColumn';
import { KongFuRow } from '../kong-fu-table-models/KongFuRow';
import { KongFuOptions } from '../kong-fu-table-models/KongFuOptions';
import * as moment from 'moment';

@Component({
    selector: 'kong-fu-table-paging',
    templateUrl: './kong-fu-table-paging.component.html',
    styleUrls: ['./kong-fu-table-paging.component.css']
})
export class KongFuTablePagingComponent implements OnChanges {

    @Input() public numberOfItems: number;
    @Input() public resultsPerPage: number;
    @Input() public currentPage: number;
    @Input() public numPageButtons: number;
    @Output() public changePage: EventEmitter<number>;
    numberOfPages: number;
    pages: number[];
    
    constructor() {
        this.changePage = new EventEmitter<number>(true);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.numberOfPages = Math.ceil(this.numberOfItems / this.resultsPerPage);
        if (this.numberOfPages > 0) {
            if (this.numberOfPages > this.numPageButtons) {
                this.pages = Array(this.numPageButtons);
            }
            else {
                this.pages = Array(this.numberOfPages);
            }
            let numSidePageButtons = this.numPageButtons - Math.round(this.numPageButtons / 2);
            let lowerLimit = (this.currentPage - numSidePageButtons);
            let upperLimit = (this.currentPage + numSidePageButtons);

            if (lowerLimit < 1) {
                lowerLimit = 1;
                upperLimit = this.numPageButtons;
            }
            else if (upperLimit > this.numberOfPages) {
                upperLimit = this.numberOfPages;
                lowerLimit = this.numberOfPages - this.numPageButtons + 1;
                if (lowerLimit < 1) {
                    lowerLimit = 1;
                }
            }

            for (let i = 0; i < this.pages.length; i++) {
                this.pages[i] = lowerLimit + i;
            }
        }
    }

    goToPage(page: number): void {
        this.changePage.emit(page);
    }

    goToNextPage(): void {
        let nextPage = this.currentPage + 1;
        this.changePage.emit(nextPage);
    }

    goToPrevPage(): void {
        let prevPage = this.currentPage - 1;
        this.changePage.emit(prevPage);
    }
}
