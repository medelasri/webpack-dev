<template>
	<p>{{ hello }}</p>
</template>

<script>
	export default {
		data() {
			return {
				hello: 'Hello Webpack Dev.'
			}
		}
	}
</script>

<style lang="sass">
	$color: red;
	p { color: $color; text-align: center }
</style>
