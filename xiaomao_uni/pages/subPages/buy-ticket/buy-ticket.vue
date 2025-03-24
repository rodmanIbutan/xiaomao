<template>
    <view class="container" v-if="order">
        <view class="section">
            <view class="movie-box">
                <view class="movie-name">{{ order.movieName }}</view>
                <view class="watch-time">{{ order.time }}</view>
                <view>{{ order.cinemaName }} {{ order.hall }} 号厅</view>
                <view>
                    <block v-for="(item, index) in order.seat" :key="index">{{ item.seatInfo }}</block>
                </view>
            </view>
            <view class="price-box">
                <view>票价</view>
                <view class="server">
                    含服务费3元/张
                    <text class="price-num">
                        {{ order.price }}
                        <text class="yuan">元</text>
                    </text>
                </view>
            </view>
        </view>
        <view class="section">
            <view class="section-title">活动和优惠券</view>
            <view class="section-content">无可用</view>
        </view>
        <view class="section">
            <view class="section-title">退改签须知</view>
            <view class="section-content">
                <view>开场时间60分钟前，可免费改签、退款</view>
                <view>使用观影卡或享受票减小吃特惠时，不可改签</view>
            </view>
        </view>
        <view class="section">
            <view class="section-title">手机号</view>
            <view class="section-content">手机号仅用于生成订单，取票码不再以短信发送</view>
        </view>
        <view class="footer">
            <view class="payment">
                还需支付：
                <text class="price-num">
                    {{ order.price }}
                    <text class="yuan">元</text>
                </text>
            </view>
            <view class="payment-btn" @tap="payment">确认支付</view>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            order: null,
            first: true //是否是第一次支付
        };
    },
    onLoad(params) {
        const paramsObj = JSON.parse(params.paramsStr);
        this.initData(paramsObj);
    },
    methods: {
        initData(params) {
            this.setData({
                order: params
            });
        },

        //模拟支付
        payment() {
            //避免重复支付
            if (this.first) {
                var that = this;
                // let movieOrder = wx.getStorageSync('movieOrder') || []
                // movieOrder.unshift(this.data.order)
                // wx.setStorageSync('movieOrder', movieOrder)
                //请求后台模拟支付
                const order = this.order;
                uni.getStorage({
                    key: 'userInfo',
                    success: function (res1) {
                        uni.request({
                            url: app.globalData.url + '/order/addOrder',
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded',
                                token: res1.data.data.token
                            },
                            data: {
                                itemId: order.movieId,
                                itemType: '电影票',
                                relateId: order.timesId,
                                orderId: order.orderId,
                                price: order.price,
                                seat: JSON.stringify(order.seat),
								snackSeat:""
                            },
                            success(res) {
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
                                    // wx.navigateTo({
                                    //   url: `../movie-order-detail/movie-order-detail?paramsStr=${JSON.stringify(res.data.data)}`,
                                    // })
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
                    fail: function (res2) {
                        uni.showModal({
                            content: '您还未登录',
                            success(res) {
                                uni.switchTab({
                                    url: '../../user/user'
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
@import './buy-ticket.css';
</style>
