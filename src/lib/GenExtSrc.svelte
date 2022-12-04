<script lang="ts">
	import { T, Three } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import { parseFermiFileData } from '../utils/genOutline';
	import { DoubleSide, Vector2 } from 'three';
	import { Lut } from 'three/examples/jsm/math/Lut';
	import * as THREE from 'three';
	import { generateLatheColors, findMinsAndMaxs } from '../utils/gUtils';
	import type { FermiData } from '../utils/fermi';

	 import testData from '../utils/fermi_data/test0.txt?raw';
	// import testData from '../utils/fermi_data/test1.txt?raw';
	//import testData from '../utils/fermi_data/test2.txt?raw';
	//import testData from '../utils/fermi_data/test3.txt?raw';

	export let verticalOffset = 0;
	export let horizontalScale = 20;
	export let verticalScale = 30;

	//let [lpts, xmax, ymax] = extsrcoutline(15, 10, 1);

	const fermiData = parseFermiFileData(testData, horizontalScale, verticalScale);

	const xmax = fermiData.xmax;
	const ymax = fermiData.ymax;
	const image = new THREE.LatheGeometry(fermiData.data, 51, 0, Math.PI * 2);

	const lathcolors = generateLatheColors(image, verticalScale, 'rainbow', 32);
	image.setAttribute('color', new THREE.BufferAttribute(lathcolors, 3));

	const fontSize = 2;
	const fontColor = 'black';
</script>

{#if image}
	<T.Mesh
		geometry={image}
		position={[0, verticalOffset, 0]}
		rotation={[0, 0, 0]}
		castShadow
		let:ref
	>
		<T.MeshPhongMaterial vertexColors={true} opacity={1} transparent side={DoubleSide} />
	</T.Mesh>
{/if}

<T.Mesh
	rotation={[0, -Math.PI / 4, 0]}
	position={[horizontalScale, verticalScale, -horizontalScale]}
	castShadow
	let:ref
>
	<Text
		text={'Extended Source Focus'}
		color={fontColor}
		fontSize={3}
		anchorX={'center'}
		anchorY={'top'}
	/>
</T.Mesh>

<T.Mesh position={[-horizontalScale - 3, verticalScale - 3, -horizontalScale]} castShadow let:ref>
	<Text text={'1.0'} color={fontColor} {fontSize} anchorX={'center'} anchorY={'top'} />
</T.Mesh>

{#if ymax < 0.85}
	<T.Mesh
		position={[-horizontalScale - 3, ymax * verticalScale - 3.5, -horizontalScale]}
		castShadow
		let:ref
	>
		<Text text={'peak=' + ymax.toFixed(2)} color={fontColor} {fontSize} anchorX={'right'} />
	</T.Mesh>
{/if}

<T.Mesh position={[-horizontalScale - 3, -3, -horizontalScale]} castShadow let:ref>
	<Text text={'0'} color={fontColor} {fontSize} anchorX={'center'} anchorY={'top'} />
</T.Mesh>

<T.Mesh
	rotation={[0, -Math.PI / 2, 0]}
	position={[-horizontalScale, -3, +horizontalScale + 3]}
	castShadow
	let:ref
>
	<Text
		text={(-xmax).toFixed(3) + ' mm'}
		color={fontColor}
		{fontSize}
		anchorX={'left'}
		anchorY={'top'}
	/>
</T.Mesh>

<T.Mesh
	rotation={[0, -Math.PI / 2, 0]}
	position={[horizontalScale + 1, -3, horizontalScale + 3]}
	castShadow
	let:ref
>
	<Text
		text={xmax.toFixed(3) + ' mm'}
		color={fontColor}
		{fontSize}
		anchorX={'left'}
		anchorY={'top'}
	/>
</T.Mesh>

<T.Mesh rotation={[0, -Math.PI / 2, 0]} position={[0, -3, horizontalScale + 3]} castShadow let:ref>
	<Text text={'0'} color={fontColor} {fontSize} anchorX={'left'} anchorY={'top'} />
</T.Mesh>
