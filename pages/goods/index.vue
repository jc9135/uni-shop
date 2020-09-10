<template>
	<view>
		<goods-list :goodsList="goodsList"></goods-list>
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
				goodsList:[]
			}
		},
		onLoad() {
			this.getGoodsList()
		},
		methods: {
			async getGoodsList() {
				const {
					data: res
				} = await this.$myRquest({
					url: `/api/getgoods?pageindex=${this.pageindex}`
				})
				console.log(res)
				this.goodsList = res.message;
			},
		},
		onReachBottom() {
			console.log(111)
		}
	}
</script>

<style>
</style>
