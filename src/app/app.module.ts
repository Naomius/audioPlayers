import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatSliderModule} from "@angular/material/slider";
import {MatBadgeModule} from "@angular/material/badge";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatLineModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatToolbarModule,
        MatTableModule,
        MatSliderModule,
        MatBadgeModule,
        MatMenuModule,
        MatListModule,
        MatLineModule
    ],
    exports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
