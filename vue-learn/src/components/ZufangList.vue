<template>
	<div id="ZufangList">
		<h3>{{msg}}</h3>
		<el-row v-for="(fang, index) in zufanglist">
		  <el-col :span="24">
			  <div class="grid-content bg-purple-dark" @click="sendParams(fang.id)">
				<el-image
				    style="width: 100px; height: 100px"
				    :src="fang.img">
				</el-image>
				{{ fang.title }}
			  </div>
			  </el-col>
		</el-row>
		<button @click="getNext()">获得更多</button>
	</div>
</template>

<script>
	export default {
		name: 'ZufangList',
		props: {
			msg:String,
		},
		data(){
			return{
				zufanglist:[],
				next:'', //下一页
			}
		},
		methods:{
			// 获取更多租房信息
			getNext(){
				this.axios({
					url: this.next,
					method: 'get',
				}).then(res => {
					if(res['data']['next']==null){
						this.next = '没有更多了'
					}else{
						this.next = res['data']['next'];
					}
					this.zufanglist.push.apply(this.zufanglist, res['data']['results']);
					console.log(this.zufanglist);
					window.console.log(res);
				})
			},
			// 跳转到详细信息页面传递房源id
			sendParams(val){
				this.$router.push({
					path:'/test/:id',
					name:'detail',
					params:{
						id:val,
					}
				})
			},
	  },
	  // 页面初始化时进行的操作
	  created() {
	  	// 获得第一页的租房信息
	  	this.axios({
	  		url: 'http://127.0.0.1:8000/api/zufang/',
	  		params:{
	  			city_name: localStorage.city_name,
	  		},
	  		method: 'get',
	  	}).then(res => {
	  		this.zufanglist = res['data']['results'];
	  		this.next = res['data']['next'];
	  		console.log(this.zufanglist);
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
</style>