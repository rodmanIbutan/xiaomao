<template>
    <view class="container" v-if="order">
        <view class="ticket-content">
            <navigator class="cinema" :url="'../cinema-detail/cinema-detail?cinemaId=' + order.cinemaId" hover-class="none">
                <view>{{ order.cinemaName }}</view>
                <view class="triangle"></view>
            </navigator>
            <view class="movie-info">
                <view class="movie-name line-ellipsis">{{ order.movieName }}</view>
                <view class="showTime line-ellipsis">{{ order.time }}</view>
                <view class="position line-ellipsis">{{ order.hallId }}号厅 {{ order.seats }}</view>
            </view>
            <view class="divider-box">
                <view class="divider"></view>
                <image class="status" src="/static/image/user/status.png"></image>
            </view>
            <view class="code-container">
                <view class="code-box">
                    <view>手机号：187××××2533</view>
                    <view>流水号：{{ order.orderId }}</view>
                    <view>验证码：{{ order.Vcode }}</view>
                </view>
                <view class="rq">
                    <image src="/static/image/user/qr.png"></image>
                </view>
            </view>
        </view>
        <view class="price-box box">
            <view>订单号：{{ order.orderId }}</view>
            <view>总价：{{ order.orderPrice }}元</view>
        </view>
        <!-- <view class='map-box'>
    <template is="cinemaMap" data='{{cinemaData:order.cinemaData}}' />
  </view>
  <view class='maoyan box'>
    <view>猫眼客服电话</view>
    <view class='phone-box'>
      <view>工作时间： 9:00-24:00</view>
      <view class='phone'>1010-5335</view>
    </view>
  </view> -->
    </view>
</template>

<script>
export default {
    data() {
        return {
            order: null
        };
    },
    onLoad(opt) {
        const paramsObj = JSON.parse(opt.paramsStr);
        this.initData(paramsObj);
    },
    methods: {
        initData(order) {
            this.setData({
                order
            });
        }
    }
};
</script>
<style>
@import './movie-order-detail.css';
</style>
