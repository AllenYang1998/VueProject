<template>
	<div id="detail">
		<h1><a :href="zufang.link" style="text-decoration:none;font-size: 30px;">{{ zufang.title }}</a></h1>
		<h3 style="color: red;"><strong>{{zufang.rent_method}}</strong> {{rent_contract}}|{{pay}}</h3>	
		<el-tag v-for="tag in tags">{{ tag }}</el-tag><br /><br />
		<div align="center">
			<el-carousel indicator-position="outside" height=" 450px" style='width: 600px;'>
			    <el-carousel-item v-for="img in imgs" >
					<el-image :src="img" style='height: 450px;width: 600px;'></el-image>
			    </el-carousel-item>
			</el-carousel>
		</div>
		
		<p>
			<font>{{zufang.city_name}}</font>-
			<font>{{zufang.area_name_1}}</font>-
			<font>{{zufang.area_name_2}}</font>
		</p>
		<br />
		
		<p class="mb15">
			<strong>距离公司：</strong>{{ distance_text }} {{recommend}}
		</p>
		<!-- <div v-for="(same,index) in same_result" >
			{{same[0]}}|{{same[1]}}|{{same[2]}}|{{same[3]}}
		</div> -->		
		<p class="mb15"><strong>房屋结构：</strong>{{zufang.structure}}</p> 
		<p class="mb15"><strong>室内面积：</strong>{{zufang.area}}</p>
		<p class="mb15"><strong>装修情况：</strong>{{zufang.decoration}}</p> 
		<p class="mb15"><strong>房屋配套：</strong>{{zufang.matching}}</p>
		
		<div v-html="zufang.description"></div>
		<el-button v-show="!is_star" type="warning" icon="el-icon-star-off" circle @click="addStar()"></el-button>
		<el-button v-show="is_star" type="danger" icon="el-icon-delete" circle @click="deleteStar()"></el-button>
	</div>
</template>

<script>
	export default{
		name:'detail',
		data(){
			return{
				zufang:{},	
				zufang_id:'',
				imgs:[],
				description:'',
				address:'',
				origins:'',
				distance:'',
				duration:'',
				distance_text:'',
				duration_text:'',
				workTransportList:[],
				zufangTransportList:[],
				same_result:[],
				price:0,
				rent_contract:'',
				is_star:0,
				tags:[],
			}
		},
		methods:{
			// 打印同线交通
			log(){
				for(var i=0;i<this.zufangTransportList.length;i++){
					for(var j=0;j<this.workTransportList.length;j++){	
						var same = this.intersect(this.zufangTransportList[i]['address'].split(";"),this.workTransportList[j]['address'].split(";"));
						if(same.length>0) {
							this.same_result[same] = new Array(); 
							this.same_result[same]['zufang'] = this.zufangTransportList[i]['station_name'];
							this.same_result[same]['work'] = this.workTransportList[j]['name'];
							this.same_result[same]['type'] = this.zufangTransportList[i]['transport_type'];
							break;
						}
					}
				}
				// window.console.log(this.same_result);
			},
			// 求交集
			intersect(a,b){
			    let set1 = new Set(a),set2 = new Set(b);
			      return [...new Set([...set1].filter( x => set2.has(x)))];
			},
			isStar(){
				this.zufang_id = this.$route.params['id'];
				this.axios({
					url: this.server_url+'/api/user/isstar/',
					method: 'post',
					data:{
						zufang_id: this.zufang_id
					},
					headers: {'Authorization': this.Authorization_token}
				}).then(res => {
					// window.console.log(res)
					if(res['status']==200){
						this.is_star = 1;
					}
				})
			},
			// 添加租房收藏
			addStar(){
				this.axios({
					url: this.server_url + '/api/user/star/',
					method: 'post',
					data:{
						zufang_id: this.zufang_id
					},
					headers: {'Authorization': this.Authorization_token}
				}).then(res => {
					window.console.log('res');
					this.is_star = 1;
				})
			},
			// 取消收藏
			deleteStar(){
				this.axios({
					url: this.server_url + '/api/user/star',
					method: 'delete',
					data:{
						zufang_id: this.zufang_id
					},
					headers: {'Authorization': this.Authorization_token}
				}).then(res => {
					window.console.log(res);
					this.is_star = 0;
				})
			},
			// 获取租房房源信息
			getZufangInfo(){
				this.zufang_id = this.$route.params['id'];
				this.axios({
				url: this.server_url+'/api/zufang/'+this.zufang_id,
				method: 'get'
				}).then(res => {
					this.zufang = res['data'];
					this.title = res['data']['title'];
					this.link = res['data']['link'];
					this.tags = res['data']['tags'].split(" ");
					this.imgs = res['data']['zufang_img_list'].split(",");
					this.description = res['data']['description'];
					this.city_name = res['data']['city_name'];
					this.area_name_1 = res['data']['area_name_1'];
					this.area_name_2 = res['data']['area_name_2'];
					this.origins = res['data']['position'];
					this.price = res['data']['price'];
					this.rent_contract = res['data']['rent_contract'];
				})
			},
			// 获取租房周边交通信息
			getTransport(){
				// 打印房源的周边
				this.axios({
					url: this.server_url+'/api/zufang/transport/',
					method: 'post',
					data:{
						id:this.zufang_id
					}
				}).then(res => {
					var same_result = [];
					this.zufangTransportList = res['data'];
					// window.console.log(res['data']);
					var workTransportList = JSON.parse(localStorage.transport)['results'];
					// window.console.log(workTransportList);
					for(var i=0;i<res['data'].length;i++){
						for(var j=0;j<workTransportList.length;j++){	
							var same = this.intersect(res['data'][i]['address'].split(";"),workTransportList[j]['address'].split(";"));
							if(same.length>0) {
								same_result.push([same[0],res['data'][i]['station_name'],workTransportList[j]['name'],res['data'][i]['transport_type']]); 
								break;
							}
						}
					}
					// window.console.log(same_result);
					this.same_result = same_result;
				})
			},
		},
		computed:{
			recommend(){
				// 计算机距离
				if(this.distance=='' || this.duration=='')
				{
					this.$jsonp('https://api.map.baidu.com/routematrix/v2/riding',{
						ak: 'AktQnb3RWmVG2OsYcNcGXfZPFirATy4L',
						origins: this.origins,
						destinations: localStorage.position,
					})
					.then(res => {
						window.console.log(res);
						// 距离
						this.distance = res['result'][0]['distance']['value'];
						this.distance_text = res['result'][0]['distance']['text'];
						// 用时
						this.duration = res['result'][0]['duration']['value'];
						this.duration_text = res['result'][0]['duration']['text'];
					}).catch(err => {
						window.console.log('百度地图距离计算API请求失败');
					})
				}
				this.getTransport();
				// 先模拟用户
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
			},
			pay(){
				switch(this.rent_contract)
				{
				    case '押一付一':
				        return '押金：' + this.price + '|' + '首付：'+this.price*2 + '|' + '月付：'+ this.price+'+房屋管理费和水电费';
				        break;
				    case '押一付三':
				        return '押金：' + this.price + '|' + '首付：'+this.price*4 + '|' + '月付：'+ this.price+'+房屋管理费和水电费';
				        break;
					case '押二付一':
					    return '押金：' + this.price*2 + '|' + '首付：'+this.price*3 + '|' +'月付：'+ this.price+'+房屋管理费和水电费';
					    break;
					case '押二付三':
					    return '押金：' + this.price*2 + '|' + '首付：'+this.price*5 + '|' + '月付：'+ this.price+'+房屋管理费和水电费';
					    break;
					case '半年付':
					    return '首付：' + this.price*6;
					    break;
					case '年付':
					    return '首付：' + this.price*12;
					    break;
				    default:
				        return '押金：面议';
				}
			},
		},
		created() {
			this.getZufangInfo();
			this.getTransport();
			this.isStar();
		},
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
		/* width: 90%; */
	}
	.left{
		float:left;
	}
</style>
