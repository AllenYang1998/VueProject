<template>
	<div id="test2">
		<div class="tab-tit">
			<a href="javascript:;" @click="msg=0" :class="{'cur':msg===0}">登陆</a> |
			<a href="javascript:;" @click="msg=1" :class="{'cur':msg===1}">注册</a>
		</div>
		<!--根据msg的值显示div,如果msg等于0，第一个div显示，其它三个div不显示。
			如果msg等于1，第二个div显示，其它三个div不显示。以此类推-->
		<div class="tab-con">
			<div v-show="msg===0">
				<p>登陆</p>
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="账号">
						<el-input v-model="loginForm.username"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="loginForm.password" type="password"></el-input>
					</el-form-item>
					<el-form-item>
					    <el-button type="primary" @click="getInfo">登陆</el-button>
						<el-button type="primary" @click="msg=1">注册</el-button>
					</el-form-item>
				</el-form>
				<br />
				{{tips}}
			</div>
			<div v-show="msg===1">
				<p>注册</p>
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
					    <el-button type="primary" @click="msg=0">登陆</el-button>
						<el-button type="primary" @click="postInfo()">注册</el-button>
					</el-form-item>
				</el-form>
				<br />
				{{tips}}
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
