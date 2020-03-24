<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<el-tabs v-model="activeName">
			<el-tab-pane label="整租平均价" name="first">
				<el-table
					:data="zhengzu"
					style="width: 100%">
					<el-table-column prop="city_name" label="城市" width="140"></el-table-column>
					<el-table-column prop="area_name_1" label="地区" width="140"></el-table-column>
					<el-table-column prop="count" label="房源数量" width="140"></el-table-column>
					<el-table-column prop="avg_price" label="平均价格" width="140"></el-table-column>
				</el-table>
			</el-tab-pane>
			<el-tab-pane label="合租平均价" name="second">
				<el-table
					:data="hezu"
					style="width: 100%">
					<el-table-column prop="city_name" label="城市" width="140"></el-table-column>
					<el-table-column prop="area_name_1" label="地区" width="140"></el-table-column>
					<el-table-column prop="count" label="房源数量" width="140"></el-table-column>
					<el-table-column prop="avg_price" label="平均价格" width="140"></el-table-column>
				</el-table>
			</el-tab-pane>
		</el-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
		  return{
			  activeName: 'first',
			  hezu:[],
			  zhengzu:[],
		  }
	  },
  methods:{
	},
  created() {
  	// 获取整租平均价
  	this.axios({
  	url: this.server_url+'/api/zufang/avg/',
  	method: 'post',
  	data:{
  		city_name: localStorage.city_name,
  		rent_method: '整租'
  	},
  	}).then(res => {
  		this.zhengzu = res['data'];
  	}).catch(err => {
  		window.console.log('地区租房平均价获取失败');
  	});
  	
  	// 获取合租平均价
  	this.axios({
  	url: this.server_url+'/api/zufang/avg/',
  	method: 'post',
  	data:{
  		city_name: localStorage.city_name,
  		rent_method: '合租'
  	},
  	}).then(res => {
  		// window.console.log(res['data']);
		this.hezu = res['data'];
  	}).catch(err => {
  		window.console.log('地区租房平均价获取失败');
  	});
  }
}
</script>
