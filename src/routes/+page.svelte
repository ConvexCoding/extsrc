<script lang="ts">
	import { Canvas, OrbitControls, T, type ThreltePointerEvent } from '@threlte/core';
	import { Vector3 } from 'three';
	import BuildCoords from '../lib/BuildCoords.svelte';
	import BuildBackgroundGrids from '../lib/BuildBackgroundGrids.svelte';
  import GenExtSrc from '../lib/GenExtSrc.svelte';

	let showAxes = false;
	let showGrid = true;
  let showWfe = true;

	let controlsResetKey = 0; // use this to rerender the orbit controls

	function resetLensPosition() { 
		controlsResetKey++;
	}

  let verticalOffset = -5;
  let verticalScale = 20;
  let horizontalScale = 15

</script>

<div>
	<h1>Extended Source Focus Plotter - 3D</h1>
	<br />
</div>

<div class="scene">
	{#key `${controlsResetKey}`}
		<Canvas>
			<T.PerspectiveCamera makeDefault position={[-50, 25, 50]} fov={50}>
				<OrbitControls rotateSpeed={4} enableDamping={false} />
			</T.PerspectiveCamera>
			<T.AmbientLight color="white" intensity={0.6} />
			<T.DirectionalLight castShadow position={[0, 50, 0]} />
			<T.DirectionalLight position={[0, -50, 0]} intensity={0.5} />

			{#if showAxes}
				<BuildCoords locXYZ={new Vector3(0, verticalOffset, 0)} lineLength={15} />
			{/if}

      {#if showWfe}
        <GenExtSrc 
          verticalOffset={verticalOffset}
          horizontalScale={horizontalScale}
          verticalScale={verticalScale}/>
      {/if} 

			{#if showGrid}
				<BuildBackgroundGrids
					horizontalSize={horizontalScale * 2}
					verticalSize={verticalScale}
					verticalOffset={verticalOffset}
					showSides={true}
				/>
			{/if}

		</Canvas>
		<slot {resetLensPosition} />
	{/key}
</div>

<div class="absolute text-3xl top-20 right-10">
	<label for="reset">{'Reset Layout'}</label>
	<button id="reset" class="btn-info btn-xs btn btn-secondary" on:click={resetLensPosition}>
		Reset
	</button>
	<br />
	<br />
	<label for="show-axes">{'Show Axes'}</label>
	<input id="show-axes" type="checkbox" class="toggle" bind:checked={showAxes} />
	<br />
	<label for="show-grid">{'Show Grid'}</label>
	<input id="show-grid" type="checkbox" class="toggle" bind:checked={showGrid} />
	<br />
  <label for="show-wfe">{'Show WFE'}</label>
	<input id="show-wfe" type="checkbox" class="toggle" bind:checked={showWfe} />
	<br />
</div>

<style>
	.scene {
		margin-left: 200px;
		margin-top: 150px;
		width: 80%;
		height: 80%;
		position: absolute;
		inset: 0;
		background: radial-gradient(hsl(220 40% 60%), hsl(220 20% 10%));
		background-attachment: fixed;
	}
</style>
