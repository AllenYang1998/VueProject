<template>
	<div id="detail">
		<h3>{{ text['title'] }}</h3>
	</div>
</template>

<script>
	export default{
		name:'detail',
		data(){
			return{
				id:'',
				text:{},
			}
		},
		created() {
		   this.id = this.$route.params['id'];
		   this.axios({
				url: 'http://127.0.0.1:8000/api/zufang/'+this.id,
				method: 'get'
		   }).then(res => {
				this.text = res['data']
				window.console.log(res);
		   })
		}
	}
</script>

<style>
</style>
