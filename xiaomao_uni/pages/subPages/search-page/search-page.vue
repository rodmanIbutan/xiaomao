<template>
    <view class="search-wrapper">
        <view class="search-header topbar">
            <input class="search-input" placeholder-class="phcolor" :placeholder="placeholder" @confirm="search" />
            <text class="iconfont icon-sousuo"></text>
            <view class="cancel" @tap="goBack">取消</view>
        </view>

        <view class="result-list">
            <view v-if="history.length !== 0" class="options" style="margin-top: 98rpx">
                <text>历史搜索记录</text>
                <text @tap="clearHistory">清空</text>
            </view>
            <view class="options">
                <!-- 遍历 history 数组 -->
                <text class="item" :data-index="index" @tap="search" v-for="(item, index) in history" :key="index">{{ item }}</text>
            </view>
            <view v-if="movies.length" class="movie-box">
                <view class="title">电影</view>
                <navigator class="movie-section" :url="'/pages/subPages/movie-detail/movie-detail?movieId=' + movie.id" v-for="(movie, index) in movies" :key="movie.id">
                    <image class="movie-img" :src="movie.img"></image>

                    <view class="movie-info">
                        <view class="movie-name line-ellipsis">
                            {{ movie.nm }}
                            <text :class="'version ' + movie.version"></text>
                        </view>
                        <view class="line-ellipsis">{{ movie.enm }}</view>
                        <view class="line-ellipsis">{{ movie.cat }}</view>
                        <view class="line-ellipsis">{{ movie.rt }}</view>
                    </view>

                    <view class="score">
                        <text class="grade" v-if="movie.sc">{{ movie.sc }}分</text>
                        <text v-else>暂无评分</text>
                    </view>
                </navigator>
            </view>
            <view v-if="cinemas.length">
                <view class="title">影院</view>
                <!-- parse <template is="cinemaSection" :data="cinema" v-for="(cinema,index) in (cinemas)" :key="cinema.id"></template> -->
                <block name="cinemaSection" v-for="(cinema, index) in cinemas" :key="cinema.id">
                    <navigator class="cinema-section" :url="'/pages/subPages/cinema-detail/cinema-detail?cinemaId=' + cinema.cinema.id" hover-class="none">
                        <view class="name-price line-ellipsis">{{ cinema.cinema.nm }}</view>
                        <view class="address">
                            <text class="line-ellipsis">{{ cinema.cinema.addr }}</text>
                            <text class="distance">{{ cinema.cinema.distance }}km</text>
                        </view>
                        <view class="feature-tags">
                            <text v-if="cinema.cinema.endorse">退</text>
                            <text v-if="cinema.cinema.allowrefund">改签</text>
                            <text v-for="(item, index) in cinema.hallTypeList" :key="index">{{ item.halltype }}</text>
                        </view>
                    </navigator>
                </block>
            </view>
        </view>
        <view v-if="!(movies.length || cinemas.length || !value)">
            <!-- parse <template is="nothing" :data="message:'没有找到相关内容'"/> -->
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
const util = require('../../../utils/util.js');
const app = getApp();
export default {
    data() {
        return {
            value: '',
            stype: '',
            placeholder: '',
            movies: {},
            cinemas: {},
            history: [],

            movie: {
                id: '',
                img: '',
                version: '',
                enm: '',
                cat: '',
                rt: '',
                sc: ''
            },

            cinema: {
                id: '',

                cinema: {
                    id: '',
                    nm: '',
                    addr: '',
                    distance: '',
                    endorse: '',
                    allowrefund: ''
                },

                hallTypeList: []
            }
        };
    },
    onLoad(query) {
        this.initPage(query);
        this.setData({
            history: uni.getStorageSync('history') || []
        });
    },
    methods: {
        initPage(query) {
            //搜索类型，-1代表搜索影院或电影，2代表搜索影院
            const stype = query.stype;
            let placeholder = '';
            if (stype === '-1') {
                placeholder = '搜电影、搜影院';
            } else {
                placeholder = '搜影院';
            }
            this.setData({
                stype,
                placeholder
            });
        },

        search(e) {
            var value = e.detail.value;
            const _this = this;
            console.log(e.target.dataset.index);
            if (e.target.dataset.index != null) {
                value = _this.history[e.target.dataset.index];
            } else {
                let history = uni.getStorageSync('history') || [];
                history.push(value);
                uni.setStorageSync('history', history);
            }
            this.setData({
                value,
                history: []
            });
            uni.request({
                url: app.globalData.url + `/home/search`,
                method: 'POST',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    keyword: value,
                    stype: _this.stype,
                    selectCity: JSON.stringify(app.globalData.selectCity)
                },
                success(res) {
                    console.log(res);
                    for (var index in res.data.data.movies) {
                        res.data.data.movies[index].rt = util.formatYear(new Date(res.data.data.movies[index].rt));
                    }
                    _this.setData({
                        movies: res.data.data.movies ? res.data.data.movies : [],
                        cinemas: res.data.data.cinemaVos ? res.data.data.cinemaVos : []
                    });
                }
            });
        },

        goBack() {
            uni.navigateBack({
                delta: 1
            });
        },

        //清除缓存历史
        clearHistory: function () {
            this.setData({
                history: []
            });
            uni.setStorageSync('history', []);
        }
    }
};
</script>
<style>
@import './search-page.css';
@import '@/templates/cinemaSection/cinemaSection.css';
@import '@/templates/nothing/nothing.css';
</style>
