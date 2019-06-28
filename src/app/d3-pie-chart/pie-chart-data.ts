export class PieChartData {
  constructor(public label: string,
              public value: number,
              public displayValue: number,
              public img?: ImgData) {
  }
}

export class ImgData {
  constructor(public url = '', public size = 30) {
  }
}
