<template>
	<div id="work">
		<h3>用户个人信息管理</h3>
		<el-collapse>
		  <el-collapse-item title="实习地点管理" name="1">
			<!--工作搜索表单-->
			<el-input placeholder="添加实习地点" v-model="search" class="input-with-select">
				<el-select v-model="city_name" slot="prepend" placeholder="请选择">
					<el-option v-for="item in city_list" :label="item.city_name" :value="item.city_name"></el-option>
				</el-select>
				<el-button slot="append" icon="el-icon-search" @click="getWorkAddressList()"></el-button>
			</el-input>
			<!-- 工作选择对话框 -->
			<el-dialog title="选择实习地点" :visible.sync="dialogVisible">
			  <el-table :data="search_workaddress">
				  <el-table-column label="操作">
				  	<template slot-scope="scope1">
				  		<el-button
				  		size="mini"
				  		type="danger"
				  		@click="getWorkAdrress(scope1.$index, scope1.row)">添加</el-button>
				  	</template>
				  </el-table-column>
			    <el-table-column property="name" label="公司" width="100"></el-table-column>
			    <el-table-column property="address" label="地址" width="150"></el-table-column>
			    <el-table-column property="city" label="城市"></el-table-column>
				<el-table-column property="area" label="地区"></el-table-column>
			  </el-table>
			</el-dialog>
			
			<!-- 个人工作管理表格 -->
			<el-table :data="user_workaddress" style="width: 100%">
				<el-table-column prop="name" label="公司" width="180"></el-table-column>
				<el-table-column prop="address" label="地址" width="180"></el-table-column>
				<el-table-column prop="city_name" label="城市" width="180"></el-table-column>
				<el-table-column prop="area_name_1" label="地区" width="180"></el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="setWorkAddress(scope.$index, scope.row)">设为地点</el-button>
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		  </el-collapse-item>
		  
		  <!-- 个人租房收藏管理 -->
		  <el-collapse-item title="租房收藏管理" name="2">
		    <el-table
		    	:data="starTableData"
				style="width: 100%">
		    	<el-table-column prop="title" label="标题" width="180"></el-table-column>
		    	<el-table-column prop="price" label="月租" width="180"></el-table-column>
		    	<el-table-column prop="area_name_1" label="区域" width="180"></el-table-column>
		    	<el-table-column prop="area_name_2" label="村" width="180"></el-table-column>
		    	<el-table-column label="操作" width="180">
		    		<template slot-scope="scope2">
		    			<el-button size="mini" type="danger" @click="sendParams(scope2.$index, scope2.row)">查看</el-button>
		    			<el-button size="mini" type="danger" @click="handleDelete1(scope2.$index, scope2.row)">取消收藏</el-button>
		    		</template>
		    	</el-table-column>
		    </el-table>
		  </el-collapse-item>
		  
		  <!-- 个人租房需求管理 -->
		 <el-collapse-item title="租房需求管理" name="4">
		    <el-form el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
		    	<el-form-item label="价格条件" 
		    		:rules="[
		    		  { type: 'number', message: '年龄必须为数字值'}
		    		]"
		    		prop="price">
		    		<el-input type="age" v-model.number="ruleForm.price" autocomplete="off"></el-input>
		    	</el-form-item>
		    	<el-form-item label="上班方式" prop="type">
		    		<el-checkbox-group v-model="ruleForm.transport_type">
		    			<el-checkbox label="走路" name="transport_type"></el-checkbox>
		    			<el-checkbox label="骑车" name="transport_type"></el-checkbox>
		    			<el-checkbox label="公交" name="transport_type"></el-checkbox>
		    			<el-checkbox label="地铁" name="transport_type"></el-checkbox>
		    		</el-checkbox-group>
		    	</el-form-item>
		    	<el-form-item label="生活方式" prop="rent_method">
		    		<el-radio-group v-model="ruleForm.rent_method">
		    			<el-radio label="整租"></el-radio>
		    			<el-radio label="合租"></el-radio>
		    			<el-radio label="不在意"></el-radio>
		    		</el-radio-group>
		    	</el-form-item>
		    	<el-form-item>
		    		<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
		    		<el-button @click="resetForm('ruleForm')">重置</el-button>
		    	</el-form-item>
		    </el-form>
		  </el-collapse-item>
		  
		</el-collapse>
	</div>
</template>

<script>
	export default{
		name:'work',
		data(){
			return{
				name:localStorage.name,
				city_name:localStorage.city_name,
				workaddress:localStorage.workaddress,
				area_name_1:localStorage.area_name_1,
				position:localStorage.position, //工作地点坐标
				bustransport:{},
				
				city_name:localStorage.city_name,
				city_list:JSON.parse(localStorage.city_list),
				search:'',
				dialogVisible: false,
				search_workaddress:[],
				position:localStorage.position,
				
				user_workaddress:JSON.parse(localStorage.user_workaddress),
				starTableData:[],
				
				// 租房需求数据
				ruleForm: {
					rent_method: '',
					price: '',
					transport_type: [],
				},
				rules: {
					transport_type: [
						{ type: 'array', message: '请至少选择一个活动性质', trigger: 'change' }
					],
				},
			}
		},
		methods:{
			// 设定实习工作地点
			setWorkAddress(index, row) {
				localStorage.name = row['name'];
				localStorage.position = row['position'];
				localStorage.workaddress = row['address'];
				localStorage.transport = row['transport'];
				localStorage.city_name = row['city_name'];
				localStorage.area_name_1 = row['area_name_1'];
				location.reload();
			},
			// 删除指定实习工作地点
			handleDelete(index, row) {
				this.axios({
				url: this.server_url+'/api/user/workaddress',
				method: 'delete',
				data:{
					id:row['id']
				},
				headers: {'Authorization': this.Authorization_token}
				}).then(res => {
					this.user_workaddress.splice(index,1);
					localStorage.user_workaddress = JSON.stringify(this.user_workaddress);
					// localStorage.removeItem("name"); 
				}).catch(err => {
					window.console.log(err);
				});
			},
			// 获得工作地点坐标
			getWorkAddressList(){
				this.$jsonp('https://api.map.baidu.com/place/v2/search',{
					query:this.search,
					region:this.city_name,
					ak: 'yEB3ABK1cIiDSGhYNMutGZwEfmW7QVPq',
					output:'json',
				})
				.then(res => {
					// 弹出工作地点选择对话框
					this.dialogVisible = true;
					this.search_workaddress = res['results'];
					window.console.log(res);
				}).catch(err => {
					window.console.log(err)
				})
			},
			// 获取工作地点附近交通信息
			getWorkAdrress(index, row){
				
				// 获取工作地点附件的站
				this.name = row['name'];
				this.position = row['location']['lat']+','+row['location']['lng'];
				this.workaddress = row['address'];
				this.transport = row['transport'];
				this.city_name = row['city'].replace('市','');
				this.area_name_1 = row['area'];
				
				localStorage.position = this.position;
				localStorage.workaddress = this.workaddress;
				localStorage.name = this.name;
				localStorage.area_name_1 = this.area_name_1;
				localStorage.city_name = this.city_name;
				// 获取公交信息
				this.$jsonp('https://api.map.baidu.com/place/v2/search',{
					query:' ',
					tag:'公交',
					location:this.position,
					ak: 'yEB3ABK1cIiDSGhYNMutGZwEfmW7QVPq',
					output:'json',
					radius:'800',
				})
				.then(res => {
					this.bustransport = res;
				}).catch(err => {
					console.log(err)
				});
				// 获取地铁信息
				this.$jsonp('https://api.map.baidu.com/place/v2/search',{
					query:' ',
					// tag:'地铁,公交,brt',
					tag:'地铁',
					location:this.position,
					ak: 'yEB3ABK1cIiDSGhYNMutGZwEfmW7QVPq',
					output:'json',
					radius:'800',
				})
				.then(res => {
					// this.subwaytransport = res;
					// 公交车+地铁交通信息
					this.bustransport['results'] = this.bustransport['results'].concat(res['results']);
					window.console.log(this.bustransport);
					this.axios({
					url: this.server_url+'/api/user/workaddress/',
					method: 'post',
					data: {
						
						name:localStorage.name,
						address:localStorage.workaddress,
						position:localStorage.position,
						area_name_1:localStorage.area_name_1,
						// 注意res是一个对象，不知道为什么直接传到后台就变成str
						transport:JSON.stringify(this.bustransport),
						city_name:localStorage.city_name,
						
					},
					headers: {'Authorization': " JWT "+sessionStorage.JWT_TOKEN}
					}).then(res => {
						this.user_workaddress = res['data'];
						localStorage.user_workaddress = JSON.stringify(res['data']);
						this.dialogVisible=false;
						window.console.log('提交成功');
					}).catch(err => {
						this.tips = '提交失败';
						window.console.log('用户工作信息提交失败');
					});
				}).catch(err => {
					console.log(err)
				})
			},
			
			

				
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
			// 删除租房收藏
			handleDelete1(index, row) {
				console.log(index, row);
				this.axios({
				url: this.server_url+'/api/user/star/',
				method: 'delete',
				data:{
					zufang_id:row['id']
				},
				headers: {'Authorization': this.Authorization_token}
				}).then(res => {
					this.starTableData.splice(index,1);
					localStorage.starTableData = JSON.stringify(this.starTableData);
					// window.console.log(res);
				}).catch(err => {
					window.console.log('收藏删除失败');
				});
			},
			
			
			
			
			//租房需求管理模块
			submitForm(formName){
				window.console.log(this.ruleForm)
				this.axios({
					url: this.server_url+'/api/user/require/',
					data:this.ruleForm,
					headers: {'Authorization': this.Authorization_token},
					method: 'post',
				}).then(res => {
					this.ruleForm = JSON.parse(res['config']['data']);
					localStorage.ruleForm = res['config']['data'];
					localStorage.price = this.ruleForm['price'];
					localStorage.rent_method = this.ruleForm['rent_method'];
					localStorage.transport_type = this.ruleForm['transport_type'];
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
			
		},
		watch:{
			city_name(){
				localStorage.city_name = this.city_name;
			}
		},
		created() {
			
			// 获取用户租房收藏
			if(!localStorage.starTableData){
				this.axios({
				url: this.server_url+'/api/user/star/',
				method: 'get',
				headers: {'Authorization': this.Authorization_token}
				}).then(res => {
					this.starTableData=res['data'];
					localStorage.starTableData = JSON.stringify(res['data']);
				}).catch(err => {
					window.console.log('获取用户租房收藏失败');
				});
			}else{
				this.starTableData = JSON.parse(localStorage.starTableData)
			}
			
			
			// 需求数据获取
			if(!localStorage.ruleForm){
				window.console.log('请求用户租房需求数据');
				this.axios({
					url: this.server_url+'/api/user/require/',
					headers: {'Authorization': this.Authorization_token},
					method: 'get',
				}).then(res => {
					var r = res;
					r['data'][0]['transport_type'] = r['data'][0]['transport_type'].split(';');
					this.ruleForm.price = r['data'][0]['price'];
					this.ruleForm.rent_method = r['data'][0]['rent_method'];
					this.ruleForm.transport_type = r['data'][0]['transport_type'];
					localStorage.price = res['data'][0]['price'];
					localStorage.rent_method = res['data'][0]['rent_method'];
					localStorage.transport_type = res['data'][0]['transport_type'];
					localStorage.ruleForm = JSON.stringify(r['data'][0]);
				});
			}else{
				window.console.log('加载本地请求用户租房需求数据');
				var ruleForm = JSON.parse(localStorage.ruleForm);
				this.ruleForm.price = ruleForm['price'];
				this.ruleForm.rent_method = ruleForm['rent_method'];
				this.ruleForm.transport_type = ruleForm['transport_type'];
				localStorage.price = ruleForm['price'];
				localStorage.rent_method = ruleForm['rent_method'];
				localStorage.transport_type = ruleForm['transport_type'];
			}
		}
	}
</script>


