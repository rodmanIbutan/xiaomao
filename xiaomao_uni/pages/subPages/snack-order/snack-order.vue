<template>
    <view class="container order-list-page">
        <view class="order-item" v-for="(item, index) in orderList" :key="index">
            <navigator class="order-title line-ellipsis" :url="'../cinema-detail/cinema-detail?cinemaId=' + item.cinemaId" hover-class="none">
                <view>{{ item.cinemaName }}</view>
                <view class="triangle"></view>
            </navigator>

            <view class="order-info" :data-order="item">
                <image :src="item.movieImg"></image>
                <view class="order-desc">
                    <view class="delete-box" @tap.stop.prevent="deleteOrder" :data-index="index">
                        <view class="iconfont icon-del delete"></view>
                    </view>
                    <view class="snack-name line-ellipsis">{{ item.movieName }}</view>
                    <view class="amount line-ellipsis">数量：{{ item.seats }}</view>
                </view>
            </view>

            <view class="order-more">
                <view>总价：{{ item.orderPrice }}元</view>
                <view class="status">已完成</view>
            </view>
        </view>
        <view v-if="!orderList.length">
            <!-- parse <template is="nothing" :data="message:'暂无小吃订单'"/> -->
            <block name="nothing" v-if="false">
                <view class="nothing">
                    <image src="/static/image/user/nothing.png" class="nothing-img"></image>
                    <view class="nothing-text">{{ '没有找到相关内容' }}</view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
//其实页面可以和movie-order页面复用
const app = getApp();
export default {
    data() {
        return {
            orderList: []
        };
    },
    onLoad() {},
    onShow() {
        this.initData();
    },
    methods: {
        initData() {
            var that = this;
            uni.getStorage({
                key: 'userInfo',
                success: function (res1) {
                    uni.request({
                        url: app.globalData.url + '/order/getSnackOrder',
                        method: 'GET',
                        header: {
                            token: res1.data.data.token
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
                            } else {
                                that.setData({
                                    orderList: res.data.data
                                });
                            }
                        }
                    });
                }
            });
        },

        //删除订单
        deleteOrder(e) {
            const index = e.currentTarget.dataset.index;
            let orderList = this.orderList.slice();
            orderList.splice(index, 1);
            uni.showModal({
                title: '提示',
                content: '确认删除订单吗？',
                success: (res) => {
                    if (res.confirm) {
                        this.setData({
                            orderList
                        });
                        uni.setStorageSync('snackOrder', orderList);
                    }
                }
            });
        }
    }
};
</script>
<style>
@import './snack-order.css';
@import '@/templates/nothing/nothing.css';
</style>
