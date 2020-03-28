<template>
	<div id="ZufangList">
		<!-- <h3>{{msg}}</h3> -->
		<el-row :gutter="0" v-for="(zufang, index) in nearzufanglist">
			<div @click="sendParams(zufang.id)"> 
				  <el-divider></el-divider>
				<el-col :span="8">
				  <div class="grid-content ">
					  <el-image :src="zufang.img"></el-image>
				  </div>
				</el-col>
				<el-col :span="16">
					<div class="grid-content ">
						<p style="font-size: 36px;">{{ zufang.title }}</p>
						<p style="font-size: 28px;">{{ zufang.area_name_1}}区 | {{ zufang.area_name_2}}</p>
						<p style="font-size: 32px;color: red;">{{ zufang.rent_method}}|{{ zufang.price}} ￥/ 月</p>
					</div>
				</el-col>
			</div>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'NearZufangList',
		// 接收父组件的传过来的数据，组件类似与函数，props就是形参数
		props: {
			msg:String,
		},
		data(){
			return{
				nearzufanglist:[],
				//zufanglistsize:0,
			}
		},
		methods:{
			// 跳转到详细信息页面传递房源id
			sendParams(val){
				this.$router.push({
					path:'/test/:id',
					name:'detail',
					params:{
						id:val,
					}
				})
			},
		},
		computed:{
		},
		// 页面初始化时进行的操作
		created() {
			this.axios({
				url: this.server_url+'/api/zufang/near/',
				data:{
					workaddress:localStorage.workaddress,
					price:localStorage.price,
					rent_method:localStorage.rent_method,
				},
				headers: {'Authorization': this.Authorization_token},
				method: 'post',
			}).then(res => {
				window.console.log(res)
				this.nearzufanglist = res['data'];
				// localStorage.nearzufanglist = JSON.stringify(res['data']);
			});
			/*
			if(!localStorage.nearzufanglist){
				this.axios({
					url: this.server_url+'/api/zufang/near/',
					data:{
						workaddress:localStorage.workaddress,
						price:localStorage.price,
						rent_method:localStorage.rent_method,
					},
					headers: {'Authorization': this.Authorization_token},
					method: 'post',
				}).then(res => {
					window.console.log(res)
					this.nearzufanglist = res['data'];
					localStorage.nearzufanglist = JSON.stringify(res['data']);
				});
			}else{
				this.nearzufanglist = JSON.parse(localStorage.nearzufanglist);
			}*/
		}
	}
</script>

<style>
  .el-row {
    margin-bottom: 2px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>