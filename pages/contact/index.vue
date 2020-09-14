<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view class="tellphone" @click="phone">联系电话：400-100-9900（点击拨打）</view>
			<view>联系地址：北京市丰台区太平桥西里</view>
		</view>
		<map name="" class="map" :longitude="longitude" :latitude="latitude" show-compass="true" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 116.3167690179138,
				latitude: 39.883990814494624,
				markers: [{
					longitude: 116.3167690179138,
					latitude: 39.883990814494624,
					iconPath: "../../static/locat.jpg",
					width: 30,
					height: 40
				}],
				phoneNumber: 4001009900
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '4001009900'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contact {
		.img {
			width: 750rpx;
			height: 320rpx;
		}

		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;

			view {
				line-height: 70rpx;
				border-bottom: 1px solid #eee;
			}
		}

		.map {
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
