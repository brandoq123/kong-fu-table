import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { KongFuTableCoreComponent } from './kong-fu-table-core/kong-fu-table-core.component';
import { KongFuTablePagingComponent } from './kong-fu-table-paging/kong-fu-table-paging.component';
import { KongFuTableFilteringComponent } from './kong-fu-table-filtering/kong-fu-table-filtering.component';
// import { KongFuTableDropdownMenuComponent } from './kong-fu-table-dropdown-menu/kong-fu-table-dropdown-menu.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        KongFuTableCoreComponent,
        KongFuTablePagingComponent,
        KongFuTableFilteringComponent,
        // KongFuTableDropdownMenuComponent
    ],
    exports: [
        KongFuTableCoreComponent
    ]
})

export class KongFuTableModule {

}