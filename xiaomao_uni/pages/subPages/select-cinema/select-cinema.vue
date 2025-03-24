<template>
    <view class="container" :style="'position:' + (isShow ? 'fixed' : '')">
        <view class="top">
            <view>
                <select-time :start-time="showTime" @selectDayEvent="changeTime"></select-time>
            </view>
            <view>
                <filter-nav :city-cinema-info="cityCinemaInfo" @change="changeCondition" @toggleShow="toggleShow" v-if="isShow"></filter-nav>
            </view>
        </view>
        <view class="main-content">
            <view class="cinema-list">
                <block v-for="(item, index) in cinemas" :key="index">
                    <navigator
                        :url="'/pages/subPages/cinema-detail/cinema-detail?cinemaId=' + item.cinema.id + '&movieId=' + params.movieId + '&day=' + params.dateTime"
                        hover-class="none"
                    >
                        <view class="flex item">
                            <view class="flex_auto item_left">
                                <view>
                                    <text class="title">{{ item.cinema.nm }}</text>
                                </view>
                                <view>
                                    <text class="sub_title">{{ item.cinema.addr }}</text>
                                </view>
                                <view class="tag">
                                    <text v-if="item.cinema.endorse">改签</text>
                                    <text v-if="item.cinema.allowrefund">退票</text>
                                    <text v-for="(item, index1) in item.hallTypeList" :key="index1">{{ item.halltype }}</text>
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
            </view>
            <view v-if="cinemas.length > 0 && hasMore">
                <!-- parse <template is="loadingMore"/> -->
                <block name="loadingMore" v-if="false">
                    <view class="loadingMore">
                        <image src="/static/image/user/loading.gif" class="loading-img"></image>
                        <view class="loading-text">正在加载...</view>
                    </view>
                </block>
            </view>
            <view v-if="nothing">
                <!-- parse <template is="nothing" :data="message:'暂无符合条件的影院'"/> -->
                <block name="nothing" v-if="false">
                    <view class="nothing">
                        <image src="/static/image/user/nothing.png" class="nothing-img"></image>
                        <view class="nothing-text">{{ '没有找到相关内容' }}</view>
                    </view>
                </block>
            </view>
            <view v-if="noSchedule">
                <!-- parse <template is="nothing" :data="message:'当天暂无场次'"/> -->
                <block name="nothing" v-if="false">
                    <view class="nothing">
                        <image src="/static/image/user/nothing.png" class="nothing-img"></image>
                        <view class="nothing-text">{{ '没有找到相关内容' }}</view>
                    </view>
                </block>
            </view>
        </view>
    </view>
</template>

<script>
import filterNav from '@/components/filter-nav/filter-nav';
import selectTime from '@/components/select-time/select-time';
const util = require('../../../utils/util.js');
const app = getApp();
export default {
    components: {
        filterNav,
        selectTime
    },
    data() {
        return {
            showTime: '',

            //影片上映日期
            params: {
                //url请求参数对象
                dateTime: '',
                movieId: 0,
                pageNum: 0,
                limit: 8,
                hallType: -1,
                brandId: -1,
                serviceId: -1,
                selectRegion: ''
            },

            hasMore: true,
            isShow: false,

            //导航下拉框是否展开
            cityCinemaInfo: {},

            //影院过滤菜单
            cinemas: [],

            //影院列表
            nothing: false,

            //是否有符合过滤的影院
            //当天是否有场次，原本时间是由后台返回的，但是缺少城市ID就没有返回，导致当天可能没有播放场次
            noSchedule: false,

            pageNum: ''
        };
    },
    onLoad(options) {
        this.initPage(options);
    },
    //上拉触底加载更多
    onReachBottom(e) {
        if (!this.hasMore) {
            return;
        }
        this.getCinemas(this.params);
    },
    methods: {
        initPage(options) {
            const movieId = options.movieId;
            const movieName = options.movieName;
            const showTime = options.showTime; //影片上映日期
            uni.setNavigationBarTitle({
                title: movieName
            });
            var that = this;
            this.setData({
                showTime: util.formatYear(new Date()),
                params: {
                    ...that.params,
                    movieId: movieId
                }
            });
            //select-time会触发事件来调用changeTime初始化数据
        },

        //获取影院列表
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
                        uni.hideLoading();
                        // 缺少了城市ID所以返回值缺少showDays，只能自己模拟时间了
                        resolve(res.data.data.beanList);
                        console.log(res.data.data);
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
                            pageNum: pageIndex
                        });
                    }
                });
            });
        },

        //获取过滤菜单数据
        getFilter() {
            const _this = this;
            uni.request({
                url: app.globalData.url + '/cinema/getFilters',
                method: 'POST',
                data: app.globalData.selectCity,
                success: function (res) {
                    console.log(res.data);
                    _this.setData({
                        cityCinemaInfo: res.data
                    });
                }
            });
        },

        //当选择的时间变化时触发
        changeTime(e) {
            var that = this;
            const day = util.formatYear(new Date(e.detail.day));
            this.setData({
                cinemas: [],
                isShow: false,
                //隐藏过滤下拉框
                noSchedule: false,
                hasMore: true,
                params: {
                    ...that.params,
                    dateTime: day,
                    pageNum: 0
                }
            });
            uni.showLoading({
                title: '正在加载...'
            });
            this.getCinemas(this.params);
            this.getFilter();
        },

        //当过滤条件变化时调用的函数
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

        //导航下拉框状态变化时的处理，在下拉框展开时禁止滚动穿透
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
@import './select-cinema.css';
@import '@/templates/nothing/nothing.css';
@import '@/templates/loadingMore/loadingMore.css';
</style>
