<template>
	<el-button class="btn-style" size="large" type="primary" @click="run" :disabled="disabled || time>0">{{text}}</el-button>
</template>

<script type="text/javascript">
export default {
	name: 'VerficationCode',
	data() {
		return {
			time: 0,
			second: 60,
			disabled: false
		}
	},
	methods: {
		run() {
			this.$emit('run')
		},
		start() {
			this.time = this.second
			this.timer()

		},
		stop() {
			this.time = 0
			this.disabled = true
		},
		setDisabled(val) {
			this.disabled = val
		},
		timer() {
			if(this.time > 0){
				this.time--
				setTimeout(this.timer,1000)
			}else{
				this.disabled = false
			}
		}
	},
	computed: {
		text() {
			return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码'
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>
