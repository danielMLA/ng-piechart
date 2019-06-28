import {Component, OnInit} from '@angular/core';
import {ElementMargins} from "./d3-pie-chart/element-margins";
import {PieChartOptions} from "./d3-pie-chart/pie-chart-options";
import {PieChartData} from "./d3-pie-chart/pie-chart-data";
import {ChartStubData} from "./d3-pie-chart/chart-stub-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'ng-d3js';

  chartOptions: PieChartOptions;
  chartData: PieChartData[];

  ngOnInit(): void {
    this.initChartOptions();
    this.initChartData();
  }

  private initChartOptions(): void {
    const margins = new ElementMargins(100, 100, 100, 100);
    this.chartOptions = new PieChartOptions(
      300,
      300,
      margins,
      true,
      .3
    );
  }
  private initChartData(): void {
    this.chartData = ChartStubData;
  }
}
