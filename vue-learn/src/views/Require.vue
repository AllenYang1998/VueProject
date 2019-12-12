<template>
	<div id="require">
		<h3>个人需求</h3>
		<el-radio v-model="radio" label="1">整租</el-radio>
		<el-radio v-model="radio" label="2">合租</el-radio>
		<el-radio v-model="radio" label="3">不在意</el-radio>
		<p>价格条件</p>
		<el-slider
			style="padding-left: 120px;padding-right: 120px;"
			v-model="value"
			show-input 
			:max=3000 
			:step=100>
		</el-slider>
		<p>上班方式</p>
		<template>
		  <el-checkbox v-model="checked1">走路</el-checkbox>
		  <el-checkbox v-model="checked2">骑车</el-checkbox>
		  <el-checkbox v-model="checked3">公交</el-checkbox>
		  <el-checkbox v-model="checked4">地铁</el-checkbox>
		</template>
	</div>
</template>

<script>
	export default{
		name:'require',
		data(){
			return{
				radio: '1',
				value: 0,
				checked1: true,
				checked2: true,
				checked3: true,
				checked4: true,
			}
		}
	}
</script>

<style>
	
</style>
