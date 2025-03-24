<template>
    <view class="container order-list-page">
        <view class="order-item" v-for="(item, index) in orderList" :key="index">
            <navigator class="order-title line-ellipsis" :url="'../cinema-detail/cinema-detail?cinemaId=' + item.cinemaId" hover-class="none">
                <view>{{ item.cinemaName }}</view>
                <view class="triangle"></view>
            </navigator>

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
        <view v-if="orderList.length == 0">
            <!-- parse <template is="nothing" :data="message:'暂无电影订单'"/> -->
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
const app = getApp();
const util = require('../../../utils/util.js');
export default {
    data() {
        return {
            orderList: [],
			serverHost:app.globalData.url
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
                        url: app.globalData.url + '/order/getMovieOrder',
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

        //跳转到订单详情页面
        goTo(e) {
            const order = e.currentTarget.dataset.order;
            order.Vcode = util.getRandom(100000, 999999);
            const paramsStr = JSON.stringify(order);
            uni.navigateTo({
                url: `../movie-order-detail/movie-order-detail?paramsStr=${paramsStr}`
            });
        }
    }
};
</script>
<style>
@import './movie-order.css';
@import '@/templates/nothing/nothing.css';
</style>
