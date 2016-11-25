<template>
	<p>{{ hello }}</p>
</template>

<script>
	export default {
		data() {
			return {
				hello: 'Hello Vuejs.'
			}
		}
	}
</script>

<style lang="sass">
	$color: green;
	p { color: $color }
</style>