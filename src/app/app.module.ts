import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { D3PieChartComponent } from './d3-pie-chart/d3-pie-chart.component';
import {D3PieChartDirective} from "./d3-pie-chart/d3-pie-chart.directive";
import {D3PieChartService} from "./d3-pie-chart/d3-pie-chart.service";

@NgModule({
  declarations: [
    AppComponent,
    D3PieChartComponent,
    D3PieChartDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [D3PieChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
