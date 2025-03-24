<template>
    <!-- index.wxml -->

    <view class="container">
        <view>
            <view class="topbar" style="background-color: #ffffff">
                <navigator class="city-entry" url="../subPages/city-select/city-select">
                    <text class="city-name">{{ city }}</text>
                    <text class="city-entry-arrow"></text>
                </navigator>
                <view class="swiper-tab">
                    <view :class="'swiper-tab-item ' + (currentTab == 0 ? 'active' : '')" data-current="0" @tap="clickTab">热映</view>
                    <view :class="'swiper-tab-item ' + (currentTab == 1 ? 'active' : '')" data-current="1" @tap="clickTab">待映</view>
                </view>
                <navigator class="search" url="../subPages/search-page/search-page?stype=-1">
                    <text class="iconfont icon-sousuo"></text>
                </navigator>
            </view>
        </view>
        <!-- 分隔线 -->
        <!-- <view class="divLine"></view> -->
        <view class="content">
            <swiper :style="'height:' + swiperViewHeight + 'px'" :current="currentTab" duration="300" @change="swiperTab">
                <!-- 热映 -->
                <swiper-item>
                    <swiper
                        class="banner"
                        :indicator-dots="indicatorDots"
                        :vertical="vertical"
                        :autoplay="autoplay"
                        :interval="interval"
                        :duration="duration"
                        @change="swiperchange"
                    >
                        <block v-for="(item, index) in bannerList" :key="index">
                            <swiper-item>
                                <image :src="serverHost+item.img" class="banner-item" />
                            </swiper-item>
                        </block>
                    </swiper>
                    <block v-for="(item, index) in itemsShow" :key="index">
                        <navigator :url="'../subPages/movie-detail/movie-detail?movieId=' + item.id + '&showst=' + item.showst">
                            <view class="flex item swiperH">
                                <view class="item_left">
                                    <image :src="serverHost+item.img" />
                                </view>
                                <view class="flex_auto item_middle">
                                    <view>
                                        <text class="title">{{ item.nm }}</text>
                                    </view>
                                    <view>
                                        <text class="left_s">评分：</text>
                                        <text class="score">{{ item.sc }}</text>
                                    </view>
                                    <view>
                                        <text class="sub_title">{{ item.dra }}</text>
                                    </view>
                                    <view>
                                        <text class="actor">导演：{{ item.dir }}</text>
                                    </view>
                                </view>

                            </view>
                        </navigator>
                    </block>
                </swiper-item>
                <!-- 待映 -->
                <swiper-item style="margin-top: 10rpx">
                    <text style="margin-left: 20rpx; color: #9b9b9b; font-size: 28rpx">近期最受欢迎</text>
                    <scroll-view style="margin-top: 10rpx; width: 100%; white-space: nowrap; border-bottom: 20rpx solid #f5f5f5" :scroll-x="true">
                        <block v-for="(item, index) in itemsPop" :key="index">
                            <view style="margin-top: 5rpx; margin-bottom: 15rpx">
                                <navigator style="margin-left: 15rpx" :url="'../subPages/movie-detail/movie-detail?movieId=' + item.id + '&showst=' + item.showst">
                                    <view class="popular">
                                        <image class="popular-img" :src="item.img"></image>
                                        <text class="pop-title">{{ item.nm }}</text>
                                        <text style="font-size: 20rpx; color: #9b9b9b">{{ item.wish }}人想看</text>
                                        <text style="font-size: 20rpx; color: #9b9b9b">{{ item.rt }}</text>
                                    </view>
                                </navigator>
                            </view>
                        </block>
                    </scroll-view>

                    <block v-for="(item, index) in itemsWait" :key="index">
                        <navigator :url="'../subPages/movie-detail/movie-detail?movieId=' + item.id + '&showst=' + item.showst">
                            <view class="flex item swiperH">
                                <view class="item_left">
                                    <image :src="item.img" />
                                </view>
                                <view class="flex_auto item_middle">
                                    <view>
                                        <text class="title">{{ item.nm }}</text>
                                    </view>
                                    <view>
                                        <text class="wish">{{ item.wish }}</text>
                                        <text style="font-size: 12px">人想看</text>
                                    </view>
                                    <view>
                                        <text class="sub_title">{{ item.dra }}</text>
                                    </view>
                                    <view>
                                        <text class="actor">导演：{{ item.dir }}</text>
                                    </view>
                                </view>
                                <view class="item_right">
                                    <view><text class="action" v-if="item.showst == 1">想看</text></view>
                                    <view><text class="action" v-if="item.showst == 2">预售</text></view>
                                </view>
                            </view>
                        </navigator>
                    </block>
                </swiper-item>
            </swiper>
            <view v-if="itemsShow.length > 0 && hasMoreHost && currentTab == 0">
                <!-- parse <template is="loadingMore"/> -->
                <block name="loadingMore" v-if="false">
                    <view class="loadingMore">
                        <image src="/static/image/user/loading.gif" class="loading-img"></image>
                        <view class="loading-text">正在加载...</view>
                    </view>
                </block>
            </view>
            <view v-if="itemsWait.length > 0 && hasMoreWait && currentTab == 1">
                <!-- parse <template is="loadingMore"/> -->
                <block name="loadingMore" v-if="false">
                    <view class="loadingMore">
                        <image src="/static/image/user/loading.gif" class="loading-img"></image>
                        <view class="loading-text">正在加载...</view>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
export default {
    data() {
        return {
			serverHost:app.globalData.url,
            itemsShow: [],
            //热映
            pageNumHost: 0,
            limit: 6,
            hasMoreHost: true,
            hasMoreWait: true,
            pageNumWait: 0,
            itemsWait: [],
            //待映
            itemsPop: [],
            bannerList: [],
            swiperViewHeight: 0,
            currentTab: 0,
            city: '正在定位...',
            inputShowed: false,
            indicatorDots: true,
            vertical: false,
            autoplay: true,
            interval: 3000,
            duration: 1200
        };
    },
    onLoad: function () {

        var that = this;
        //调用应用实例的方法获取全局数据
        //bannerList
        uni.request({
            url: app.globalData.url + '/home/getBannerList',
            method: 'GET',
            data: {},
            success: function (res) {
				console.log("res: " + JSON.stringify(res));
                that.setData({
                    bannerList: res.data.data
                });
            }
        });
        that.cityInit();
        uni.request({
            url: app.globalData.url + '/home/getMoviePop',
            method: 'GET',
            data: {},
            header: {
                Accept: 'application/json'
            },
            success: function (res) {
                // console.log(res)
                var list = res.data.data;
                for (var i in list) {
                    list[i].rt = util.formatDate(new Date(list[i].rt));
                }
                that.setData({
                    itemsPop: list
                });
				that.getMovieWait();
            }
        });

        that.getMovieList();
		console.log("===",this.itemsShow)
    },
    onReachBottom: function () {
        if (this.currentTab == 0 && this.hasMoreHost) this.getMovieList();
        else if (this.currentTab == 1 && this.hasMoreWait) {
            this.getMovieWait();
        }
    },
    onShow: function () {
        if (app.globalData.selectCity) {
            this.setData({
                city: app.globalData.selectCity.cityName
            });
        }
    },
    methods: {
        swiperchange: function (e) {
            //FIXME: 当前页码
            //console.log(e.detail.current)
        },

        getMovieList: function () {
            var that = this;
            var pageNumHost = that.pageNumHost;
            var limit = that.limit;
            //playingList
            uni.request({
                url: app.globalData.url + '/home/getMovieList',
                method: 'GET',
                data: {
                    pageNum: ++pageNumHost,
                    limit: limit
                },
                header: {
                    Accept: 'application/json'
                },
                success: function (res) {
					console.log(res)
                    const itemsShow = that.itemsShow.concat(res.data.data.beanList);
					console.log("show",itemsShow)
                    that.setData({
                        hasMoreHost: pageNumHost < res.data.data.tr,
                        itemsShow: itemsShow,
                        pageNumHost: pageNumHost
                    });
                    if (that.currentTab == 0) {
                        that.setSwiperHeight();
                    }
                }
            });
        },

        getMovieWait: function () {
            var that = this;
            var pageNumWait = that.pageNumWait;
            var limit = that.limit;
            uni.request({
                url: app.globalData.url + '/home/getMovieWait',
                method: 'GET',
                data: {
                    pageNum: ++pageNumWait,
                    limit: limit
                },
                success: function (res) {
                    const itemsWait = that.itemsWait.concat(res.data.data.beanList);
                    that.setData({
                        hasMoreWait: pageNumWait < res.data.data.tr,
                        itemsWait: itemsWait,
                        pageNumWait: pageNumWait
                    });
                    if (that.currentTab == 1) {
                        that.setSwiperHeight();
                    }
                }
            });
        },

        cityInit: function () {
            if (app.globalData.userLocation) {
                this.setData({
                    city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
                });
            } else {
                app.globalData.userLocationReadyCallback = () => {
                    this.setData({
                        city: app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
                    });
                };
            }
        },

        setSwiperHeight: function () {
            var query = uni.createSelectorQuery();
            //选择id
            var that = this;
            var px1 = 0.2773333333333333 * uni.getSystemInfoSync().windowWidth;
            var px2 = 0.5013333333333333 * uni.getSystemInfoSync().windowWidth;
            query
                .selectAll('.swiperH')
                .boundingClientRect(function (rect) {
                    console.log(rect);
                    var itemsLength = 0;
					if(rect==[]){
						itemsLength = 150 * that.itemsShow.length + px1;
					}else{
						if (that.currentTab == 0) {
						    itemsLength = 150 * that.itemsShow.length + px1;
						} else if (that.currentTab == 1) {
						    itemsLength = 150 * that.itemsWait.length + px2;
						}
					}
                    
                    that.setData({
                        swiperViewHeight: itemsLength
                    });
                })
                .exec();
        },

        //滑动切换
        swiperTab: function (e) {
            var that = this;
            that.setSwiperHeight();
            uni.pageScrollTo({
                scrollTop: 0
            });
            that.setData({
                currentTab: e.detail.current
            });
        },

        //点击切换
        clickTab: function (e) {
            var that = this;
            if (this.currentTab === e.target.dataset.current) {
                return false;
            } else {
                that.setSwiperHeight();
                that.setData({
                    currentTab: e.target.dataset.current
                });
            }
        }
    }
};
</script>
<style>
@import './index.css';
@import '@/templates/loadingMore/loadingMore.css';
</style>
