import {Vector2 } from 'three';
import { fittofermiDirac } from './fermi';
import type { FermiData } from './fermi';

export async function getFileData(filen: string, horizontalScale = 15, verticalScale = 10) {
  const response = await fetch(filen);
  const filestr = await response.text()

if (response.ok) {
  const xsall: number[] = [];
  const ysall: number[] = [];
  const xsraw: number[] = [];
  const ysraw: number[] = [];

  const lines = filestr.split('\r\n');

  lines.forEach((line: string, index: number) => {
    if ( (index > 0) && (line.length > 0) ) {
      const xydata = line.split(',').map((x) => parseFloat(x));
      xsall.push(xydata[0]);
      ysall.push(xydata[1]);
    }
  });
  const mid = (xsall.length - 1) / 2;
  xsraw.push(xsall[mid]);
  ysraw.push(ysall[mid]);
  for(let i = mid + 1; i < xsall.length; i++) {
    xsraw.push(xsall[i]);
    ysraw.push((ysall[i] + ysall[2*mid - i]) / 2);
  }

  const xmax = Math.max(...xsraw);
  const ymax = Math.max(...ysraw);

  const ys = scaleYArray(fittofermiDirac(xsraw, ysraw), verticalScale);
  const xs = scaleXArray(xsraw, horizontalScale);

  const data: Vector2[] = [];
  for(let i = 0; i < xs.length; i++) {
    data.push(new Vector2(xs[i], ys[i]));
  }
  const fd: FermiData = {data, xmax, ymax};
  //console.log(data)
  //const output: FermiData = {data, xmax, ymax};
  return fd;
  } else {
    return null;
  }
}

function scaleYArray(arr: number[], scale: number): number[] {
  const min = Math.min(...arr);
  const max = 1.0;
  const range = max - min;
  const scaled = arr.map((x) => (x - min) / range * scale);
  return scaled;
}

function scaleXArray(arr: number[], scale: number): number[] {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min;
  const scaled = arr.map((x) => (x - min) / range * scale);
  return scaled;
}

export function lensOutline (): Vector2[] {
  const lpts: Vector2[] = [];
  lpts.push(new Vector2(0.00, 0.00000));
  lpts.push(new Vector2(1.00, 0.01136));
  lpts.push(new Vector2(2.00, 0.04546));
  lpts.push(new Vector2(3.00, 0.10236));
  lpts.push(new Vector2(4.00, 0.18213));
  lpts.push(new Vector2(5.00, 0.28491));
  lpts.push(new Vector2(6.00, 0.41087));
  lpts.push(new Vector2(7.00, 0.56019));
  lpts.push(new Vector2(8.00, 0.73312));
  lpts.push(new Vector2(9.00, 0.92996));
  lpts.push(new Vector2(10.00, 1.15102));
  lpts.push(new Vector2(11.00, 1.39668));
  lpts.push(new Vector2(12.00, 1.66737));
  lpts.push(new Vector2(13.00, 1.96358));
  lpts.push(new Vector2(14.00, 2.28585));
  lpts.push(new Vector2(15.00, 2.63478));
  lpts.push(new Vector2(15.00, 2.63478));
  lpts.push(new Vector2(15.00, 3.36522));
  lpts.push(new Vector2(15.00, 3.36522));
  lpts.push(new Vector2(14.00, 3.71415));
  lpts.push(new Vector2(13.00, 4.03642));
  lpts.push(new Vector2(12.00, 4.33263));
  lpts.push(new Vector2(11.00, 4.60332));
  lpts.push(new Vector2(10.00, 4.84898));
  lpts.push(new Vector2(9.00, 5.07004));
  lpts.push(new Vector2(8.00, 5.26688));
  lpts.push(new Vector2(7.00, 5.43981));
  lpts.push(new Vector2(6.00, 5.58913));
  lpts.push(new Vector2(5.00, 5.71509));
  lpts.push(new Vector2(4.00, 5.81787));
  lpts.push(new Vector2(3.00, 5.89764));
  lpts.push(new Vector2(2.00, 5.95454));
  lpts.push(new Vector2(1.00, 5.98864));
  lpts.push(new Vector2(0.00, 6.00000));
  return lpts;
}

export function wfeOutLine (): Vector2[] {
  const lpts: Vector2[] = [];
  lpts.push(new Vector2(0.000, 0.0000));
  lpts.push(new Vector2(0.114, -0.0008));
  lpts.push(new Vector2(0.229, -0.0030));
  lpts.push(new Vector2(0.343, -0.0067));
  lpts.push(new Vector2(0.457, -0.0120));
  lpts.push(new Vector2(0.572, -0.0187));
  lpts.push(new Vector2(0.686, -0.0269));
  lpts.push(new Vector2(0.800, -0.0366));
  lpts.push(new Vector2(0.914, -0.0478));
  lpts.push(new Vector2(1.029, -0.0604));
  lpts.push(new Vector2(1.143, -0.0745));
  lpts.push(new Vector2(1.257, -0.0901));
  lpts.push(new Vector2(1.372, -0.1070));
  lpts.push(new Vector2(1.486, -0.1254));
  lpts.push(new Vector2(1.600, -0.1452));
  lpts.push(new Vector2(1.714, -0.1664));
  lpts.push(new Vector2(1.829, -0.1889));
  lpts.push(new Vector2(1.943, -0.2129));
  lpts.push(new Vector2(2.057, -0.2381));
  lpts.push(new Vector2(2.172, -0.2647));
  lpts.push(new Vector2(2.286, -0.2925));
  lpts.push(new Vector2(2.400, -0.3217));
  lpts.push(new Vector2(2.515, -0.3521));
  lpts.push(new Vector2(2.629, -0.3837));
  lpts.push(new Vector2(2.743, -0.4165));
  lpts.push(new Vector2(2.857, -0.4505));
  lpts.push(new Vector2(2.972, -0.4856));
  lpts.push(new Vector2(3.086, -0.5219));
  lpts.push(new Vector2(3.200, -0.5592));
  lpts.push(new Vector2(3.315, -0.5976));
  lpts.push(new Vector2(3.429, -0.6370));
  lpts.push(new Vector2(3.543, -0.6775));
  lpts.push(new Vector2(3.658, -0.7188));
  lpts.push(new Vector2(3.772, -0.7611));
  lpts.push(new Vector2(3.886, -0.8043));
  lpts.push(new Vector2(4.000, -0.8483));
  lpts.push(new Vector2(4.115, -0.8931));
  lpts.push(new Vector2(4.229, -0.9387));
  lpts.push(new Vector2(4.343, -0.9850));
  lpts.push(new Vector2(4.458, -1.0320));
  lpts.push(new Vector2(4.572, -1.0796));
  lpts.push(new Vector2(4.686, -1.1278));
  lpts.push(new Vector2(4.801, -1.1765));
  lpts.push(new Vector2(4.915, -1.2258));
  lpts.push(new Vector2(5.029, -1.2755));
  lpts.push(new Vector2(5.143, -1.3255));
  lpts.push(new Vector2(5.258, -1.3759));
  lpts.push(new Vector2(5.372, -1.4266));
  lpts.push(new Vector2(5.486, -1.4776));
  lpts.push(new Vector2(5.601, -1.5287));
  lpts.push(new Vector2(5.715, -1.5799));
  lpts.push(new Vector2(5.829, -1.6312));
  lpts.push(new Vector2(5.944, -1.6824));
  lpts.push(new Vector2(6.058, -1.7336));
  lpts.push(new Vector2(6.172, -1.7847));
  lpts.push(new Vector2(6.287, -1.8357));
  lpts.push(new Vector2(6.401, -1.8863));
  lpts.push(new Vector2(6.515, -1.9366));
  lpts.push(new Vector2(6.629, -1.9866));
  lpts.push(new Vector2(6.744, -2.0361));
  lpts.push(new Vector2(6.858, -2.0851));
  lpts.push(new Vector2(6.972, -2.1334));
  lpts.push(new Vector2(7.087, -2.1811));
  lpts.push(new Vector2(7.201, -2.2281));
  lpts.push(new Vector2(7.315, -2.2742));
  lpts.push(new Vector2(7.429, -2.3195));
  lpts.push(new Vector2(7.544, -2.3637));
  lpts.push(new Vector2(7.658, -2.4069));
  lpts.push(new Vector2(7.772, -2.4490));
  lpts.push(new Vector2(7.887, -2.4898));
  lpts.push(new Vector2(8.001, -2.5293));
  lpts.push(new Vector2(8.115, -2.5674));
  lpts.push(new Vector2(8.230, -2.6041));
  lpts.push(new Vector2(8.344, -2.6392));
  lpts.push(new Vector2(8.458, -2.6726));
  lpts.push(new Vector2(8.572, -2.7042));
  lpts.push(new Vector2(8.687, -2.7340));
  lpts.push(new Vector2(8.801, -2.7619));
  lpts.push(new Vector2(8.915, -2.7877));
  lpts.push(new Vector2(9.030, -2.8114));
  lpts.push(new Vector2(9.144, -2.8328));
  lpts.push(new Vector2(9.258, -2.8519));
  lpts.push(new Vector2(9.373, -2.8685));
  lpts.push(new Vector2(9.487, -2.8826));
  lpts.push(new Vector2(9.601, -2.8940));
  lpts.push(new Vector2(9.716, -2.9027));
  lpts.push(new Vector2(9.830, -2.9084));
  lpts.push(new Vector2(9.944, -2.9112));
  lpts.push(new Vector2(10.058, -2.9109));
  lpts.push(new Vector2(10.173, -2.9074));
  lpts.push(new Vector2(10.287, -2.9005));
  lpts.push(new Vector2(10.401, -2.8902));
  lpts.push(new Vector2(10.516, -2.8763));
  lpts.push(new Vector2(10.630, -2.8587));
  lpts.push(new Vector2(10.744, -2.8373));
  lpts.push(new Vector2(10.858, -2.8119));
  lpts.push(new Vector2(10.973, -2.7825));
  lpts.push(new Vector2(11.087, -2.7488));
  lpts.push(new Vector2(11.201, -2.7108));
  lpts.push(new Vector2(11.316, -2.6683));
  lpts.push(new Vector2(11.430, -2.6213));

  let ymin = 1e20;
  let ymax = -1e20;
  lpts.forEach(function (pt) {
    if (pt.y < ymin) ymin = pt.y;
    if (pt.y > ymax) ymax = pt.y;
  });

  lpts.forEach(function (pt) {
    pt.y = 10 * (pt.y - ymin) / (ymax - ymin);
  });

  return lpts;
}


