<template>
	<view class="indexContainer">
		<view class="header">
			<image class="logo" src="../../static/images/logo.png"></image>
			<view class="search">
				<text class="iconfont icon-sousuo"></text>
				<input type="text" placeholder="搜索商品" placeholder-class="place" />
			</view>
			<button class="btn">南方姑娘</button>
		</view>

		<scroll-view scroll-x="true" enable-flex class="navScroll">
			<view class="navItem" :class="{ active: defaultId === -1 }" @click="defaultId = -1">推荐</view>
			<view @click="defaultId = nav.L1Id" v-for="(nav, index) in navList" :key="nav.L1Id" class="navItem" :class="{ active: defaultId === nav.L1Id }">{{ nav.text }}</view>
		</scroll-view>

		<scroll-view scroll-y="true" class="mainScroll" enable-flex>
			<view class="mainItem" v-show="defaultId === -1">
				<!-- 推荐的内容 -->
				<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<view class="swiper-item">
							<image src="https://yanxuan.nosdn.127.net/c7de05d5b085dc671c5e41797a29ada4.jpeg?type=webp&imageView&quality=75&thumbnail=750x0"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="https://yanxuan.nosdn.127.net/feae545bd3173ff2f68a1d70b0fe5794.png?type=webp&imageView&quality=75&thumbnail=750x0"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="https://yanxuan.nosdn.127.net/7632697b0cfb772aa9c6230acdbac3c9.jpg?type=webp&imageView&quality=75&thumbnail=750x0"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="iconList">
					<view class="iconItem" v-for="(icon, index) in iconList" :key="icon.desc">
						<image class="iconImg" :src="icon.icon"></image>
						<text class="iconText">{{ icon.desc }}</text>
					</view>
				</view>
				<view class="catList">
					<view class="catItem" v-for="(cat, index) in navList" :key="cat.L1Id">
						<image class="catImg" :src="cat.picUrl"></image>
						<text class="catText">{{ cat.text }}</text>
					</view>
				</view>
				<Floor v-for="(floor, index) in floorList" :key="index" :floor="floor"></Floor>
			</view>
			<!-- 推荐之后的内容 -->
			<view v-show="defaultId !== -1"><Card :defaultId="defaultId"></Card></view>
		</scroll-view>
	</view>
</template>

<script>
import Floor from './components/Floor/index.vue';
import Card from './components/Card/index.vue';
import { mapGetters } from 'vuex';
export default {
	components: {
		Floor,
		Card
	},
	data() {
		return {
			defaultId: -1
		};
	},
	mounted() {
		this.getIndexData();
	},
	methods: {
		getIndexData() {
			this.$store.dispatch('getIndexData');
		}
	},
	computed: {
		...mapGetters(['navList', 'iconList', 'floorList'])
	}
};
</script>

<style lang="stylus">
.indexContainer
	height 100%
	.header
		height 80rpx
		display flex
		align-items center
		.logo
			width 120rpx
			height 40rpx
			margin 0 20rpx
		.search
			height 60rpx
			flex 1
			border 1px solid #aaa
			box-sizing border-box
			display flex
			align-items center
			.iconfont
				margin 0 10rpx
			.place
				font-size 28rpx
				color red
		.btn
			width 140rpx
			height 60rpx
			font-size 28rpx
			text-align center
			line-height 60rpx
			padding 0 10rpx
			margin 0 10rpx
	.navScroll
		height 80rpx
		display flex
		.navItem
			flex-shrink 0
			width 140rpx
			height 80rpx
			line-height 80rpx
			text-align center
			font-size 28rpx
			box-sizing border-box
			&.active
				border-bottom 1px solid red
	.mainScroll
		height calc(100vh - 160rpx)
		.mainItem
			.banner
				image
					width 100%
					height 300rpx
			.iconList
				margin-top 10rpx
				display flex
				justify-content space-around
				.iconItem
					display flex
					align-items center
					.iconImg
						width 32rpx
						height 32rpx
					.iconText
						font-size 26rpx
			.catList
				display flex
				flex-wrap wrap
				.catItem
					width 20%
					display flex
					flex-direction column
					align-items center
					.catImg
						width 110rpx
						height 110rpx
						border-radius 20rpx
						margin 20rpx 0
					.catText
						font-size 28rpx
</style>
