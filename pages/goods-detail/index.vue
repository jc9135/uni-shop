<template>
	<view class="goods_detail">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsDetils:[]
			}
		},
		onLoad(options) {
			this.getGoods(options.id)
		},
		filters: {
			formatDate(date) {
				const nDate = new Date(date);
				const y = nDate.getFullYear();
				const m = nDate.getMonth().toString().padStart(2, 0);
				const d = nDate.getDay().toString().padStart(2, 0);
				return y + '-' + m + '-' + d
			}
		},
		methods: {
			async getGoods(newid) {
				const {
					data: res
				} = await this.$myRquest({
					url: `/api/getnew/${newid}`
				})
				this.goodsDetils= res.message;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.goods_detail {
	}
</style>
