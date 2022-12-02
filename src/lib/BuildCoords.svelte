<script lang='ts'>
	import { Line, T } from '@threlte/core'
	import { Vector3, LineBasicMaterial, ConeGeometry } from 'three';
  import { Text } from '@threlte/extras'

  export let locXYZ: Vector3 = new Vector3(0, 0, 0);
  export let lineLength: number = 20;

  // some arbitary scaling going on here
  const labelOffset = 2 * lineLength / 15;
  const coneArgs = [0.8 * lineLength / 15, 3 * lineLength / 15, 32];
  const fontSize = 5 * lineLength / 15;

  let ptsX: Vector3[] = []
  ptsX.push(locXYZ)
  ptsX.push(new Vector3(lineLength + locXYZ.x, locXYZ.y, locXYZ.z))
  const colorX = 'red'

  let ptsY: Vector3[] = []
  ptsY.push(locXYZ)
  ptsY.push(new Vector3(locXYZ.x, lineLength + locXYZ.y, locXYZ.z))
   const colorY = 'green'

  let ptsZ: Vector3[] = []
  ptsZ.push(locXYZ)
  ptsZ.push(new Vector3(locXYZ.x, locXYZ.y, lineLength + locXYZ.z))
  const colorZ = 'blue'

</script>

<!-- Do all lines within one mesh -->
<T.Mesh>
  <Line 
  points={ptsX}
  material={new LineBasicMaterial({color: colorX})}
  />
  <Line 
  points={ptsY}
  material={new LineBasicMaterial({color: colorY})}
  />
  <Line 
  points={ptsZ}
  material={new LineBasicMaterial({color: colorZ})}
  />
</T.Mesh>

<!-- Add cone and axis label for X Axis -->
<T.Mesh position={ptsX[1].toArray()} rotation.z={-Math.PI / 2} castShadow let:ref>
  <T.ConeGeometry args={coneArgs} />
  <T.MeshStandardMaterial color={colorX} />
</T.Mesh>

<T.Mesh position={[lineLength + locXYZ.x + labelOffset, locXYZ.y, locXYZ.z]} castShadow let:ref>
  <Text 
      text={'X'} 
      color='red'
      fontSize={fontSize} 
      anchorX={'left'} 
      anchorY={'middle'}
  />
</T.Mesh>



<!-- Add cone and axis label for Y Axis -->
<T.Mesh position={ptsY[1].toArray()} castShadow let:ref>
  <T.ConeGeometry args={coneArgs} />
  <T.MeshStandardMaterial color={colorY} />
</T.Mesh>

<T.Mesh position={[locXYZ.x, lineLength + locXYZ.y + labelOffset, locXYZ.z]} castShadow let:ref>
  <Text 
      text={'Y'} 
      color='green'
      fontSize={fontSize} 
      anchorX={'center'} 
      anchorY={'bottom-baseline'}
  />
</T.Mesh>

<!-- Add cone and axis label for Z Axis -->
<T.Mesh position={ptsZ[1].toArray()} rotation.x={Math.PI / 2} castShadow let:ref>
  <T.ConeGeometry args={coneArgs} />
  <T.MeshStandardMaterial color={colorZ} />
</T.Mesh>

<T.Mesh position={[locXYZ.x, locXYZ.y, lineLength + locXYZ.z + labelOffset]} castShadow let:ref>
  <Text 
      text={'Z'} 
      color='blue'
      fontSize={fontSize} 
      anchorX={'center'} 
      anchorY={'middle'}
  />
</T.Mesh>
