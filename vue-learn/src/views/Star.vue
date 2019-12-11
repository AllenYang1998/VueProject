<template>
	<div id="star">
		<h3>实习地点</h3>
		<el-table 
			:data="tableData">
			<el-table-column
				prop="title"
				label="标题"
				width="200">
			</el-table-column>
			<el-table-column
				prop="price"
				label="月租"
				width="100">
			</el-table-column>
			<el-table-column
				prop="area_name_1"
				label="区域"
				width="100">
			</el-table-column>
			<el-table-column
				prop="area_name_2"
				label="村"
				width="100">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
					size="mini"
					type="danger"
					@click="sendParams(scope.$index, scope.row)">查看</el-button>
					<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">取消收藏</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		name:'star',
		data(){
			return{
				tableData:{}
			}
		},
		methods:{
			// 跳转到详细信息页面传递房源id
			sendParams(index, row){
				this.$router.push({
					path:'/test/:id',
					name:'detail',
					params:{
						id:row['id'],
					}
				})
			},
			handleDelete(index, row) {
				// console.log(index, row);
				this.axios({
				url: this.server_url+'/api/user/star',
				method: 'delete',
				data:{
					zufang_id:row['id']
				},
				headers: {'Authorization': this.Authorization_token}
				}).then(res => {
					window.console.log(res);
				}).catch(err => {
					window.console.log(err);
				});
				location.reload();
			}
		},
		created() {
			this.axios({
			url: this.server_url+'/api/user/star/',
			method: 'get',
			headers: {'Authorization': this.Authorization_token}
			}).then(res => {
				// for(var i=0;i<res['data'].length;i++)
				// {
				// 	res['data'][i]['transport'] = eval(res['data'][i]['transport']);
				// }
				// this.workaddresslist = res['data'];
				this.tableData=res['data'];
				window.console.log(res);
			}).catch(err => {
				window.console.log(err);
			});
		}
	}
</script>

<style>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
	}
</style>
