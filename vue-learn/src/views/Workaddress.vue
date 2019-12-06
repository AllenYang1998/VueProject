<template>
	<div id="workaddress">
		<h3>实习地点</h3>
		<el-table 
			:data="tableData">
			<el-table-column
				prop="name"
				label="公司"
				width="180">
			</el-table-column>
			<el-table-column
				prop="address"
				label="地址"
				width="400">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
					size="mini"
					type="danger"
					@click="setWorkAddress(scope.$index, scope.row)">设为工作地点</el-button>
					<el-button
					size="mini"
					type="danger"
					@click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		name:'workaddress',
		data(){
			return{
				tableData:{}
			}
		},
		methods:{
			setWorkAddress(index, row) {
				localStorage.name = row['name'];
				localStorage.position = row['position'];
				localStorage.address_name = row['address'];
				localStorage.transport = row['transport'];
				localStorage.city_name = row['city_name']
				// console.log(index, row);
				location.reload();
			},
			handleDelete(index, row) {
				// console.log(index, row);
				this.axios({
				url: this.server_url+'/api/user/workaddress',
				method: 'delete',
				data:{
					id:row['id']
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
			url: this.server_url+'/api/user/workaddress',
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
