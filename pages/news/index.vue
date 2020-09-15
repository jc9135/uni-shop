<template>
	<view class="news">
		<view class="news_item" v-for="(item,index) in news" :key="index" @click="goDetail(item.id)">
			<image :src="item.img_url"></image>
			<view class="text_wrap">
				<view class="title">{{item.title}}</view>
				<view class="info">
					<text>发表时间：{{item.add_time | formatDate}}</text>
					<text>点击次数：{{item.click}}次</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news: []
			}
		},
		onLoad() {
			this.getNews()
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
			async getNews() {
				const {
					data: res
				} = await this.$myRquest({
					url: "/api/getnewslist"
				})
				this.news = res.message;
			},
			goDetail (id) {
				uni.navigateTo({
					url:`/pages/new-detail/index?id=${id}`
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.news {
		.news_item {
			display: flex;
			border-bottom: 2rpx solid #ccc;
			padding: 20rpx;

			image {
				min-width: 200rpx;
				max-width: 200rpx;
				height: 150rpx;
			}

			.text_wrap {
				margin-left: 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.title {
					font-size: 30rpx;
				}

				.info {
					font-size: 24rpx;

					text:nth-child(2) {
						margin-left: 30rpx;
					}
				}
			}
		}
	}
</style>
