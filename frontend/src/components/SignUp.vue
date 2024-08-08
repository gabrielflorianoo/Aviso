<template>
	<section class="columns is-centered p-6">
		<div class="column is-6">
			<div class="field">
				<label class="label">Username</label>
				<div class="control has-icons-left has-icons-right">
					<input class="input" type="text" placeholder="Text input" />
					<span class="icon is-small is-left">
						<i class="fas fa-user"></i>
					</span>
					<span class="icon is-small is-right">
						<i class="fas fa-check"></i>
					</span>
				</div>
				<p class="help availability">This username is available</p>
			</div>

			<div class="field">
				<label class="label">Email</label>
				<div class="control has-icons-left has-icons-right">
					<input
						class="input"
						type="email"
						placeholder="Email input" />
					<span class="icon is-small is-left">
						<i class="fas fa-envelope"></i>
					</span>
					<span class="icon is-small is-right">
						<i class="fas fa-exclamation-triangle"></i>
					</span>
				</div>
				<p class="help availability">This email is invalid</p>
			</div>

			<div class="field">
				<label class="label">Password</label>
				<div class="control has-icons-left has-icons-right">
					<input
						class="input"
						type="password"
						placeholder="Text input" />
					<span class="icon is-small is-left">
						<i class="fas fa-lock"></i>
					</span>
					<span class="icon is-small is-right">
						<i class="fas fa-check"></i>
					</span>
				</div>
				<p class="help availability">This password is not available</p>
			</div>

			<div class="field">
				<div class="control">
					<label class="checkbox">
						<input type="checkbox" />
						I agree to the <a href="#">terms and conditions</a>
					</label>
				</div>
			</div>

			<div class="field is-grouped">
				<div class="control">
					<button class="button is-link">Submit</button>
				</div>
				<div class="control">
					<button class="button is-link is-light">Cancel</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	import { ref, onMounted } from "vue";

	// Cria uma referência reativa
	let availabilityRefs = ref([]);

	onMounted(() => {
		// Após o componente ser montado, capture os elementos
		availabilityRefs.value = document.getElementsByClassName("availability");

		// Itera sobre os elementos e aplica a opacidade
		Array.from(availabilityRefs.value).forEach((element) => {
			element.style.opacity = "0";
		});
	});
</script>

<style scoped>
	.availability {
		transition: opacity 0.5s ease;
	}
</style>
