<template>
	<div id="workaddress">
		<h3>实习地点</h3>
		<!--
		<div v-for="(item, index) in workaddresslist">
			<div style="width:90%; height:auto; display:inline">
				<el-collapse>
					<el-collapse-item :name="index" :title="item.address">
						<div>附件的地铁口/公交车站</div>
						<div v-for="(item1, index) in item.transport">
							<hr />
							{{item1.name}}|{{item1.address}}
						</div>
					</el-collapse-item> 
				</el-collapse>
			</div>
		</div>
		-->
		<!-- <el-card class="box-card" v-for="(item, index) in workaddresslist" style="float: left;width: auto; height: auto;">
		  <div slot="header" class="clearfix">
		    <span>{{item.address}}</span>
		    <el-button style="float: right; padding: 3px 0" type="text">选为工作地点</el-button>
		  </div>
		  <div>附件的地铁口/公交车站</div>
		  <div v-for="(item1, index) in item.transport">
		  	{{item1.name}}|{{item1.address}}
		  </div>
		</el-card> -->
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
				// workaddresslist:[],
				tableData:{}
			}
		},
		methods:{
			setWorkAddress(index, row) {
				localStorage.name = row['name'];
				localStorage.position = row['position'];
				localStorage.address_name = row['address'];
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
				headers: {'Authorization': " JWT "+localStorage.JWT_TOKEN}
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
			headers: {'Authorization': " JWT "+localStorage.JWT_TOKEN}
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
