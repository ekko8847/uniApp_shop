<template>
	<view class="card">
		<swiper class="cardSwiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(banner, index) in currentCardData.category.bannerUrlList" :key="index">
				<view class="swiper-item"><image class="swiperImg" :src="banner"></image></view>
			</swiper-item>
		</swiper>
		<view class="cardTitle">{{ currentCardData.category.name }}</view>
		<view class="cardText">{{ currentCardData.category.frontName }}</view>
		<view class="goodsList">
			<view @click="toDetail(goods)" class="goodsItem" v-for="(goods, index) in currentCardData.itemList" :key="goods.id">
				<image class="goodsImg" :src="goods.primaryPicUrl"></image>
				<text class="goodsName">{{ goods.name }}</text>
				<text class="goodsPrice">{{ goods.counterPrice }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	props: ['defaultId'],
	mounted() {
		this.getIndexList();
	},
	methods: {
		getIndexList() {
			this.$store.dispatch('getIndexList');
		},
		toDetail(goods){
			wx.navigateTo({
				// 前台项目携带对象的时候长度是有要求的，过长就会自动截掉，数据就不完整了
				// 这个是小程序，小程序长度不会和前台项目那么严格
				url:'/pages/detail/detail?goods=' + JSON.stringify(goods)
			})
		}
	},
	computed: {
		// 获取所有的数据
		...mapState({
			indexList: state => state.home.indexList || []
		}),
		// 获取当前card需要展示的数据
		currentCardData() {
			let result = this.indexList.find(item => item.category.parentId === this.defaultId) || {};
			// console.log(result); //一开始会打印两次，一开始数据没回来的时候，和数据回来的时候都要打印
			return result;
		}
	}
};
</script>

<style lang="stylus">
.card
	.cardSwiper
		.swiperImg
			width 100%
			height 300rpx
	.cardTitle, .cardText
		text-align center
	.goodsList
		display flex
		flex-wrap wrap
		justify-content space-around
		&::after
			content ''
			width 344rpx
		.goodsItem
			display flex
			flex-direction column
			width 344rpx
			.goodsImg
				width 344rpx
				height 344rpx
</style>
