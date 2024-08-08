<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
	<Navbar />
	<section class="is-full-desktop">
		<div class="columns p-2">
			<div class="column is-2" style="background-color: aqua;">Left Column</div>
			<div class="column" style="background-color: bisque;">Middle column</div>
			<div class="column is-2" style="background-color: chartreuse;">Right column</div>
		</div>
	</section>
</template>

<style>
  section {
    height: 100vh;
  }
</style>
