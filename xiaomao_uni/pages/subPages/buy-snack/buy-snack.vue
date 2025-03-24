<template>
	<view class="container" v-if="order">
		<view class="section">
			<view class="snack-box box">
				<view class="snack line-ellipsis">{{ order.title }}</view>
				<view>{{ order.price }}元</view>
			</view>
			<view class="amount-box box">
				<view>数量：</view>
				<view class="stepper">
					<view :class="order.amount > 1 ? 'red' : ''" @tap="minus">-</view>
					<view class="num">{{ order.amount }}</view>
					<view class="red" @tap="plus">+</view>
				</view>
			</view>
			<view class="total box">
				<view>总价：</view>
				<view class="red">{{ order.total }}元</view>
			</view>
			<view class="box" @click="select_seat">
				<view>
					选择座位：
				</view>
				<view class="red">{{ seat }}</view>

			</view>
		</view>
		<!-- <view class='phone section'>
    手机号 187××××2533
  </view> -->
		<view class="payment-btn" @tap="payment">确认支付</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				orderId: "",
				order: null,
				first: true, //是否是第一次支付
				seat: ""
			};
		},
		onLoad(opt) {
			const paramsObj = JSON.parse(decodeURIComponent(opt.paramsStr));
			this.initData(paramsObj);
		},
		methods: {
			setSeat(data) {
				this.setData(data);
				var that = this
				uni.getStorage({
					key: 'userInfo',
					success: function(res1) {
						uni.request({
							url: app.globalData.url + '/order/getSnackOrderById?orderId=' + that.orderId,
							method: 'GET',
							header: {
								'content-type': 'application/x-www-form-urlencoded',
								token: res1.data.data.token
							},
							success: function(res) {
								console.log(res);
								if (res.data.state == 202) {
									uni.showModal({
										content: '您还未登录',
										success(res) {
											uni.switchTab({
												url: '/pages/user/user'
											});
										}
									});
								} else if (res.data.state === 200) {
									that.seat = res.data.data.describe
								} else {
									uni.showToast({
										title: '获取失败'
									});
								}
							}
						})
					}
				})
			},
			select_seat() {
				uni.navigateTo({
					url: 'select-seat?cinemaId=' + this.order.cinemaId
				})
			},
			initData(order) {
				this.setData({
					order
				});
			},

			//减少数量
			minus() {
				if (this.order.amount === 1) {
					return;
				} else {
					this.chanegAmount();
				}
			},

			//增加数量
			plus() {
				this.chanegAmount(1);
			},

			chanegAmount(flag) {
				let order = {
					...this.order
				};
				let amount = order.amount;
				if (flag) {
					amount++;
				} else {
					amount--;
				}
				let total = (amount * order.price).toFixed(1);
				this.setData({
					order: {
						...order,
						amount,
						total
					}
				});
			},

			payment() {
				//避免重复支付
				if (this.first) {
					var that = this;
					// let movieOrder = wx.getStorageSync('movieOrder') || []
					// movieOrder.unshift(this.data.order)
					// wx.setStorageSync('movieOrder', movieOrder)
					//请求后台模拟支付
					const order = this.order;
					const seats = this.seat
					uni.getStorage({
						key: 'userInfo',
						success: function(res1) {
							uni.request({
								url: app.globalData.url + '/order/addOrder',
								method: 'POST',
								header: {
									'content-type': 'application/x-www-form-urlencoded',
									token: res1.data.data.token
								},
								data: {
									itemId: order.snackId,
									itemType: '小吃',
									relateId: order.cinemaId,
									orderId: order.orderId,
									price: order.total,
									seat: order.amount,
									snackSeat:seats
								},
								success: function(res) {
									console.log(res);
									if (res.data.state == 202) {
										uni.showModal({
											content: '您还未登录',
											success(res) {
												uni.switchTab({
													url: '/pages/user/user'
												});
											}
										});
									} else if (res.data.state === 200) {
										uni.showToast({
											title: '支付成功'
										});
										that.setData({
											first: false
										});
										uni.switchTab({
											url: '/pages/user/user'
										});
									} else {
										uni.showToast({
											title: '支付失败'
										});
									}
								}
							});
						},
						fail: function(res1) {
							uni.showModal({
								content: '您还未登录',
								success(res) {
									uni.switchTab({
										url: '/pages/user/user'
									});
								}
							});
						}
					});
				} else {
					uni.showToast({
						title: '已支付',
						icon: 'none'
					});
				}
			}
		}
	};
</script>
<style>
	@import './buy-snack.css';
</style>