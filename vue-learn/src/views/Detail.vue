<template>
	<div id="detail">
		<h3>{{ title }}</h3>
		<p>{{ tags }}</p>
		<el-carousel indicator-position="outside">
		    <el-carousel-item v-for="img in imgs" :key="item">
		      <el-image :src="img" style='height: 400px;width: 400px;'></el-image>
		    </el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
	export default{
		name:'detail',
		data(){
			return{
				id:'',
				title:'',
				tags:{},
				imgs:[],
			}
		},
		created() {
		   this.id = this.$route.params['id'];
		   this.axios({
				url: this.server_url+'/api/zufang/'+this.id,
				method: 'get'
		   }).then(res => {
				this.title = res['data']['title'];
				this.tags = res['data']['tags'];
				this.imgs = res['data']['zufang_img_list'].split(",");
				window.console.log(res);
		   })
		}
	}
</script>

<style>
	.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
