import { Component, Input, OnInit, HostListener, OnChanges, ElementRef, ViewChild} from '@angular/core';
import { KongFuColumn } from '../kong-fu-table-models/KongFuColumn';
import { KongFuRow } from '../kong-fu-table-models/KongFuRow';
import { KongFuOptions } from '../kong-fu-table-models/KongFuOptions';
import { KongFuFilter } from '../kong-fu-table-models/KongFuFilter';
import { KongFuConstants } from '../kong-fu-table-models/KongFuConstants';
import * as moment from 'moment';

@Component({
    selector: 'kong-fu-table-core',
    templateUrl: './kong-fu-table-core.component.html',
    styleUrls: ['./kong-fu-table-core.component.css']
})
export class KongFuTableCoreComponent implements OnInit, OnChanges {
    @Input() columns: KongFuColumn[];
    @Input() rows: KongFuRow[];
    @Input() options: KongFuOptions;
    @Input() showSpinner: boolean;
    public originalData: KongFuRow[];
    public screenBreakpoint: string;
    public isBreakpointActive: boolean;
    public currentPage: number;
    public startIndex: number;
    public endIndex: number;
    public maxWidth: number;
    public minWidth: number;
    public totalWidth: number;

    private _widthInitialized: boolean;

    @ViewChild("kongFuTable", {read: ElementRef}) kongFuTable: ElementRef;

    @HostListener('window:resize', ['$event'])
    onResize(event?) {
        this.setScreenBreakpoint();
        this.setColumnWidth();
    }
    
    constructor() {
        this._widthInitialized = false;
    }

    ngOnInit(): void {
        this.initializeData();
    }

    ngOnChanges(): void {
        this.initializeData();
    }

    changePage(page): void {
        this.currentPage = page;
        this.startIndex = (this.currentPage - 1) * this.options.paging.items;
        this.endIndex = this.startIndex + this.options.paging.items;
        let results = this.rows || [];

        if (this.endIndex > results.length) {
            this.endIndex = results.length;
        }
    }

    private initializeData(): void {
        this.minWidth = 90;
        this.showSpinner = true;
        this.currentPage = 1;
        var populateOriginalData = false;
        if (this.originalData == null || this.originalData.length === 0) {
            this.originalData = [];
            populateOriginalData = true;
        }
        this.setScreenBreakpoint();
        this.initializeOptions();
        if (this.rows !== null && this.rows.length > 0) {
            if (populateOriginalData) {
                this.originalData = this.rows;
            }
            let firstRow = this.rows[0];
            if ((firstRow.columns === null || firstRow.columns.length === 0) &&
                (firstRow.values !== null && firstRow.values.length > 0)) {
                this.loadColumnDataIntoRows();
            }
            if (!this._widthInitialized) {
                this.setColumnWidth();
            }
        }
        this.startIndex = 0;
        this.endIndex = this.options.paging.items;
        this.showSpinner = false;
    }

    private initializeOptions(): void {
        if (this.options === null || this.options === undefined) {
            this.options = new KongFuOptions();
            this.options.showResultCount = true;
        }
    }

    private setScreenBreakpoint(): void {
        let screenWidth = window.innerWidth;
        if (screenWidth < 576) {
            this.screenBreakpoint = 'xs';
        }
        else if (screenWidth >= 576 && screenWidth < 768) {
            this.screenBreakpoint = 'sm';
        }
        else if (screenWidth >= 768 && screenWidth < 992) {
            this.screenBreakpoint = 'md';
        }
        else if (screenWidth >= 992 && screenWidth < 1200) {
            this.screenBreakpoint = 'lg';
        }
        else if (screenWidth >= 1200) {
            this.screenBreakpoint = 'xl';
        }
        this.isBreakpointActive = false;
        for (let i = 0; i < this.columns.length; i++) {
            if (this.columns[i].breakpoints.includes(this.screenBreakpoint)) {
                this.isBreakpointActive = true;
            }
        }
    }

    private setColumnWidth(): void {
        //TODO: need to figure out where the extra 17 is coming from
        this.maxWidth = this.kongFuTable.nativeElement.clientWidth - 17;
        let maxRowCheck = 20;
        let columnWidths = [];
        let average = 0;
        let count = 0;
        for (let i = 0; i < this.rows.length && i < maxRowCheck; i++) {
            let row = this.rows[i];
            for (let j = 0; j < row.columns.length; j++) {
                let column = row.columns[j];
                let length = row.values[j].toString().length;
                length = length > column.title.length ? length : column.title.length;
                average = ((average * (count)) + length) / (count + 1);
                if (columnWidths.length >= (j + 1) && columnWidths[j].name === column.name) {
                    if (columnWidths[j].width < length) {
                        columnWidths[j].width = length;
                    }
                }
                else {
                    columnWidths.push({name: column.name, width: length});
                }
                count++;
            }
        }
        let highestWidthIndex = 0;
        let highestWidth = 0;
        let totalOffset = 0;
        columnWidths = this.bufferColumnLengthValues(columnWidths, average);
        let totalLength = this.getTotalColumnLength(columnWidths);
        for (let i = 0; i < columnWidths.length; i++) {
            let newWidth = Math.floor((columnWidths[i].width * this.maxWidth) / totalLength);
            if (newWidth < this.minWidth) {
                totalOffset += this.minWidth - newWidth;
                newWidth = this.minWidth
            }
            if (newWidth > highestWidth) {
                highestWidth = newWidth;
                highestWidthIndex = i;
            }
            this.columns[i].width = newWidth;
            if (i > 0) {
                this.columns[i].left = this.columns[i-1].width + this.columns[i-1].left;
            }
        }
        if (totalOffset > 0) {
            let widthArray = [];
            let maxWidth = 0;
            for (let i = 0; i < this.columns.length; i++) {
                if (this.columns[i].width > this.minWidth) {
                    let offset = this.columns[i].width - this.minWidth;
                    let isMax = false;
                    if (offset > maxWidth) {
                        maxWidth = offset;
                        isMax = true;
                    }
                    widthArray.push({index: i, offset: this.columns[i].width - this.minWidth, isMax: isMax});
                }
            }
            let dividedOffset = Math.floor(totalOffset / widthArray.length);
            let upperOffsetDiff = totalOffset - (dividedOffset * widthArray.length);
            for (let i = 0; i < widthArray.length; i++) {
                widthArray[i].offset -= dividedOffset;
                if (widthArray[i].isMax) {
                    widthArray[i].offset -= upperOffsetDiff;
                }
            }
            for (let i = 0; i < this.columns.length; i++) {
                let columnOffset = this.getColumnOffset(i, widthArray);
                this.columns[i].width = columnOffset + this.minWidth;
                if (i > 0) {
                    this.columns[i].left = this.columns[i-1].width + this.columns[i-1].left;
                }
            }
        }
        this._widthInitialized = true;
    }

    private getColumnOffset(index: number, columns: any) {
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].index === index) {
                return columns[i].offset;
            }
        }
        return 0;
    }

    private bufferColumnLengthValues(columnWidths: any, average: number) {
        for (let i = 0; i < columnWidths.length; i++) {
            let bufferValue = columnWidths[i].width + ((average - columnWidths[i].width) * 0.35);
            columnWidths[i].width = bufferValue;
        }
        return columnWidths;
    }

    private getTotalColumnLength(columnWidths: any): number {
        let totalLength = 0;
        for (let i = 0; i < columnWidths.length; i++) {
            totalLength += columnWidths[i].width;
        }
        return totalLength;
    }

    private loadColumnDataIntoRows(): void {
        let numRows = this.rows.length;
        let foundFirst = false;
        let foundLast = false;
        for (let i = 0; i < numRows; i++) {
            let row = this.rows[i];
            row.columns = this.columns;
            for (let j = 0; j < this.columns.length; j++) {
                let type = this.columns[j].type;
                let value = this.rows[i].values[j];
                if (type === 'number') {
                    value = Number(value);
                }
                else if (type === 'date') {
                    let formatString = this.columns[j].formatString
                    //convert the date to moment incase it's string and format it correctly
                    if (formatString === null || formatString === undefined || formatString === '') {
                        value = moment(value).format('MM/DD/YYYY');
                    }
                    else {
                        value = moment(value).format(formatString);
                    }
                }
            }
        }
        // for (let i = 0; i < this.columns.length; i++) {
        //     this.columns[i].position = i;
        //     if (!foundFirst && (this.columns[i].breakpoints === null || this.columns[i].breakpoints === '')) {
        //         this.columns[i].isFirst = true;
        //         foundFirst = true;
        //     }
        //     for (let j = 0; j < numRows; j++) {
        //         let type = this.columns[i].type;
        //         let value = this.rows[j].values[i];
        //         if (type === 'number') {
        //             value = Number(value);
        //         }
        //         else if (type === 'date') {
        //             let formatString = this.columns[i].formatString
        //             //convert the date to moment incase it's string and format it correctly
        //             if (formatString === null || formatString === undefined || formatString === '') {
        //                 value = moment(value).format('MM/DD/YYYY');
        //             }
        //             else {
        //                 value = moment(value).format(formatString);
        //             }
        //         }
        //         let column = new KongFuColumn(
        //             this.columns[i].name,
        //             this.columns[i].title,
        //             //value,
        //             this.columns[i].sortable,
        //             this.columns[i].filterable,
        //             this.columns[i].breakpoints,
        //             this.columns[i].type,
        //             this.columns[i].formatString);
        //         column.position = this.columns[i].position;
        //         column.isFirst = this.columns[i].isFirst;
        //         if (this.rows[j].columns === null) {
        //             this.rows[j].columns = [column];
        //         }
        //         else {
        //             this.rows[j].columns.push(column);
        //         }
        //     }
        // }
    }

    private showChildren(row: KongFuRow): void {
        if (this.isBreakpointActive) {
            row.isExpanded = !row.isExpanded;
        }
        else {
            row.isExpanded = false;
        }
    }

    private titleClicked(header: KongFuColumn): void {
        let key = header.name;
        if (header.isSorted) {
            header.ascending = !header.ascending;
        }
        else {
            header.isSorted = true;
        }
        this.rows.sort(this.sortComparator.bind(null, key, header.ascending, this));
    }

    private sortComparator(key, ascending, self, a, b): number {
        let aVal;
        let bVal;
        let type;
        for (let i = 0; i < a.columns.length; i++) {
            if (a.columns[i].name === key) {
                type = a.columns[i].type;
                aVal = a.columns[i].value;
                bVal = b.columns[i].value;
                if (type === 'number') {
                    aVal = Number(aVal);
                    bVal = Number(bVal);
                }
                else if (type === 'date') {
                    let formatString = a.columns[i].formatString
                    if (formatString === null || formatString === undefined || formatString === '') {
                        aVal = moment(aVal, 'MM/DD/YYYY');
                        bVal = moment(bVal, 'MM/DD/YYYY');
                    }
                    else {
                        aVal = moment(aVal, formatString);
                        bVal = moment(bVal, formatString);
                    }
                }
                break;
            }
        }

        if (type === 'date') {
            return self.dateCompare(aVal, bVal, ascending);
        }
        else {
            if (aVal > bVal) {
                if (ascending) {
                    return 1;
                }
                return -1;
            }
            else if (bVal > aVal) {
                if (ascending) {
                    return -1;
                }
                return 1;
            }
            return 0;
        }
    }

    filterData(filters: KongFuFilter[]) {
        for (let i = 0; i < filters.length; i++) {
            this.rows = this.applyFilter(filters[i], this.rows);
        }
        this.showSpinner = false;
    }

    filteringStart(hasStarted: boolean) {
        if (hasStarted) {
            this.showSpinner = true;
        }
    }

    private applyFilter(filter: KongFuFilter, data: KongFuRow[]): KongFuRow[] {
        let filteredData: KongFuRow[] = [];
        for (let i = 0; i < this.originalData.length; i++) {
            let row = this.originalData[i];
            let foundMatch = false;
            for (let j = 0; j < row.columns.length; j++) {
                let column = row.columns[j];
                for (let k = 0; k < filter.columns.length; k++) {
                    let filterColumn = filter.columns[k];
                    if (filterColumn.name === column.name) {
                        if (this.options.filtering.ignoreCase) {
                            if (row.values[j].toString().toUpperCase().includes(filter.filterValue.toUpperCase())) {
                                filteredData.push(row);
                                foundMatch = true;
                                break;
                            }
                        }
                        else {
                            if (row.values[j].toString().includes(filter.filterValue)) {
                                filteredData.push(row);
                                foundMatch = true;
                                break;
                            }
                        }
                    }
                }
                if (foundMatch) {
                    break;
                }
            }
        }
        return filteredData;
    }



    private dateCompare(a, b, ascending): number {
        if (moment(a).isAfter(b)) {
            if (ascending) {
                return 1;
            }
            return -1;
        }
        else if (moment(b).isAfter(a)) {
            if (ascending) {
                return -1;
            }
            return 1;
        }
        return 0;
    }
}
