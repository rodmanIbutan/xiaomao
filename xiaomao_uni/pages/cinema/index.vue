<template>
    <!-- index.wxml -->

    <view class="container" :style="'position:' + (isShow ? 'fixed' : '')">
        <view class="topbar">
            <navigator class="city-entry" url="../subPages/city-select/city-select">
                <text class="city-name">{{ city }}</text>
                <text class="city-entry-arrow"></text>
            </navigator>
            <navigator url="../subPages/search-page/search-page?stype=2" class="search">
                <text class="iconfont icon-sousuo"></text>
                搜影院
            </navigator>
        </view>
        <view class="nav-wrapper">
            <filter-nav :city-cinema-info="cityCinemaInfo" @change="changeCondition" @toggleShow="toggleShow"></filter-nav>
        </view>
        <view class="cinema-list">
            <block v-for="(item, index) in cinemas" :key="index">
                <navigator class="cinema-section" :url="'/pages/subPages/cinema-detail/cinema-detail?cinemaId=' + item.cinema.id" hover-class="none">
                    <view class="flex item">
                        <view class="flex_auto item_left">
                            <view>
                                <text class="title">{{ item.cinema.nm }}</text>
                            </view>
                            <view>
                                <text class="sub_title">{{ item.cinema.addr }}</text>
                            </view>
                            <view class="tag">

                            </view>
                        </view>
                        <view class="item_right" v-if="item.cinema.distance">
                            <view>
                                <text class="price">{{ item.cinema.distance }}km</text>
                            </view>
                        </view>
                    </view>
                </navigator>
            </block>
            <view v-if="cinemas.length > 0 && hasMore">
                <!-- parse <template is="loadingMore"/> -->
                <block name="loadingMore">
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
import filterNav from '@/components/filter-nav/filter-nav';
const util = require('../../utils/util.js');
const app = getApp();
export default {
    components: {
        filterNav
    },
    //事件处理函数
    data() {
        return {
            title: '',
            city: '正在定位...',
            params: {
                //url请求参数对象
                pageNum: 0,
                limit: 8,
                hallType: -1,
                brandId: -1,
                serviceId: -1,
                selectRegion: ''
            },
            hasMore: true,
            cinemas: [],
            //影院列表
            cityCinemaInfo: {},
            //城市影院信息
            isShow: false,
            //导航下拉框是否展开
            nothing: false,
            //是否有符合过滤的影院
            noSchedule: false //当天是否有场次，原本时间是由后台返回的，但是缺少城市ID就没有返回，导致当天可能没有播放场次
        };
    },
    onLoad: function (options) {
        var that = this;
        that.cityInit();
        that.getFilter();
        that.getCinemas(that.params);
    },
    onReady: function () {
        uni.setNavigationBarTitle({
            title: '电影院'
        });
    },
    //上拉触底加载更多
    onReachBottom() {
        if (!this.hasMore) {
            return;
        }
        this.getCinemas(this.params);
    },
    onShow: function () {
        if (app.globalData.selectCity) {
            this.setData({
                city: app.globalData.selectCity.cityName
            });
        }else{
			this.setData({
			    city: app.globalData.selectCity.cityName
			});
		}
        if (app.globalData.isRefresh) {
            app.globalData.isRefresh = false;
            this.setData({
                params: {
                    ...this.params,
                    pageNum: 0
                },
                city: app.globalData.selectCity.cityName,
                cinemas: [],
                nothing: false
            });
            this.getFilter();
            this.getCinemas(this.params);
        }
    },
    methods: {
        getFilter() {
            var that = this;
            uni.request({
                url: app.globalData.url + '/cinema/getFilters',
                method: 'POST',
                data: app.globalData.selectCity,
                success: function (res) {
                    console.log(res.data);
                    that.setData({
                        cityCinemaInfo: res.data
                    });
                }
            });
        },

        getCinemas(params) {
            const _this = this;
            var pageIndex = _this.params.pageNum;
            return new Promise((resolve, reject) => {
                uni.request({
                    url: app.globalData.url + `/cinema/getCinemas`,
                    method: 'POST',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                        ...params,
                        pageNum: ++pageIndex,
                        selectCity: JSON.stringify(app.globalData.selectCity)
                    },
                    success(res) {
						console.log(_this.params,JSON.stringify(app.globalData.selectCity));
                        uni.hideLoading();
                        resolve(res.data.data.beanList);
                        if (!res.data.data.beanList.length) {
                            _this.setData({
                                noSchedule: true,
                                hasMore: false
                            });
                            return;
                        }
                        _this.setData({
                            hasMore: pageIndex < res.data.data.tr,
                            cinemas: _this.cinemas.concat(res.data.data.beanList),
                            params: {
                                ..._this.params,
                                pageNum: pageIndex
                            }
                        });
                    }
                });
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

        changeCondition(e) {
            const obj = e.detail;
            uni.showLoading({
                title: '正在加载...'
            });
            this.setData(
                {
                    params: {
                        ...this.params,
                        ...obj,
                        pageNum: 0
                    },
                    cinemas: [],
                    nothing: false
                },
                () => {
                    this.getCinemas(this.params).then((list) => {
                        if (!list.length) {
                            this.setData({
                                nothing: true
                            });
                        }
                        uni.hideLoading();
                    });
                }
            );
        },

        //导航下拉框状态变化时的处理
        toggleShow(e) {
            const item = e.detail.item;
            this.setData({
                isShow: item !== -1
            });
        }
    }
};
</script>
<style>
@import './index.css';
@import '@/templates/loadingMore/loadingMore.css';
</style>
