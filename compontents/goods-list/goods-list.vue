<template>
	<view class="goods_list">
		<view class="goods_item" v-for="(item,index) in goodsList" :key="index">
			<image :src="item.img_url" mode=""></image>
			<view class="goods_price">
				<text>￥{{item.sell_price}}</text>
				<text>￥{{item.market_price}}</text>
			</view>
			<view class="goods_name">{{item.zhaiyao}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goodsList:Array,
			required:true
		}
	}
</script>

<style lang="scss" scoped>
	.goods_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	
		.goods_item {
			width: 352rpx;
			background-color: #fff;
			border: 3rpx solid #eee;
			margin: 10rpx 0;
			padding: 15rpx;
			box-sizing: border-box;
	
			image {
				width: 80%;
				height: 150px;
				margin: 0 auto;
				display: block;
			}
	
			.goods_price {
				padding: 10rpx 0;
				color: $color;
				font-size: 34rpx;
	
				text:last-child {
					color: #ccc;
					font-size: 28rpx;
					margin-left: 16rpx;
					text-decoration: line-through;
				}
			}
	
			.goods_name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding: 15rpx 0 10rpx 0;
			}
		}
	}
</style>
