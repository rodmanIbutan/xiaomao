<template>
	<view class="container order-list-page">
		<view class="order-item" v-for="(item, index) in orderList" :key="index">
			<view class="order-info" @tap="goTo" :data-order="item">
				<image :src="serverHost+item.movieImg"></image>
				<view class="order-desc">
					<view class="movie-name line-ellipsis">{{ item.movieName }}</view>
					<view class="showTime line-ellipsis">{{ item.time }}</view>
					<view class="position line-ellipsis">{{ item.hallId }}号厅 {{ item.seats }}</view>
				</view>
			</view>

			<view class="order-more">
				<view>总价：{{ item.orderPrice }}元</view>
				<view class="status">已完成</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	const util = require('../../../utils/util.js');
	export default {
		data() {
			return {
				cinemaId: '',
				orderList: [],
				serverHost: app.globalData.url
			};
		},
		onLoad(opt) {
			this.cinemaId = opt.cinemaId
		},
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				var that = this;
				uni.getStorage({
					key: 'userInfo',
					success: function(res1) {
						console.log(res1);
						uni.request({
							url: app.globalData.url + '/order/getMovieOrderByCinema?cinemaId=' + that.cinemaId,
							method: 'GET',
							header: {
								token: res1.data.data.token
							},
							success(res) {
								console.log(res);
								if (res.data.state === 202) {
									uni.showModal({
										content: '您还未登录',
										success(res) {
											uni.switchTab({
												url: '/pages/user/user'
											});
										}
									});
								} else {
									res.data.data.forEach((order) => {
										order.time = util.formatYear(new Date(order.time));
									});
									that.setData({
										orderList: res.data.data
									});
								}
							}
						});
					}
				});
			},
			goTo(e){
				console.log(e);
				const orderId = e.currentTarget.dataset.order.orderId;
				const pages = getCurrentPages();
				const prevPage = pages[pages.length - 2]; // 上一个页面实例对象
				prevPage.$vm.setSeat({
				  orderId
				});
				uni.navigateBack({
					
				});
			}

		},
	}
</script>

<style>
	@import './select-seat.css';
</style>