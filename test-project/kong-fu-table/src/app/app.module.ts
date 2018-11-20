import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KongFuTableModule } from './kong-fu-table/kong-fu-table.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KongFuTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
