<template>
	<div id="test">
		<h1>Test Page</h1>
		<el-select placeholder="请选择"  v-model="city_name">
			<el-option value ="广州">广州</el-option>
			<el-option value ="深圳">深圳</el-option>
		  </el-select>
		<form>
			<label for="search" >工作地点</label>
			<el-input id="search" v-model="search" clearable></el-input>
		</form>
		<br />
		<div>
		  <div v-for="(item, index) in text">
			  <div @click="getWorkAdrress(item.location)">
				  {{ item.address }}
			  </div>
		  </div>
		</div>
		{{work_address}}
		<br />
		<ZufangList msg="Hello,这是一个房源列表"/>
	</div>
</template>

<script>
// @ is an alias to /src
// import ZufangList from '@/src/components/ZufangList.vue'
import ZufangList from '../components/ZufangList.vue'
	export default{
		name:'test',
		components: {
		  ZufangList
		},
		data(){
			return{
				msg:'Hello this is a test page!',
				number:1,
				type:"news",
				city_name:localStorage.city_name,
				search:'',
				work_address:'', //工作地点坐标
				text:[],
			}
		},
		// 监听
		watch:{
			// 一旦工作地点搜索有信息输入请求百度地图API获取工作地点信息
			search(val){
				if(val!=null&&this.city_name!=null){
					this.$jsonp('https://api.map.baidu.com/place/v2/search',{
						query:this.search,
						region:this.city_name,
						ak: 'yEB3ABK1cIiDSGhYNMutGZwEfmW7QVPq',
						output:'json',
					})
					.then(res => {
						this.text = res['results'];
						window.console.log(res['results']);
					}).catch(err => {
						console.log(err)
					})
				}
				else{
					this.text = [];
				}
			},
			city_name(){
				localStorage.city_name = this.city_name;
			},
			work_address(){
				localStorage.work_address = this.work_address;
			}
		},
		methods:{
			// 点击查询到的工作地点提示 获取工作地点坐标
			getWorkAdrress(val){
				this.work_address = val['lat']+','+val['lng'];
				this.text = '';
				this.$jsonp('https://api.map.baidu.com/place/v2/search',{
					query:'交通设施',
					tag:'地铁站,公交车站,公交线路',
					location:this.work_address,
					ak: 'yEB3ABK1cIiDSGhYNMutGZwEfmW7QVPq',
					output:'json',
					radius:'1000',
				})
				.then(res => {
					window.console.log(res['results']);
				}).catch(err => {
					console.log(err)
				})
			},
		},
		// 计算用于一些简单的渲染，效率比method高 ，{{type_msg}}
		computed:{
			// 测试计算属性
			type_msg(){
				return this.type + this.msg
			},
		},
		// 页面初始化时进行的操作
		created() {
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

<style>
  .el-row {
    margin-bottom: 2px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>