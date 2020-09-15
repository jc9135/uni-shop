<template>
	<view class="news_detail">
		<text class="title">{{newsDetils[0].title}}</text>
		<view class="info">
			<text>发表时间：{{newsDetils[0].add_time |formatDate}}</text>
			<text>浏览：{{newsDetils[0].click}}次</text>
		</view>
		<view class="content">
			<rich-text :nodes="newsDetils[0].content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsDetils:[]
			}
		},
		onLoad(options) {
			console.log(options.id)
			this.getNews(options.id)
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
			async getNews(newid) {
				const {
					data: res
				} = await this.$myRquest({
					url: `/api/getnew/${newid}`
				})
				this.newsDetils= res.message;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.news_detail {
		font-size: 30rpx;
		padding: 0 20rpx;
		.title {
			text-align: center;
			width: 710rpx;
			display: block;
			margin: 20rpx 0;
		}
		.info {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
		}
	}
</style>
