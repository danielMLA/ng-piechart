import {ImgData, PieChartData} from "./pie-chart-data";

import '../../assets/imgs/apple.png';
import '../../assets/imgs/tetine.jpg';
import '../../assets/imgs/donut.jpg';

export const ChartStubData = [
  new PieChartData('monday', 2, 10, new ImgData('../../../assets/imgs/apple.png')),
  new PieChartData('tuesday', 4, 20, new ImgData('../../../assets/imgs/tetine.jpg')),
  new PieChartData('friday', 8, 40, new ImgData('../../../assets/imgs/donut.jpg')),
  new PieChartData('saturday', 6, 30, new ImgData('../../../assets/imgs/apple.png'))
];
