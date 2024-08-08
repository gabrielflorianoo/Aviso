<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Message from "./components/Message.vue";
import Navbar from "./components/Navbar.vue";
import { ref } from "vue";
import axios from "axios";

let messages = ref([]);
axios
	.get("http://localhost:3000/tweets")
	.then((response) => {
		messages.value = response.data;
	})
	.catch((err) => {
		console.error(err);
	});
</script>

<template>
	<Navbar />
	<section class="is-full-desktop">
		<div class="columns p-2">
			<div class="column is-2" style="background-color: aqua">Users</div>
			<div class="column" style="background-color: bisque">
				<div
					class="p-1"
					v-for="message in messages"
					:key="message.messageID">
					<Message :message="message" />
				</div>
			</div>
			<div class="column is-2" style="background-color: chartreuse">
				Settings
			</div>
		</div>
	</section>
</template>

<style>
Navbar {
	height: 7vh;
}
section {
	height: 93vh;
}
</style>
