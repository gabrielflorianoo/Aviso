<template>
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

<script setup lang="ts"></script>

<style scoped></style>
