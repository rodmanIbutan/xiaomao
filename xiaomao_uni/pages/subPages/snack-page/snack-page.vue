<template>
    <view class="container">
        <!-- 头部 -->
        <view class="image-box">
            <image :src="info.imageUrl" mode="aspectFill"></image>
            <view class="info-box">
                <view class="cinema-name line-ellipsis">{{ cinemaName }}</view>
                <view class="snack-title line-ellipsis">{{ info.firstTitle }}</view>
            </view>
            <view class="mask"></view>
        </view>
        <!-- 价格 -->
        <view class="section">
            <view class="price-box">
                <view>
                    <text class="price-num" v-if="info.price">
                        {{ info.price }}
                        <text class="yuan">元</text>
                    </text>
                </view>
                <view class="buy-btn" @tap="buySnack">立即抢购</view>
            </view>
            <view class="price-box">
                <view class="deal-tags-list">
                    <text class="item" v-if="info.dealBrief.refundTag.supportTimeRefund">
                        <text class="text-icon"></text>
                        随时退
                    </text>
                    <text class="item" v-if="info.dealBrief.refundTag.supportExpireRefund">
                        <text class="text-icon"></text>
                        过期退
                    </text>
                </view>
                <view class="sold">
                    <text class="iconfont icon-04"></text>
                    <text>{{ info.curNumber }}</text>
                </view>
            </view>
        </view>
        <!-- 套餐详情 -->
        <view class="section">
            <view class="section-title">套餐详情</view>
            <view class="terms">
                <view class="terms-item">
                    <view class="tip-des">{{ info.secondTitle }}</view>
                </view>
            </view>
            <!-- <view class='dealsets-details' wx:for='{{info.dealBrief.menus}}' wx:key='{{item}}'>
      <view class='set-title' wx:if='{{item.title}}'>{{item.title}}</view>
      <view class='detail-group' wx:for='{{item.items}}' wx:key='{{item}}'>
        <text class='right line-ellipsis'>{{item.name}}</text>
        <text class='center line-ellipsis'>{{item.amount}}</text>
        <text class='left'>¥{{item.subtotal}}</text>
      </view>
    </view> -->
        </view>
        <!-- 购买须知 -->
        <view class="purchase-notice section">
            <view class="section-title">购买须知</view>
            <view class="terms">
                <view class="terms-item">
                    <view class="tip-des">请在影城卖品部营业时间兑换,或者由店员在电影开场后,送至座位</view>
                </view>
            </view>
        </view>
        <!-- 影院信息 -->
        <view class="section">
            <view class="section-title">影院信息</view>
            <!-- parse <template is="cinemaMap" :data="cinemaData"/> -->
            <block name="cinemaMap" v-if="false">
                <view class="cinema-info">
                    <view class="info-box">
                        <view class="title line-ellipsis">{{ cinemaDetail.nm }}</view>
                        <view class="location">{{ cinemaDetail.addr }}</view>
                    </view>
                    <navigator
                        :url="
                            '/pages/subPages/cinema-map/cinema-map?latitude=' +
                            cinemaDetail.latitude +
                            '&longitude=' +
                            cinemaDetail.longitude +
                            '&nm=' +
                            cinemaDetail.nm +
                            '&addr=' +
                            cinemaDetail.addr
                        "
                        class="location-icon"
                        hover-class="none"
                    >
                        <image src="/static/image/user/location.png" mode="aspectFit"></image>
                        <view>地图</view>
                    </navigator>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
const util = require('../../../utils/util.js');
const getRandom = util.getRandom;
export default {
    data() {
        return {
            info: null,

            //小吃详情
            cinemaName: '',

            cinemaData: null,

            //影院地图详情
            cinemaId: null,

            refundTag: {
                supportTimeRefund: '',
                supportExpireRefund: ''
            },

            cinemaDetail: {
                nm: '',
                addr: '',
                latitude: '',
                longitude: ''
            }
        };
    },
    onLoad(obj) {
        console.log(obj);
        const paramsObj = JSON.parse(decodeURIComponent(obj.paramsStr));
        this.initPage(paramsObj);
    },
    methods: {
        initPage(obj, param) {
            uni.showLoading({
                title: '正在加载'
            });
            this.setData({
                cinemaName: obj.cinemaName,
                cinemaId: obj.cinemaId,
                cinemaData: obj.cinemaData,
                info: obj.info
            });
            uni.hideLoading();
        },

        //跳转到“提交订单”页面
        buySnack() {
            const { info, cinemaName, cinemaId } = this;
            //添加订单信息
            const paramsStr = JSON.stringify({
                cinemaName,
                cinemaId,
                snackId: info.id,
                title: info.firstTitle,
                //套餐名
                orderId: getRandom(1000000000, 9999999999),
                img: info.imageUrl,
                //图片
                amount: 1,
                //数量
                price: info.price,
                //单价
                total: info.price * 1 //合计
            });
            uni.navigateTo({
                url: `/pages/subPages/buy-snack/buy-snack?paramsStr=${encodeURIComponent(paramsStr)}`
            });
        }
    }
};
</script>
<style>
@import './snack-page.css';
@import '@/templates/cinemaMap/cinemaMap.css';
</style>
