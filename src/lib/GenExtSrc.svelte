<script lang="ts">
	import { T, Three } from '@threlte/core';
  import { Text } from '@threlte/extras'
	import { getFileData } from '../utils/genOutline';
	import { DoubleSide, Vector2} from 'three';
  import { Lut } from 'three/examples/jsm/math/Lut'
  import * as THREE from 'three';
  import { generateLatheColors, findMinsAndMaxs} from '../utils/gUtils';
  import type { FermiData } from '../utils/fermi';

  export let verticalOffset = 0;
  export let horizontalScale = 20;
  export let verticalScale = 30;

  const fnames = ['./test0.txt', './test1.txt', './test2.txt'];

	//let [lpts, xmax, ymax] = getFileData(horizontalScale, verticalScale);

  let promise = getFileData(fnames[2], horizontalScale, verticalScale);


  //let [lpts, xmax, ymax] = extsrcoutline(15, 10, 1);
  let xmax = -1e20;
  let ymax = -1e20;

  let image: THREE.LatheGeometry;
  promise.then((fd) => {
    if (fd) {
      xmax = fd.xmax;
      ymax = fd.ymax;
      //console.log(fd);
      image = new THREE.LatheGeometry(fd.data, 51, 0, Math.PI * 2);    
      const lathcolors = generateLatheColors(image, verticalScale, 'rainbow', 32 )
      image.setAttribute( 'color', new THREE.BufferAttribute( lathcolors, 3 ) );
    }
  });

  const fontSize = 2;
  const fontColor = 'black';

</script>

<T.Mesh 
  geometry={image}
  position={[0, verticalOffset, 0]} 
  rotation={[0, 0, 0]}
  castShadow let:ref>
  
  <T.MeshPhongMaterial
    vertexColors={true} 
    opacity={1} 
    transparent side={DoubleSide} />
</T.Mesh>

<T.Mesh rotation={[0, -Math.PI/4, 0]} position={[horizontalScale, verticalScale, -horizontalScale]} castShadow let:ref>
  <Text 
      text={'Extended Source Focus'}
      color={fontColor}  
      fontSize={3} 
      anchorX={'center'} 
      anchorY={'top'}
  />
</T.Mesh>

<T.Mesh position={[-horizontalScale-3, verticalScale-3, -horizontalScale]} castShadow let:ref>
  <Text 
      text={'1.0'}
      color={fontColor}
      fontSize={fontSize} 
      anchorX={'center'} 
      anchorY={'top'}
  />
</T.Mesh>

{#if (ymax < 0.85)}
  <T.Mesh position={[-horizontalScale-3, ymax*verticalScale-3.5, -horizontalScale]} castShadow let:ref>
    <Text 
      text={'peak=' + ymax.toFixed(2)}
      color={fontColor}
      fontSize={fontSize} 
      anchorX={'right'}  
    />
  </T.Mesh>
{/if}


<T.Mesh position={[-horizontalScale-3, -3, -horizontalScale]} castShadow let:ref>
  <Text 
      text={'0'} 
      color={fontColor}
      fontSize={fontSize} 
      anchorX={'center'} 
      anchorY={'top'}
  />
</T.Mesh>

<T.Mesh rotation={[0, -Math.PI/2, 0]} position={[-horizontalScale, -3, +horizontalScale + 3]} castShadow let:ref>
  <Text 
      text={(-xmax).toFixed(3) + ' mm'} 
      color= {fontColor}
      fontSize={fontSize} 
      anchorX={'left'} 
      anchorY={'top'}
  />
</T.Mesh>

<T.Mesh rotation={[0, -Math.PI/2, 0]} position={[horizontalScale+1, -3, horizontalScale + 3]} castShadow let:ref>
  <Text 
      text={xmax.toFixed(3) + ' mm'}
      color={fontColor}
      fontSize={fontSize} 
      anchorX={'left'} 
      anchorY={'top'}
  />
</T.Mesh>

<T.Mesh rotation={[0, -Math.PI/2, 0]} position={[0, -3, horizontalScale + 3]} castShadow let:ref>
  <Text 
      text={'0'}
      color={fontColor}
      fontSize={fontSize} 
      anchorX={'left'} 
      anchorY={'top'}
  />
</T.Mesh>


