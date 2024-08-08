<script setup>
let loggued = false;
</script>

<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<a class="navbar-item" href="">
				<img
					class="img"
					src="../assets/Logo-Transparent.PNG"
					alt="Logo" />
			</a>
		</div>

		<div id="navbarBasicExample" class="navbar-menu">
			<div class="navbar-end" v-if="!loggued">
				<div class="navbar-item">
					<div class="buttons">
						<a class="button is-primary" href="users">
							<strong>Sign up</strong>
						</a>
						<a class="button is-light"> Log in </a>
					</div>
				</div>
			</div>
			<div class="navbar-end" v-else>
				<div class="navbar-item">
					<div class="buttons">
						<a class="button is-primary">
							<strong>Create a Tweet</strong>
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<style>
.img {
	min-height: 50px;
}
</style>
