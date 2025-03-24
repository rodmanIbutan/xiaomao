<template>
    <view class="container">
        <view class="header">
            <image class="avatar" :src="avatarUrl" v-if="!hasUserInfo"></image>
            <open-data type="userAvatarUrl" class="avatar" v-else></open-data>
            <button class="name" open-type="getUserInfo" @getuserinfo="onGetUserInfo" v-if="!hasUserInfo">
                {{ username }}
            </button>
            <open-data type="userNickName" class="name" v-else></open-data>
        </view>
        <view>
            <view class="order">
                <view class="title-box">
                    <view class="title">我的订单</view>
                    <view class="title-line"></view>
                </view>
                <view class="order-list">
                    <navigator class="order-item" url="../subPages/movie-order/movie-order" hover-class="none">
                        <image src="/static/image/user/order_movie.png"></image>
                        <view>电影</view>
                    </navigator>
                    <navigator class="order-item" url="../subPages/snack-order/snack-order" hover-class="none">
                        <image src="/static/image/user/order_store.png"></image>
                        <view>小吃</view>
                    </navigator>
                </view>
            </view>
            <view class="other">
                <view class="share other-item">
                    <button open-type="share" class="btn" hover-class="none">
                        <text class="iconfont icon-fenxiang1"></text>
                        分享给朋友
                    </button>
                </view>
                <view class="customer other-item">
                    <button open-type="contact" class="btn" hover-class="none">
                        <text class="iconfont icon-lianxikefu"></text>
                        客服反馈
                    </button>
                </view>
                <view class="about other-item">
                    <navigator url="../subPages/about-page/about-page" hover-class="none">
                        <text class="iconfont icon-guanyuwomen"></text>
                        关于
                    </navigator>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            avatarUrl: '/static/image/user/avatar.png',
            username: '点击登录',
            hasUserInfo: false
        };
    },
    onShareAppMessage(res) {
        return {
            title: '微票电影',
            path: 'pages/home/home'
        };
    },
    onLoad: function () {
        this.userAuthorized();
    },
    onShow: function () {
        this.userAuthorized();
    },
    methods: {
        userAuthorized() {
            var _this = this;
            const userInfo = uni.getStorageSync('userInfo');
            if (userInfo) {
                //存在则判断服务端session是否过期
                console.log('判断服务端session是否过期');
                uni.request({
                    url: app.globalData.url + '/user/isAuth',
                    method: 'GET',
                    header: {
                        token: userInfo.data.token
                    },
                    success(res) {
                        if (res.data.state == 202) {
                            _this.setData({
                                hasUserInfo: false
                            });
                        } else {
                            _this.setData({
                                hasUserInfo: true
                            });
                        }
                    }
                });
            } else {
                _this.setData({
                    hasUserInfo: false
                });
            }
        },

        onGetUserInfo(event) {
            var that = this;
            const userInfo = event.detail.userInfo;
            if (userInfo) {
                uni.login({
                    success: function (res_1) {
                        uni.getUserInfo({
                            success: function (res_2) {
                                console.log(res_2);
                                uni.request({
                                    url: app.globalData.url + '/user/wxLogin',
                                    method: 'POST',
                                    header: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    data: {
                                        code: res_1.code,
                                        nickName: res_2.userInfo.nickName,
                                        avatarUrl: res_2.userInfo.avatarUrl,
                                        gender: res_2.userInfo.gender
                                    },
                                    success: function (res) {
                                        const userInfo = res.data;
                                        uni.setStorage({
                                            key: 'userInfo',
                                            data: userInfo
                                        });
                                        that.setData({
                                            hasUserInfo: true
                                        });
                                        app.globalData.userInfo = res_2.userInfo;
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    }
};
</script>
<style>
@import './user.css';
</style>
