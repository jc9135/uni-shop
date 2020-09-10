<template>
	<view class="home_box">
		<swiper :indicator-dots="true" :autoplay="true" circular :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>

		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="goPath(item.path)">
				<view :class="['iconfont',item.icon]"></view>
				<text>{{item.title}}</text>
			</view>
		</view>


		<view class="hot_goods">
			<view class="goods_title">推荐商品</view>
			<goods-list :goodsList="goodsList"></goods-list>
		</view>


	</view>
</template>

<script>
	import goodsList from '../../compontents/goods-list/goods-list.vue'
	export default {
		components:{
			goodsList
		},
		data() {
			return {
				swiperList: [],
				goodsList: [],
				navs: [{
					icon: "icon-ziyuan",
					title: "天猫超市",
					path: "/pages/goods/index"
				}, {
					icon: "icon-guanyuwomen",
					title: "联系我们",
					path: "/pages/contact/index"
				}, {
					icon: "icon-tupian",
					title: "社区图片",
					path: "/pages/pics/index"
				}, {
					icon: "icon-shipin",
					title: "学习视频",
					path: "/pages/videos/index"
				}]
			}
		},
		onLoad() {
			this.getSwipers()
			this.getGoodsList()
		},
		methods: {

			async getSwipers() {
				const {
					data: res
				} = await this.$myRquest({
					url: "/api/getlunbo"
				})
				this.swiperList = res.message;
			},
			async getGoodsList() {
				const {
					data: res
				} = await this.$myRquest({
					url: "/api/getgoods?pageindex=1"
				})
				this.goodsList = res.message;
			},
			goPath(path) {
				uni.navigateTo({
					url: path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home_box {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.nav {
			display: flex;

			.nav_item {
				width: 25%;
				text-align: center;

				.iconfont {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					background-color: $color;
					line-height: 120rpx;
					margin: 20rpx auto;
					color: #fff;
					font-size: 45rpx;
				}

				text {
					font-size: 30rpx;
				}
			}
		}

		.hot_goods {
			background-color: #eee;
			overflow: hidden;
			margin-top: 20rpx;

			.goods_title {
				height: 50px;
				line-height: 50px;
				color: $color;
				text-align: center;
				letter-spacing: 20px;
				background-color: #fff;
				margin: 7rpx 0;
				font-size: 36rpx;
			}

			
		}

	}
</style>
