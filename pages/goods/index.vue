<template>
	<view class="goods_list">
		<goods-list :goodsList="goodsList"></goods-list>
		<view class="isOver" v-if="!hasMore">------我是有底线的------</view>
	</view>
</template>

<script>
	import goodsList from '../../compontents/goods-list/goods-list.vue'
	export default {
		components: {
			goodsList
		},
		data(){
			return {
				pageindex:1,
				goodsList:[],
				hasMore:true
			}
		},
		onLoad() {
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(callBack) {
				const {
					data: res
				} = await this.$myRquest({
					url: `/api/getgoods?pageindex=${this.pageindex}`
				})
				if(res.message.length ===0 ){
					this.hasMore = false;
					return;
				}
				callBack && callBack();
				this.goodsList = [...this.goodsList,...res.message];
			},
		},
		onReachBottom() {
			if(this.hasMore){
				this.pageindex++;
				this.getGoodsList();
			}
		},
		onPullDownRefresh() {
			this.pageindex = 1;
			this.goodsList = [];
			this.hasMore = true;
			setTimeout(()=>{
				this.getGoodsList(()=>{
					uni.stopPullDownRefresh()
				})
			},100)
		}
	}
</script>

<style>
	.goods_list {
		background-color: #fafafa;
	}
	.isOver {
		text-align: center;
		padding: 30rpx;
	}
</style>
