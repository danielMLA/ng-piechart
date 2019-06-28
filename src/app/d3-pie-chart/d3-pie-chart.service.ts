import {Injectable} from '@angular/core';

@Injectable()
export class D3PieChartService {

  constructor() {
  }

  isMeanAngleRight(ang1: number, ang2: number): boolean {
    const meanAngle = (ang1 + ang2) / 2;
    return meanAngle >= 0 && meanAngle <= Math.PI;
  }
}
