<script lang="ts">
	import { InteractiveObject, T, useFrame, ViewportAwareObject } from '@threlte/core';
	import { lensOutline } from '../utils/genOutline';
	import { DoubleSide} from 'three';
  import { Lut } from 'three/examples/jsm/math/Lut'
  import * as THREE from 'three';
  import { generateLatheColors } from '../utils/gUtils';
  import { useCursor, Text } from '@threlte/extras'

  export let autorotate = false;

	const lpts = lensOutline();

  const image = new THREE.LatheGeometry(lpts, 100, 0, Math.PI * 2);    
  const lathcolors = generateLatheColors(image, 6, 'rainbow', 124 )
  image.setAttribute( 'color', new THREE.BufferAttribute( lathcolors, 3 ) );

  const lut = new Lut( 'rainbow', 124 );

  let rotationX = Math.PI / 2;
  let rotationY = 0;
  let rotationZ = 0;
  if (autorotate) {
    useFrame(() => {
      rotationX += 0.1
      rotationY += 0.1
      rotationZ += 0.1
    })
  }

  const material = new THREE.MeshStandardMaterial({
		color: 0xc62004
	})
  let opacity = 0.85;
	const { hovering, onPointerEnter, onPointerLeave } = useCursor()
  $: if ($hovering) {
    console.log('hovering')
		material.color = new THREE.Color('blue') // change lens color to blue
    opacity = 0.2;  // reduce opacity of laser beam when hovering
	} else {
    console.log('not hovering')
		material.color = new THREE.Color('orange')
    opacity = 0.85;
	}

  function onClick() {
    console.log('clicked')
  }
</script>

<T.Mesh 
  geometry={image}
  position={[0, 0, 0]} 
  rotation.x={rotationX} 
  rotation.y={rotationY} 
  rotation.z={rotationZ} 
  interactive
  {material}
  castShadow let:ref>

  <InteractiveObject
    object={ref}
    interactive
    on:click={onClick}
    on:pointerenter={onPointerEnter}
    on:pointerleave={onPointerLeave}
  />
</T.Mesh>
  
<T.Mesh position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]} castShadow let:ref>
  <T.CylinderGeometry args={[8, 8, 10, 30]} />
  <T.MeshPhongMaterial color="red" opacity={opacity} transparent/>
</T.Mesh>

<T.Mesh position={[0, 0, 25]} rotation={[-Math.PI/2, 0, 0]} castShadow let:ref>
  <T.CylinderGeometry args={[8, 0.1, 50, 30]} />
  <T.MeshPhongMaterial color="red" opacity={opacity} transparent/>
</T.Mesh>


<!--
    <T.MeshPhongMaterial
    vertexColors={true} 
    opacity={0.85} 
    transparent side={DoubleSide} />
-->


