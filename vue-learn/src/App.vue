<template>
  <div id="app">
	<el-container>
		<el-header>
			<el-menu router
				:default-active="$route.path" 
				class="el-menu-demo" 
				mode="horizontal"
				background-color="#303133"
				text-color="#fff"
				active-text-color="#ffd04b"
				theme="dark">  
				<el-submenu index='/city_name'>
					<template slot="title" v-if="!city_name">请选择城市</template>
					<template slot="title" v-if="city_name">{{city_name}}</template>
					<el-menu-item v-for="item in city_list" :value="item.city_name" v-on:click="changeCity(item.city_name)">{{item.city_name}}</el-menu-item>
				</el-submenu>
				<el-menu-item index="/">主页</el-menu-item>
				<el-menu-item index="/test" v-show="is_login">租房推荐</el-menu-item>
				<el-menu-item index="/test2" v-show="!is_login">注册登录</el-menu-item>
				<el-submenu  v-show="is_login" index='user'>
					<template slot="title">{{username}}</template>
					<!-- <el-menu-item index="/require">租房需求</el-menu-item> -->
					<el-menu-item index="/work">个人信息管理</el-menu-item>
					<!-- <el-menu-item index="/star">房源收藏</el-menu-item> -->
					<el-menu-item v-on:click="logout" index="/test2">退出</el-menu-item>
				</el-submenu>
				<el-menu-item v-if="!name">暂无工作地点</el-menu-item>
				<el-menu-item v-if="name">{{name}}</el-menu-item>
				<!-- <el-submenu  v-show="is_login" index='/workaddress'>
					<template slot="title" v-if="!name">请选择工作地点</template>
					<template slot="title" v-if="name">{{name}}</template>
					<el-menu-item v-for="item in user_workaddress" :value="item.name" v-on:click="changeWork(item)">{{item.name}}</el-menu-item>
				</el-submenu> -->
			</el-menu>
		</el-header>
		<el-main>
			<div class="padding">
				<router-view/>
			</div>
		</el-main>
		<el-footer>
			Copyright © 杨铠安, 2020.
		</el-footer>
	</el-container>
  </div>
</template>

<script>
	export default{
		name:'app',
		data(){
			return{
				username:sessionStorage.username,
				name:localStorage.name,
				city_name:localStorage.city_name,
				address_name:localStorage.address_name,
				position:localStorage.position, //工作地点坐标
				// search_workaddress:[],
				text_transport:[],
				is_name:false,
				user_workaddress:[],
				city_list:[],
			}
		},
		computed:{
			is_login(){
				return sessionStorage.getItem("username");
			}
		},
		watch:{
			city_name(){
				localStorage.city_name = this.city_name;
			}
		},
		methods:{
			//切换城市、
			changeCity(val){
				this.city_name = val;
				location.reload();
			},
			//切换工作地点、
			changeWork(val){
				this.name = val.name;
				localStorage.name = this.name;
				localStorage.transport = val.transport;
				localStorage.workaddress = val.address;
				this.city_name = val.city_name;
				localStorage.city_name = val.city_name;
				this.area_name_1 = val.area_name_1;
				localStorage.area_name_1 = this.area_name_1;
				this.position = val.position;
				localStorage.position = this.position;
				location.reload();
			},
			logout(event){
				this.username='';
				sessionStorage.removeItem('username');
				sessionStorage.removeItem('JWT_TOKEN');
				localStorage.name='';
				localStorage.address_name='';
				localStorage.position='';
				localStorage.transport='';
				this.address_name='';
				this.user_workaddress=[];
				this.login=false;
				this.name='';
				this.$router.push('/');
				localStorage.clear();
				sessionStorage.clear();
				location.reload();
			},
		},
		created() {
			if(localStorage.city_list){
				//window.console.log('本地存储的地区列表加载成功');
				// JSON.parse() 解析JSON成字符串
				this.city_list = JSON.parse(localStorage.city_list);
			}else{
				// 获得城市名
				this.axios({
				url: this.server_url+'/api/zufang/city/',
				method: 'get',
				}).then(res => {
					this.city_list = res['data'];
					// 将结果进行序列化进行存储
					localStorage.city_list = JSON.stringify(res['data']);
					//window.console.log('地区列表缓存成功');
					window.console.log(res['data']);
				}).catch(err => {
					window.console.log('地区列表获取失败');
				});
			}
			// 用户工作地点
			// 判断是否已经登录
			if(sessionStorage.JWT_TOKEN){
				/*
				if(!localStorage.user_workaddress){
					this.axios({
					url: this.server_url+'/api/user/workaddress/',
					method: 'get',
					headers: {'Authorization': this.Authorization_token}
					}).then(res => {
						this.user_workaddress = res['data'];
						localStorage.user_workaddress = JSON.stringify(res['data']);
					}).catch(err => {
						window.console.log(err);
					});
				}else{
					window.console.log('加载本地工作信息数据');
					this.user_workaddress = JSON.parse(localStorage.user_workaddress);
				}
				*/
				/*
				this.axios({
					url: this.server_url+'/api/user/require/',
					headers: {'Authorization': this.Authorization_token},
					method: 'get',
				}).then(res => {
					localStorage.price = res['data'][0]['price'];
					localStorage.rent_method = res['data'][0]['rent_method'];
					localStorage.transport_type = res['data'][0]['transport_type'].split(';');
				})
				*/
				if(!localStorage.ruleForm){
					window.console.log('请求用户租房需求数据');
					this.axios({
					url: this.server_url+'/api/user/require/',
					headers: {'Authorization': this.Authorization_token},
					method: 'get',
				}).then(res => {
						localStorage.price = res['data'][0]['price'];
						localStorage.rent_method = res['data'][0]['rent_method'];
						localStorage.transport_type = res['data'][0]['transport_type'].split(';');
						// 添加用户需求缓存
						var r = res;
						r['data'][0]['transport_type'] = r['data'][0]['transport_type'].split(';');
						localStorage.ruleForm = JSON.stringify(r['data'][0]);
					})
				}else{
					window.console.log('加载本地请求用户租房需求数据');
					// 加载本地请求用户租房需求数据
					var ruleForm = JSON.parse(localStorage.ruleForm);
					localStorage.price = ruleForm['price'];
					localStorage.rent_method = ruleForm['rent_method'];
					localStorage.transport_type = ruleForm['transport_type'];
				}
			}
		}
	}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
div.padding
{
	// padding-top:25px;
	// padding-bottom:25px;
	padding-right:20%;
	padding-left:20%;
}
el-footer
{
	width: 100%;
	position: absolute;
	bottom: 0;
	// margin-top: -100px;
}
	
</style>
