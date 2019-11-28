<template>
	<div id="test">
		<h3>Test Page</h3>
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
			}
		},
		// 监听
		watch:{
			city_name(){
				localStorage.city_name = this.city_name;
			},
		},
		methods:{
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
			this.axios({
				url: this.server_url+'/api/zufang/test/',
				method: 'post',
				data:{
					transport:localStorage.transport
				}
			}).then(res => {
				window.console.log(res);
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