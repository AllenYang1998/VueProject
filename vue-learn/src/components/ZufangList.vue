<template>
	<div id="ZufangList">
		<h3>{{msg}}</h3>
		<el-row v-for="(zufang, index) in zufanglist">
			<el-col>
				<div class="grid-content bg-purple-light" @click="sendParams(zufang.id)">
					{{ zufang.title }}|{{ zufang.area_name_1}}|{{ zufang.area_name_2}}|{{ zufang.price}}
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'ZufangList',
		// 接收父组件的传过来的数据，组件类似与函数，props就是形参数
		props: {
			msg:String,
		},
		data(){
			return{
				zufanglist:[],
				zufanglistsize:0,
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
		// 页面初始化时进行的操作
		created() {
			this.axios({
				url: this.server_url+'/api/zufang/test/',
				data:{
					transport:localStorage.transport,
					city_name: localStorage.city_name
				},
				headers: {'Authorization': this.Authorization_token},
				method: 'post',
			}).then(res => {
				this.zufanglist = res['data'];
				this.zufanglistsize = res['data'].length;
				localStorage.zufanglist = JSON.stringify(res['data']);
				localStorage.zufanglistsize = res['data'].length;
			})
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