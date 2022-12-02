import {Vector2 } from 'three';
import { fittofermiDirac } from './fermi';
import type { FermiData } from './fermi';

export async function getFileData(horizontalScale = 15, verticalScale = 10) {
  const response = await fetch('./test3.txt');
  const filestr = await response.text()

  const xsraw: number[] = [];
  const ysraw: number[] = [];

  const lines = filestr.split('\r\n');

  lines.forEach((line: string, index: number) => {
    if ( (index > 0) && (line.length > 0) ) {
      const xydata = line.split(',').map((x) => parseFloat(x));
      if (xydata[0] >= -0.000001) {
        xsraw.push(xydata[0]);
        ysraw.push(xydata[1]);
      }
    }
  });
  //console.log(xsraw, ysraw);
  const xmax = Math.max(...xsraw);
  const ymax = Math.max(...ysraw);

  const ys = scaleArray(fittofermiDirac(xsraw, ysraw), verticalScale);
  const xs = scaleArray(xsraw, horizontalScale);

  const data: Vector2[] = [];
  for(let i = 0; i < xs.length; i++) {
    data.push(new Vector2(xs[i], ys[i]));
  }
  //console.log(data)
  //const output: FermiData = {data, xmax, ymax};
  return [data, xmax, ymax];
}

export function extsrcoutline(horizontalScale = 15, verticalScale = 10, colnum = 1): [Vector2[], number, number] {
  const lpts = [
    [0, 1.023635606, 1.023112008],
    [0.001, 0.952426173, 1.001644458],
    [0.002, 0.977035315, 1.015781625],
    [0.003, 0.992743279, 0.97075213],
    [0.004, 0.986460093, 0.972846525],
    [0.005, 1.017352421, 0.993790476],
    [0.006, 0.958185759, 1.017352421],
    [0.007, 1.014210828, 1.009498439],
    [0.008, 1.001644458, 0.987507291],
    [0.009, 0.955567765, 0.993266877],
    [0.01, 1.012116433, 0.96656334],
    [0.011, 0.975464519, 0.967610537],
    [0.012, 1.005309649, 0.979653309],
    [0.013, 1.007404044, 1.010545637],
    [0.014, 0.983318501, 0.948760981],
    [0.015, 0.999026464, 0.975464519],
    [0.016, 0.97075213, 0.990648883],
    [0.017, 1.024159205, 0.956614963],
    [0.018, 0.974417321, 0.922057444],
    [0.019, 1.021541211, 0.894306709],
    [0.02, 0.987507291, 0.93671821],
    [0.021, 1.000073661, 0.934623814],
    [0.022, 1.015781625, 0.917868654],
    [0.023, 1.042485162, 0.916297857],
    [0.024, 1.035678378, 0.907920277],
    [0.025, 1.037772773, 0.914727061],
    [0.026, 0.995361272, 0.914203462],
    [0.027, 0.997455668, 0.850324412],
    [0.028, 0.995884871, 0.900066295],
    [0.029, 1.023112008, 0.899542696],
    [0.03, 1.018923217, 0.854513202],
    [0.031, 1.008451242, 0.822050078],
    [0.032, 0.986460093, 0.837758041],
    [0.033, 1.011069236, 0.845088424],
    [0.034, 1.007404044, 0.823620874],
    [0.035, 0.950855376, 0.792728546],
    [0.036, 0.995884871, 0.831998454],
    [0.037, 1.023112008, 0.742986663],
    [0.038, 1.007927643, 0.771784595],
    [0.039, 0.983318501, 0.737227076],
    [0.04, 1.024682804, 0.746651854],
    [0.041, 1.014734427, 0.730943891],
    [0.042, 0.999550063, 0.725707903],
    [0.043, 1.003738853, 0.689579587],
    [0.044, 0.966039741, 0.657640062],
    [0.045, 1.004262452, 0.655022068],
    [0.046, 0.99221968, 0.595855407],
    [0.047, 0.958709358, 0.597949802],
    [0.048, 1.019446816, 0.558156295],
    [0.049, 0.96656334, 0.512603201],
    [0.05, 0.50893801, 0.465479312],
    [0.051, 0, 0.345051593],
    [0.052, 0, 0.304210889],
    [0.053, 0, 0.331438025],
    [0.054, 0, 0.283266938],
    [0.055, 0, 0.254469005],
    [0.056, 0, 0.229336264],
    [0.057, 0, 0.231954258],
    [0.058, 0, 0.205774319],
    [0.059, 0, 0.185877565],
    [0.06, 0, 0.162839219],
    [0.061, 0, 0.185353967],
    [0.062, 0, 0.140848071],
    [0.063, 0, 0.148178453],
    [0.064, 0, 0.134564885],
    [0.065, 0, 0.114668132],
    [0.066, 0, 0.098960169],
    [0.067, 0, 0.086917397],
    [0.068, 0, 0.088488193],
    [0.069, 0, 0.08115781],
    [0.07, 0, 0.085870199],
    [0.071, 0, 0.078539816],
    [0.072, 0, 0.074351026],
    [0.073, 0, 0.057072267],
    [0.074, 0, 0.047647489],
    [0.075, 0, 0.05131268],
    [0.076, 0, 0.050265482],
    [0.077, 0, 0.036651914],
    [0.078, 0, 0.039269908],
    [0.079, 0, 0.030892328],
    [0.08, 0, 0.036128316],
    [0.081, 0, 0.023561945],
    [0.082, 0, 0.025132741],
    [0.083, 0, 0.022514747],
    [0.084, 0, 0.018849556],
    [0.085, 0, 0.015184364],
    [0.086, 0, 0.012566371],
    [0.087, 0, 0.00837758],
    [0.088, 0, 0.005759587],
    [0.089, 0, 0.005759587],
    [0.09, 0, 0.000523599],
    [0.091, 0, 0.001570796],
    [0.092, 0, 0.001570796],
    [0.093, 0, 0],
    [0.094, 0, 0],
    [0.095, 0, 0],
    [0.096, 0, 0],
    [0.097, 0, 0],
    [0.098, 0, 0],
    [0.099, 0, 0],
    [0.1, 0, 0] 
  ]

  const xsraw: number[] = [];
  const ysraw: number[] = [];
  for (let i = 0; i < lpts.length; i+=2) {
    xsraw.push(lpts[i][0]);
    ysraw.push(lpts[i][colnum]);
  }

  const xmax = Math.max(...xsraw);
  const ymax = Math.max(...ysraw);

  const ys = scaleArray(fittofermiDirac(xsraw, ysraw), verticalScale);
  const xs = scaleArray(xsraw, horizontalScale);

  const data2: Vector2[] = [];
  for(let i = 0; i < xs.length; i++) {
    data2.push(new Vector2(xs[i], ys[i]));
  }

  const ys2 = scaleArray(ysraw, verticalScale);

  const data: Vector2[] = [];
  for(let i = 0; i < xs.length; i++) {
    data.push(new Vector2(xs[i], ys2[i]));
  }


  //console.log(strs);
  return [data2, xmax, ymax];
}

function scaleArray(arr: number[], scale: number): number[] {
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


