<template>
	<div id="test2">
		注册登陆界面
		<!--
		<div id="nav">
		  <router-link to="/test2/login">登陆</router-link>|
		  <router-link to="/test2/register">注册</router-link>
		</div>
		<router-view/>
		-->
		<div class="tab-tit">
			<a href="javascript:;" @click="msg=0" :class="{'cur':msg===0}">登陆</a> |
			<a href="javascript:;" @click="msg=1" :class="{'cur':msg===1}">注册</a>
		</div>
		<!--根据msg的值显示div,如果msg等于0，第一个div显示，其它三个div不显示。
			如果msg等于1，第二个div显示，其它三个div不显示。以此类推-->
		<div class="tab-con">
			<div v-show="msg===0">
				<p>登陆</p>
				<form>
					账 号：<input v-model="loginForm.username"/><br />
					密 码：<input type="password" v-model="loginForm.password"/>
				</form>
				<button @click="getInfo()">登陆</button>
				<br />
				{{tips}}
			</div>
			<div v-show="msg===1">
				<p>注册</p>
				<form>
					账   号：<input v-model="registerForm.username"/><br />
					密   码：<input type="password" v-model="registerForm.password"/><br />
					确认密码：<input type="password" v-model="rpassword"/>
					{{tips}}
				</form>
				<button id="register" @click="postInfo()" v-show="registerButton">注册</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'test2',
		data(){
			return{
				msg:0,
				loginForm: {
					username: '',
					password: '',
				},
				token:'',
				registerForm: {
					username: '',
					password: '',
				},
				rpassword:'',
				registerButton:false,
				tips:'',
			}
		},
		watch:{
			rpassword(){
				if(this.registerForm['password']!=this.rpassword){
					this.registerButton = false;
					this.tips = '密码不一致';
				}
				else{
					this.tips = '';
				}
				if(this.registerForm['password']==this.rpassword&&this.registerForm.username!=null){
					this.registerButton = true;
				}
			},
		},
		methods:{
			set(key, value, expired) {
			    /*
			    * set 存储方法
			    * @ param {String}     key 键
			    * @ param {String}     value 值，
			    * @ param {String}     expired 过期时间，以分钟为单位，非必须
			    * @ 由@IT·平头哥联盟-首席填坑官∙苏南 分享,交流：912594095
			    */
			    let source = this.source;
			    source[key] = JSON.stringify(value);
			    if (expired){
			        source[`${key}__expires__`] = Date.now() + 1000*60*expired
			    };
			    return value;
			},
			// 登陆获取Token
			getInfo(){
				this.axios({
				url: 'http://127.0.0.1:8000/api/token/',
				method: 'post',
				data: this.loginForm,
				}).then(res => {
					location.reload();
					localStorage.JWT_TOKEN = res['data']['token'];
					localStorage.username = this.loginForm.username;
					this.token = res['data']; 
					window.console.log(res);
				}).catch(err => {
					this.tips = '登陆失败';
					window.console.log(err);
				})
			},
			// 注册
			postInfo(){
				this.axios({
				url: 'http://127.0.0.1:8000/api/user/register',
				method: 'post',
				data: this.registerForm,
				}).then(res => {
					window.console.log(res);
					window.console.log(this.registerForm);
					window.console.log("注册成功");
				}).catch(err => {
					this.tips = '注册失败';
					window.console.log("注册失败");
				})
			}	
		},
	}
</script>

<style>
</style>
