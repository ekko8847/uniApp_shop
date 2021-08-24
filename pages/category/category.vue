<template>
	<view class="categroyContainer">
		<view class="header">
			<view class="center">
				搜索商品
			</view>
		</view>
		<view class="main">
			<view class="mainLeft">
				<view :class="{active:defaultIndex === index}"  @click="defaultIndex = index" class="leftItem" v-for="(cat,index) in categoryList" :key="cat.id">
					{{cat.name}}
				</view>
			</view>
			<view class="mainRight">
				<scroll-view scroll-y="true" class="rightScroll" enable-flex>
					<view class="scrollItem">
						<image class="rightImg" :src="currentCategory.imgUrl"></image>
						<view class="goodsList">
							<view class="goodsItem" v-for="(goods,index) in subCateList" :key="goods.id">
								<image class="goodsImg" :src="goods.wapBannerUrl"></image>
								<text class="goodsText">{{goods.name}}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				defaultIndex:0
			};
		},
		mounted(){
			this.getCategoryList()
		},
		methods:{
			getCategoryList(){
				this.$store.dispatch('getCategoryList')
			}
		},
		computed:{
			// 获取所有的分类
			...mapState({
				categoryList:state => state.category.categoryList || []
			}),
			// 获取当前显示的某个分类
			currentCategory(){
				return this.categoryList[this.defaultIndex] || {}
			},
			// 获取当前显示这个分类里面的列表
			subCateList(){
				let result = this.currentCategory.subCateList || []
				// console.log(result)
				return result
			}
		}
	}
</script>

<style lang="stylus">
	.categroyContainer
		height 100%
		.header
			display flex
			justify-content center
			align-items center
			height 80rpx
			// border-bottom 1px solid red
			box-sizing border-box
			.center
				width 90%
				height 60rpx
				background-color #aaa
				font-size 28rpx
				text-align center
				line-height 60rpx
		.main
			display flex
			.mainLeft
				width 150rpx
				.leftItem
					width 100%
					height 80rpx
					text-align center
					line-height 80rpx
					font-size 28rpx
					&.active
						background-color skyblue
						border-bottom 1px solid red
			.mainRight
				flex 1
				// border-left 1px solid red
				box-sizing border-box
				.rightScroll
					.scrollItem
						.rightImg
							display block
							width 520rpx
							height 190rpx
							margin 20rpx auto
						.goodsList
							display flex
							flex-wrap wrap
							.goodsItem
								width 33.333333%
								text-align center
								.goodsImg
									width 100%
									height 144rpx
								.goodsText
									font-size 28rpx
			
				
				
				
</style>
