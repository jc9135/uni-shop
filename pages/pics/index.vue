<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view :class="{'active':index == active}" 
			v-for="(item,index) in leftList" :key="index"
			 @click="getRightData(item.id,index)"
			 >{{item.title}}</view>
		</scroll-view>
		<scroll-view  class="right" scroll-y>
			<text v-if="rightList.length === 0" class="empty">暂无数据</text>
			<view class="item" v-for="(item,index) in rightList" :key="index" v-else>
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{item.title}}</text>
				<text selectable>{{item.zhaiyao}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				leftList: [],
				rightList: [],
				active: 0
			}
		},
		onLoad() {
			this.getLeftData()
		},
		methods: {
			async getLeftData() {
				const {
					data: res
				} = await this.$myRquest({
					url: "/api/getimgcategory"
				})
				this.leftList = res.message;
				this.getRightData(res.message[0].id,0)
			},
			async getRightData(id,index) {
				this.active = index;
				const {
					data: res
				} = await this.$myRquest({
					url: `/api/getimages/${id}`
				})
				this.rightList = res.message;
			},
			previewImg(cur){
				const urls = this.rightList.map(item=>{
					return item.img_url
				})
				uni.previewImage({
					current:cur,
					urls:urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;

	}

	.pics {
		height: 100%;
		display: flex;
		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #eee;

			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				font-size: 30rpx;
				text-align: center;
				border-top: 1px solid #eee;
			}

			view:first-child {
				border-top: none;
			}

			.active {
				background-color: $color;
				color: #fff;
			}
		}
		.right {
			width: calc(100vw - 200rpx);
			height: 100%;
			.empty {
				text-align: center;
				margin: 0 auto;
			}
			.item {
				padding: 20rpx;
				box-sizing: border-box;
				image {
					width: 100%;
					height: 520rpx;
					border-radius: 5px;
				}
				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
</style>
