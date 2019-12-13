<template>
	<div id="require">
		<h3>个人需求</h3>
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
	</div>
</template>

<script>
	export default{
		name:'require',
		data(){
			return{
				ruleForm: {
					rent_method: '',
					price: '',
					transport_type: [],
				},
				rules: {
					transport_type: [
						{ type: 'array', message: '请至少选择一个活动性质', trigger: 'change' }
					],
				}
			}
		},
		methods:{
			submitForm(formName){
				window.console.log(this.ruleForm)
				this.axios({
					url: this.server_url+'/api/user/require/',
					data:this.ruleForm,
					headers: {'Authorization': this.Authorization_token},
					method: 'post',
				}).then(res => {
					window.console.log(res)
				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		created() {
			this.axios({
				url: this.server_url+'/api/user/require/',
				headers: {'Authorization': this.Authorization_token},
				method: 'get',
			}).then(res => {
				this.ruleForm.price = res['data'][0]['price'];
				this.ruleForm.rent_method = res['data'][0]['rent_method'];
				this.ruleForm.transport_type = res['data'][0]['transport_type'].split(';');
				window.console.log(res['data'][0])
			})
		}
	}
</script>

<style>
	
</style>
