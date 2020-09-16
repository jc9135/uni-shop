<template>
	<view class="goods_detail">
		<swiper :indicator-dots="true" :autoplay="true" circular :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>
		<view class="box_one">
			<view class="price">
				<text>{{goodsDetils.sell_price}}</text>
				<text>{{goodsDetils.market_price}}</text>
			</view>
			<view class="goods_name">{{goodsDetils.title}}</view>
		</view>
		<view class="box_two">
			<view>货号：{{goodsDetils.goods_no}}</view>
			<view>库存：{{goodsDetils.stock_quantity}}</view>
		</view>
		<view class="box_three">
			<view class="tit">{{contentList.title}}</view>
			<view class="content">
				<rich-text :nodes="contentList.content"></rich-text>
			</view>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options"
			:buttonGroup="buttonGroup" 
			@click="onClick" 
			@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				goodsDetils: {},
				swiperList: [],
				contentList: [],
				id: 0,
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#ff0000',
					infoColor: "#fff"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getSwipers()
			this.getGoods()
			this.getContents()
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
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			},
			async getSwipers() {
				const {
					data: res
				} = await this.$myRquest({
					url: `/api/getthumimages/${this.id}`
				})
				this.swiperList = res.message;
			},
			async getGoods() {
				const {
					data: res
				} = await this.$myRquest({
					url: `/api/goods/getinfo/${this.id}`
				})
				this.goodsDetils = res.message[0];
			},
			async getContents() {
				const {
					data: res
				} = await this.$myRquest({
					url: `/api/goods/getdesc/${this.id}`
				})
				this.contentList = res.message[0];
			},
		}
	}
</script>

<style lang="scss" scoped>
	.goods_detail {
		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box_one {
			padding: 20rpx;
			border-bottom: 3rpx solid #ccc;

			.price {
				font-size: 35rpx;
				color: $color;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}

		.box_two {
			border-bottom: 3rpx solid #ccc;
			font-size: 32rpx;
			padding: 20rpx;
			line-height: 60rpx;
		}

		.box_three {
			padding-bottom: 100rpx;
			.tit {
				font-size: 30rpx;
				padding-left: 10rpx;
				border-bottom: 1px solid #eee;
				line-height: 70rpx;
			}

			.content {
				padding: 20rpx;
				font-size: 28rpx;
				color: #333;
				line-height: 50rpx;

				::v-deep {
					.gomeImgLoad {
						width: 710rpx;
					}
				}
			}
		}
		.goods_nav {
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
</style>
