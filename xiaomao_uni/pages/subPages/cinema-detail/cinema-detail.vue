<template>
    <view v-if="cinemaDetail">
        <view>
            <!-- parse <template is="cinemaMap" :data="cinemaData:cinemaDetail"/> -->
            <block name="cinemaMap">
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
        <view style="background-color: #fff">
            <view>
                <select-movie :movies="movies" @selectMovie="selectMovie" :defaultSelectID="movieId" />
            </view>
            <view class="movie-info" v-if="movie">
                <view class="movie-title line-ellipsis">
                    <text class="title">{{ movie.nm }}</text>
                    <text class="grade">
                        <text v-if="!movie.globalreleased">
                            {{ movie.wish }}
                            <text class="small">人想看</text>
                        </text>
                        <text v-else-if="movie.sc">
                            {{ movie.sc }}
                            <text class="small">分</text>
                        </text>
                        <text v-else><text class="small">暂无评分</text></text>
                    </text>
                </view>
                <view class="movie-desc line-ellipsis">{{ movie.dur }}分钟 | {{ movie.cat }} | {{ movie.star }}</view>
            </view>
        </view>
        <view style="background-color: #fff">
            <select-time :days="days" @selectDayEvent="selectDay" :defaultSelect="day"></select-time>
        </view>
        <view>
            <view style="background-color: #fff" v-if="timeList.length">
                <view class="time item" @tap="buyTicket" :data-info="item" v-for="(item, index) in timeList" :key="item.tm">
                    <view class="time-block box">
                        <view class="begin">{{ item.beginTime }}</view>
                        <view class="end">{{ item.endTime }} 散场</view>
                    </view>

                    <view class="info-block box">
                        <view class="lan line-ellipsis">国语 {{ item.version[0] }}</view>
                        <view class="hall line-ellipsis">{{ item.hallId }} 号厅</view>
                    </view>

                    <view class="price box">
                        <view class="price-box line-ellipsis">
                            <view class="sellPr">
                                <text class="stonefont">{{ item.price }}</text>
                                <text class="d">元</text>
                            </view>
                            <view class="vipPrice" v-if="item.vipPriceName || item.vipPriceNameNew">
                                <text class="icon">{{ item.vipPriceName || item.vipPriceNameNew }}</text>
                                <text class="num">{{ item.vipPrice }}</text>
                            </view>
                        </view>
                        <view class="discount line-ellipsis" v-if="item.extraDesc">{{ item.extraDesc }}</view>
                    </view>

                    <view class="button-block">
                        <view class="button">购票</view>
                    </view>
                </view>
            </view>
            <view v-else class="no-seat">
                <image src="/static/image/user/cinema2.png"></image>
                <text>{{ movie.globalReleased ? '今日场次已映完' : '影片未上映' }}</text>
            </view>
        </view>
        <view class="tuan-list" v-if="divideDealList.length">
            <view class="title">影院超值套餐</view>
            <view class="tuan-item">
                <view class="snack-item" @tap="goSnackPage" :data-info="i" v-for="(i, index) in divideDealList" :key="index">
                    <view>
                        <image :src="i.imageUrl"></image>
                    </view>

                    <view class="snack-info">
                        <view class="first-title">{{ i.firstTitle }}</view>
                        <view class="second-title line-ellipsis">{{ i.secondTitle }}</view>
                        <view class="snack-price">
                            <view>
                                <text class="num">{{ i.price }}</text>
                                <text class="rmb">元</text>
                            </view>
                            <view class="font">已售：{{ i.curNumber }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import selectTime from '@/components/select-time/select-time';
import selectMovie from '@/components/select-movie/select-movie';
const util = require('../../../utils/util.js');
const app = getApp();
const formatNumber = util.formatNumber;
const getRandom = util.getRandom;
export default {
    components: {
        selectTime,
        selectMovie
    },
    data() {
        return {
            cinemaId: '',
            movieId: '',
            cinemaDetail: null,

            //影院详情
            movie: null,

            //选中的电影
            movies: null,

            //电影列表
            days: [],

            //该电影的排片日期列表
            timeList: [],

            //当天播放电影的时间段
            divideDealList: [],

            //影院分类零食列表
            //只在第一次提示
            first: true,

            day: '',

            i: {
                imageUrl: '',
                firstTitle: '',
                secondTitle: '',
                price: '',
                curNumber: ''
            }
        };
    },
    onLoad(query) {
        this.initPage(query);
    },
    methods: {
        //初始化页面
        initPage(query) {
            const { cinemaId = '', movieId = '', day = '' } = query;
            this.setData({
                cinemaId,
                movieId,
                day
            });
            const _this = this;
            uni.showLoading({
                title: '正在加载...'
            });
            uni.request({
                url: app.globalData.url + `/cinema/getCinema/${cinemaId}`,
                method: 'GET',
                data: {
                    movieId: _this.movieId
                },
                success(res) {
                    uni.hideLoading();
                    _this.setData({
                        cinemaDetail: res.data.data.cinema,
                        movies: res.data.data.movies,
                        divideDealList: res.data.data.snacks
                    });
                }
            });
        },

        //选择电影
        selectMovie(e) {
            const movie = e.detail.movie;
            console.log(movie);
            let days = [];
            movie.movieDays.forEach((item) => {
                days.push({
                    title: util.formatDate(new Date(item.day)),
                    day: item.day
                });
            });
            this.setData({
                movie,
                days,
                timeList: this.createEndTime(movie.movieDays[0].times, movie.dur, movie.version)
            });
        },

        //选择时间
        selectDay(e) {
            const day = e.detail.day;
            const movie = this.movie;
            const index = movie.movieDays.findIndex((item) => item.day === day);
            console.log(movie.movieDays);
            this.setData({
                timeList: this.createEndTime(movie.movieDays[index].times, movie.dur, movie.version)
            });
        },

        //跳转到“套餐详情”页面
        goSnackPage(e) {
            const info = e.currentTarget.dataset.info;
            //将参数转化为JSON通过页面跳转时传递
            const paramsStr = JSON.stringify({
                cinemaName: this.cinemaDetail.nm,
                cinemaId: this.cinemaId,
                cinemaData: this.cinemaDetail,
                //影院信息
                info: info
            });
            uni.navigateTo({
                url: `/pages/subPages/snack-page/snack-page?paramsStr=${encodeURIComponent(paramsStr)}`
            });
        },

        //购票
        buyTicket(e) {
            const info = JSON.stringify(e.currentTarget.dataset.info);
            console.log(info);
            const movie = JSON.stringify(this.movie);
            const cinema = JSON.stringify(this.cinemaDetail);
            uni.navigateTo({
                url: `/pages/subPages/seat/hall?movie=${movie}&info=${info}&cinema=${cinema}`
            });
        },

        //处理散场时间
        createEndTime(arr, dur, version) {
            let timeList = [];
            if (Array.isArray(arr)) {
                timeList = arr.map((item) => {
                    let temp = {
                        ...item
                    };
                    temp.version =
                        version &&
                        version.split(' ').map((item) => {
                            return item.toUpperCase().replace('V', '');
                        });
                    console.log(item.startTime);
                    var time = new Date(item.startTime);
                    console.log(time);
                    temp.beginTime = `${formatNumber(time.getHours())}:${formatNumber(time.getMinutes())}`;
                    time = time.setMinutes(time.getMinutes() + dur);
                    const endTime = new Date(time);
                    temp.endTime = `${formatNumber(endTime.getHours())}:${formatNumber(endTime.getMinutes())}`;
                    return temp;
                });
            }
            return timeList;
        }
    }
};
</script>
<style>
@import './cinema-detail.css';
@import '@/templates/cinemaMap/cinemaMap.css';
</style>
