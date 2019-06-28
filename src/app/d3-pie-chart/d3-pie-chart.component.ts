import {Component, Input, OnInit} from '@angular/core';
import {PieChartOptions} from "./pie-chart-options";
import {PieChartData} from "./pie-chart-data";

@Component({
  selector: 'app-d3-pie-chart',
  templateUrl: './d3-pie-chart.component.html',
  styleUrls: ['./d3-pie-chart.component.less']
})
export class D3PieChartComponent implements OnInit {


  @Input() options: PieChartOptions;
  @Input() data: PieChartData[];
  constructor() { }

  ngOnInit() {
  }

}
