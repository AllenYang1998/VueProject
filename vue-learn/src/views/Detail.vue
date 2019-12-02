<template>
	<div id="detail">
		<h3>{{ title }}</h3>
		<p>{{ tags }}</p>
		<el-carousel indicator-position="outside">
		    <el-carousel-item v-for="img in imgs">
		      <el-image :src="img" style='height: 400px;width: 400px;'></el-image>
		    </el-carousel-item>
		</el-carousel>
		<div class="address">
			<font>{{city_name}}</font>-
			<font>{{area_name_1}}</font>-
			<font>{{area_name_2}}</font>
		</div>
		<p>{{recommend}}</p>
		<div v-html="description"></div>
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
				description:'',
				address:'',
				city_name:'',
				area_name_1:'',
				area_name_2:'',
				origins:'',
				distance:'',
				duration:'',
			}
		},
		computed:{
			recommend(){
				// 十分钟原则 二十分钟原则 三十分钟原则
				if(this.distance>=4000)
				{
					return '建议乘坐公交/地铁上班';
				}
				else if(this.duration<=15*60)
				{
					return '建议骑车';
				}
				else if(this.distance<=1500)
				{
					return '建议步行';
				}
			}
			
		},
		watch:{
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
				this.description = res['data']['description'];
				this.city_name = res['data']['city_name'];
				this.area_name_1 = res['data']['area_name_1'];
				this.area_name_2 = res['data']['area_name_2'];
				this.origins = res['data']['position'];
		   })
		   this.axios({
				url: this.server_url+'/api/zufang/transport/',
				method: 'post',
				data:{
					id:this.id
				}
		   }).then(res => {
				window.console.log(res)
		   })
		   
		},
		beforeUpdate(){
			// 计算机距离
			this.$jsonp('https://api.map.baidu.com/routematrix/v2/riding',{
				ak: 'AktQnb3RWmVG2OsYcNcGXfZPFirATy4L',
				origins: this.origins,
				destinations: localStorage.position,
			})
			.then(res => {
				// 距离
				this.distance = res['result'][0]['distance']['value'];
				// 用时
				this.duration = res['result'][0]['duration']['value'];
				window.console.log(res['result'][0]);
			}).catch(err => {
				window.console.log(err);
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
  .mb15{
	  float:left;
	  margin-top: 1.5px;
  }
  .address{
	  float:left;
  }
</style>
