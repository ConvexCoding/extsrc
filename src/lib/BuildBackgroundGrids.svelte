<script lang='ts'>
	import { Line, T } from '@threlte/core'
	import { Vector3, LineBasicMaterial, ConeGeometry } from 'three';

  export let verticalSize = 10;
  export let horizontalSize = 30;
  export let verticalOffset = 0;
  export let showSides = true;

  let lines: Vector3[][] = [];

  let horizontalStep = horizontalSize / 10;
  let verticalStep = verticalSize / 5;
  const halfHoriz = horizontalSize / 2;
  const halfVert = verticalSize / 2;

  for (let i = 0; i <= 10; i++) {
    let line: Vector3[] = [];    
    line.push(new Vector3(-halfHoriz + horizontalStep * i, verticalOffset, -halfHoriz));
    line.push(new Vector3(-halfHoriz + horizontalStep * i, verticalOffset, +halfHoriz));
    lines.push(line);
    line = [];
    line.push(new Vector3(-halfHoriz, verticalOffset, -halfHoriz  + horizontalStep * i));
    line.push(new Vector3(+halfHoriz, verticalOffset, -halfHoriz  + horizontalStep * i));
    lines.push(line);
  }

  if (showSides) {
    for (let i = 0; i <= 10; i++) {
      let line: Vector3[] = [];    
      line.push(new Vector3(-halfHoriz + horizontalStep * i, verticalOffset, -halfHoriz));
      line.push(new Vector3(-halfHoriz + horizontalStep * i, verticalSize + verticalOffset, -halfHoriz));
      lines.push(line);
      line = [];  
      line.push(new Vector3( halfHoriz, verticalOffset, -halfHoriz + horizontalStep * i));
      line.push(new Vector3( halfHoriz, verticalSize + verticalOffset, -halfHoriz + horizontalStep * i));
      lines.push(line);
    }
    for (let i = 0; i <= 5; i++) {
      let line: Vector3[] = [];    
      line.push(new Vector3( -halfHoriz, verticalStep * i + verticalOffset, -halfHoriz));
      line.push(new Vector3( +halfHoriz, verticalStep * i + verticalOffset, -halfHoriz));
      lines.push(line);
      line = [];    
      line.push(new Vector3(halfHoriz, verticalStep * i + verticalOffset, -halfHoriz));
      line.push(new Vector3(halfHoriz, verticalStep * i + verticalOffset, +halfHoriz ));
      lines.push(line);
    }    
  }

</script>

<!-- Do all lines within one mesh -->
<T.Mesh>
  {#each lines as line}
    <Line 
    points={line}
    material={new LineBasicMaterial({color: 'orange'})}
    />
  {/each}
</T.Mesh>

