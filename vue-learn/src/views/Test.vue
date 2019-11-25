<template>
	<div id="test">
		<h1>Test Page</h1>
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
				  {{ item.address }}
			  </div>
		  </div>
		</div>
		{{address}} {{position}} <el-button type="primary" v-show="is_button">提交工作地点</el-button>
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
				address_name:localStorage.address_name,
				position:localStorage.position, //工作地点坐标
				text_workaddress:[],
				text_transport:[],
			}
		},
		// 监听
		watch:{
			city_name(){
				localStorage.city_name = this.city_name;
			},
		},
		methods:{
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
				this.position = val['location']['lat']+','+val['location']['lng'];
				this.address_name = val['address'];
				localStorage.position = this.position;
				localStorage.address_name = this.address_name;
				this.text = '';
				this.$jsonp('https://api.map.baidu.com/place/v2/search',{
					query:'交通设施',
					tag:'地铁站,公交车站,公交线路',
					location:this.position,
					ak: 'yEB3ABK1cIiDSGhYNMutGZwEfmW7QVPq',
					output:'json',
					radius:'1000',
				})
				.then(res => {
					for(var i=0;i<res['results'].length;i++)
					{
						if(res['results'][i]['address'].indexOf("夜") != -1)
						{
							// 删除夜路
							// window.console.log(res['results'][i]); 打印非夜路
							res['results'].splice(i,1)
						}
					}
					window.console.log(res['results']);
				}).catch(err => {
					console.log(err)
				});
				this.$confirm('此操作将提交并保存工作地点, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
				  this.$message({
					type: 'success',
					message: '删除成功!'
				});
					}).catch(() => {
						this.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
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
  .el-select .el-input {
      width: 130px;
  }
  .input-with-select .el-input-group__prepend {
	background-color: #fff;
  }
</style>