import { Vector2, Vector3, BufferGeometry } from "three";
import { Lut } from 'three/examples/jsm/math/Lut'

export function generateLatheColors(image: BufferGeometry, maxZ: number, colorscheme = 'rainbow', numcolors = 101): Float32Array {
  const lut = new Lut( colorscheme, numcolors );
  const numVectors = image.getAttribute('position').array.length/3;
  const lathcolors = new Float32Array(numVectors * 3)
  let lcolposi = 0;
  for(let i = 0; i< numVectors; i++) {
    const yh = image.getAttribute('position').array[3 * i + 1];
    const colorindex = yh / maxZ;
    lathcolors.set([lut.getColor(colorindex).r, lut.getColor(colorindex).g, lut.getColor(colorindex).b], lcolposi )
    lcolposi += 3;
  }
  return lathcolors;
}

export function findMinsAndMaxs( points: number[][]): [xmin: number, xmax: number, ymin: number, ymax: number] {
  let xmax = -1e10;
  let xmin = 1e10;
  let ymax = -1e10;
  let ymin = 1e10;
  for (let i = 0; i < points.length; i++) {
    if (points[i][1] < ymin) {ymin = points[i][1]}
    if (points[i][1] > ymax) {ymax = points[i][1]}
    if (points[i][0] < xmin) {xmin = points[i][0]}
    if (points[i][0] > xmax) {xmax = points[i][0]}
  }
  return [xmin, xmax, ymin, ymax];
}

export function doubleArrayToVector2( points: number[][], scalex: number, scaley: number ) {
  const vdata: Vector2[] = [];
  for (let i = 0; i < points.length; i++) {
    vdata.push(new Vector2(points[i][0] * scalex, points[i][1] * scaley));
  }
  return vdata;
}

export function arrayToScaledVector2( points: number[][], 
          xmin: number, xmax: number, scaledX: number, 
          ymin: number, ymax: number, scaledY: number ) {
  const vdata: Vector2[] = [];
  for (let i = 0; i < points.length; i++) {
    const newx = scaledX * (points[i][0] - xmin) / (xmax - xmin);
    const newy = scaledY * (points[i][1] - ymin) / (ymax - ymin);
    vdata.push(new Vector2(newx, newy));
  }
  return vdata;
}

export function arrayToScaledVector3( 
  points: number[][], 
  plotScale: number, 
  zPosition: number,
  zScale: number) {
  const vdata: Vector3[] = [];
  for (let i = 0; i < points.length; i++) {
    vdata.push(new Vector3(plotScale * points[i][0], plotScale * points[i][1], zPosition * zScale));
  }
  return vdata;
}

export function findVector2MinMaxY (data: Vector2[]): [number, number] {
  let max = -1e10;
  let min = 1e10;
  data.forEach(function (value) {
    if (value.y > max) { max = value.y }
    if (value.y < min) { min = value.y }
  });
  return [min, max];
}

export function findVector3MaxZ (data: Vector3[]): number {
  let max = -1e10;
  data.forEach(function (value) {
    if (value.z > max) {
      max = value.z
    }
  });
  return max;
}

export function interoplateZ(r: number, p: number[][]): number {
  for(let i = 0; i < p.length - 1; i++) {
    if ( (r >= p[i][0]) && (r < p[i+1][0]) ) {
      const slope = (p[i+1][0] - p[i][0]) / (p[i+1][1] - p[i][1]);
      return (r - p[i][0]) / slope + p[i][1];
    }
  }
  return 0.0;
}

// creates a 3d point cloud from a double array
export function create3DPts(pts: number[][], npts: number, scale: number, scaleI: number ): Vector3[] {
  const array: Vector3[] = [];
  const [, ,  , ymax] = findMinsAndMaxs(pts);
  const inc = 2 * ymax / (npts - 1);
  for(let x = -ymax; x <= ymax*1.0001; x += inc) {
    for(let y = -ymax; y <= ymax*1.0001; y += inc) {
      const r = Math.sqrt(x*x + y*y);
      if (r > ymax) {
        array.push(new Vector3(x*scale, y*scale, 0))
      } else {
        array.push(new Vector3(x*scale, y*scale, interoplateZ(r, pts)*scaleI))
      }        
    }
  }
  return array;
}
