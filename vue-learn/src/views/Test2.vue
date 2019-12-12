<template>
	<div id="test2">
		<v-touch v-touch:swipeleft="onSwipeLeft"  v-touch:SwipeRight="onSwipeRight">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="登陆" name="first">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="账号">
						<el-input v-model="loginForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="loginForm.password" type="password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getInfo">登陆</el-button>
					</el-form-item>
				</el-form>
				<br />
				{{tips}}
			</el-tab-pane>
			<el-tab-pane label="注册" name="second">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="账号">
						<el-input v-model="registerForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="registerForm.password" type="password"></el-input>
					</el-form-item>
					<el-form-item label="确认密码">
						<el-input v-model="rpassword" type="password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="postInfo()">注册</el-button>
					</el-form-item>
				</el-form>
				<br />
				{{tips}}
			</el-tab-pane>
		</el-tabs>
		</v-touch>
	</div>
</template>

<script>
	export default{
		name:'test2',
		data(){
			return{
				activeName: 'first',
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
			onSwipeLeft(){
				this.activeName='first'
			},
			onSwipeRight(){
				this.activeName='second'
			},
			set(key, value, expired) {
			    /*
			    * set 存储方法
			    * @ param {String}     key 键
			    * @ param {String}     value 值，
			    * @ param {String}     expired 过期时间，以分钟为单位，非必须
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
				url: this.server_url+'/api/token/',
				method: 'post',
				data: this.loginForm,
				}).then(res => {
					sessionStorage.JWT_TOKEN = res['data']['token'];
					sessionStorage.username = this.loginForm.username;
					this.token = res['data']; 
					window.console.log(res);
					this.$router.push('/');
					location.reload();
				}).catch(err => {
					this.tips = '登陆失败';
					window.console.log(err);
				})
			},
			// 注册
			postInfo(){
				this.axios({
				url: this.server_url+'/api/user/register/',
				method: 'post',
				data: this.registerForm,
				}).then(res => {
					window.console.log(res);
					window.console.log(this.registerForm);
					window.console.log("注册成功");
					this.msg=0;
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
