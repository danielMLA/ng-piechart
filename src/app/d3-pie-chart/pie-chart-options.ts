import {ElementMargins} from "./element-margins";
import {ChartLabelFormat} from "./chart-label-format";

export class PieChartOptions {
  constructor(public height: number,
              public width: number,
              public margins: ElementMargins = new ElementMargins(),
              public donut = false,
              public donutRatio?: number,
              public textFormat: ChartLabelFormat = ChartLabelFormat.PERCENT) {
  }
}

