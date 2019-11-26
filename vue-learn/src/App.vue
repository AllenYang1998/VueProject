<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/test">Test</router-link>|
	  <router-link to="/test2">Test2</router-link>
    </div> -->
	<el-menu router
		 :default-active="$route.path" 
		 class="el-menu-demo" 
		 mode="horizontal"
		 background-color="#303133"
		 text-color="#fff"
		 active-text-color="#ffd04b"
		 theme="dark">  
	  <el-menu-item index="/">主页</el-menu-item>
	  <el-menu-item index="/test">列表</el-menu-item>
	  <el-menu-item index="/test2" v-show="!login">注册登录</el-menu-item>
	  <el-submenu  v-show="login">
	    <template slot="title">{{username}}</template>
		<el-menu-item>个人中心</el-menu-item>
		<el-menu-item index="/workaddress">实习地点</el-menu-item>
		<el-menu-item>房源收藏</el-menu-item>
	    <el-menu-item v-on:click="logout">退出</el-menu-item>
	  </el-submenu>
	</el-menu>
	<div style="margin-top: 15px;">
	  <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
	    <el-select v-model="city_name" slot="prepend" placeholder="请选择">
	      <el-option label="广州" value="广州"></el-option>
	      <el-option label="深圳" value="深圳"></el-option>
		  <el-option label="东莞" value="东莞"></el-option>
	    </el-select>
	    <el-button slot="append" icon="el-icon-search" @click="getWorkAddressList()"></el-button>
	  </el-input>
	</div>
	<br />
	<div>
	  <div v-for="(item, index) in text_workaddress">
		  <div @click="getWorkAdrress(item)">
			  {{ item.name }}|{{ item.address }}
		  </div>
	  </div>
	</div>
	<el-button type="primary" v-show="is_button">提交工作地点</el-button>
	{{ name }} {{address_name}}
    <router-view/>
  </div>
</template>

<script>
	export default{
		name:'app',
		data(){
			return{
				username:localStorage.username,
				login:false,
				loginstatus:'',
				name:localStorage.name,
				city_name:localStorage.city_name,
				search:'',
				address_name:localStorage.address_name,
				position:localStorage.position, //工作地点坐标
				text_workaddress:[],
				text_transport:[],
				is_name:false,
			}
		},
		watch:{
			loginstatus(){
				if(localStorage.username.length!=""){
					this.login=true;
				}else{
					this.login=false;
				}
			}
		},
		methods:{
			logout(event){
				this.username='';
				localStorage.username='';
				localStorage.JWT_TOKEN='';
				localStorage.address_name='';
				localStorage.position='';
				this.login=false;
				this.$router.push('/');
				location.reload();
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
					this.text_workaddress = res['results'];
					window.console.log(res['results']);
				}).catch(err => {
					window.console.log(err)
				})
				this.$jsonp('http://api.map.baidu.com/place/v2/search',{
					query:'交通设施',
					location: this.position,
					radius: '1000',
					ak: 'yEB3ABK1cIiDSGhYNMutGZwEfmW7QVPq',
					output:'json',
					tag: '地铁站,公交车站'
				})
				.then(res => {
					this.text_transport = res['results'];
					window.console.log(res['results']);
				}).catch(err => {
					window.console.log(err)
				})
			},	
			// 点击查询到的工作地点提示 获取工作地点坐标
			getWorkAdrress(val){
				this.$confirm('此操作将提交并保存工作地点, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.position = val['location']['lat']+','+val['location']['lng'];
					this.address_name = val['address'];
					this.name = val['name']
					localStorage.name = val['name'];
					localStorage.position = this.position;
					localStorage.address_name = this.address_name;
					this.text_workaddress = '';
					this.$jsonp('https://api.map.baidu.com/place/v2/search',{
						query:'交通设施',
						tag:'地铁站,公交车站,公交线路',
						location:this.position,
						ak: 'yEB3ABK1cIiDSGhYNMutGZwEfmW7QVPq',
						output:'json',
						radius:'1000',
					})
					.then(res => {
						window.console.log(res);
						// 向后台提交实习地点数据
						this.axios({
						url: this.server_url+'/api/user/workaddress',
						method: 'post',
						data: {
							name:val['name'],
							address:this.address_name,
							position:this.position,
							transport:res['results']
						},
						headers: {'Authorization': " JWT "+localStorage.JWT_TOKEN}
						}).then(res => {
							window.console.log('提交成功');
						}).catch(err => {
							this.tips = '提交失败';
							window.console.log(err);
						});
						location.reload();
					}).catch(err => {
						console.log(err)
					});
					this.$message({
					type: 'success',
					message: '提交成功!'
				});
					}).catch(() => {
						this.text_workaddress = '';
						this.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			}
		},
		created() {
			if(localStorage.username!=""){
				this.login=true;
			}else{
				this.login=false;
			}
			// 获取用户所在地
			this.$jsonp('https://api.map.baidu.com/location/ip',{
				ak: 'yEB3ABK1cIiDSGhYNMutGZwEfmW7QVPq',
			})
			.then(res => {
				localStorage.city_name = res['content']['address_detail']['city'].replace('市','');
				this.city_name = localStorage.city_name;
				window.console.log(res);
			}).catch(err => {
				console.log(err)
			})
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
</style>
