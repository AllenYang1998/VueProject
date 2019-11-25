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
	  <el-submenu index="2">
	    <template slot="title">我的工作台</template>
	    <el-menu-item index="2-1">选项1</el-menu-item>
	    <el-menu-item index="2-2">选项2</el-menu-item>
	    <el-menu-item index="2-3">选项3</el-menu-item>
	    <el-submenu index="2-4">
	      <template slot="title">选项4</template>
	      <el-menu-item index="2-4-1">选项1</el-menu-item>
	      <el-menu-item index="2-4-2">选项2</el-menu-item>
	      <el-menu-item index="2-4-3">选项3</el-menu-item>
	    </el-submenu>
	  </el-submenu>
	  <el-menu-item index="3" disabled>消息中心</el-menu-item>
	  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
	  <el-menu-item index="/test">列表</el-menu-item>
	  <el-menu-item index="/test2" v-show="!login">注册登录</el-menu-item>
	  <el-submenu  v-show="login">
	    <template slot="title">{{username}}</template>
		<el-menu-item>个人中心</el-menu-item>
		<el-menu-item>实习地点</el-menu-item>
		<el-menu-item>房源收藏</el-menu-item>
	    <el-menu-item v-on:click="logout">退出</el-menu-item>
	  </el-submenu>
	</el-menu>
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
				location.reload();
			}
		},
		created() {
			if(localStorage.username!=""){
				this.login=true;
			}else{
				this.login=false;
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
</style>
