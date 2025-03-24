<template>
    <view>
        <view class="container">
            <!-- fd: film detail -->
            <view class="fd-hd">
                <view class="fd-hd-bg" :style="'background-image: url(' + filmDetail.images.large + ')'"></view>
                <image :src="filmDetail.images.large" class="fd-cover"></image>
                <view class="fd-intro">
                    <view class="fd-title">{{ filmDetail.title }}</view>
                    <view class="fd-intro-txt">导演：{{ filmDetail.directors[0].name }}</view>
                    <view class="fd-intro-txt">
                        演员：
                        <block v-for="(filmDetailCastItem, filmDetailCastIndex) in filmDetail.casts" :key="filmDetailCastIndex">
                            {{ filmDetailCastItem.name }}

                            <block v-if="filmDetailCastIndex !== filmDetail.casts.length - 1">/</block>
                        </block>
                    </view>
                    <view class="fd-intro-txt">
                        豆瓣评分：
                        <block v-if="filmDetail.rating.average == 0">暂无评分</block>
                        <block v-else>{{ filmDetail.rating.average }}分</block>
                    </view>
                    <view class="fd-intro-txt">上映年份：{{ filmDetail.year }}年</view>
                </view>
            </view>
            <view class="fd-data">
                <view class="fd-data-item">
                    <view class="fd-data-num">{{ filmDetail.collect_count }}</view>
                    <view class="fd-data-title">看过</view>
                </view>
                <view class="fd-data-item">
                    <view class="fd-data-num">{{ filmDetail.wish_count }}</view>
                    <view class="fd-data-title">想看</view>
                </view>
                <view class="fd-data-item">
                    <view class="fd-data-num">{{ filmDetail.ratings_count }}</view>
                    <view class="fd-data-title">评分人数</view>
                </view>
            </view>
            <view class="fd-bd">
                <view class="fd-bd-title">剧情简介</view>
                <view class="fd-bd-intro">{{ filmDetail.summary }}</view>
                <view class="fd-bd-title">导演/演员</view>
                <view class="fd-bd-person">
                    <view class="fd-bd-person-item">
                        <image class="fd-bd-person-avatar" :src="filmDetail.directors[0].avatars.medium"></image>
                        <view class="fd-bd-person-name">{{ filmDetail.directors[0].name }}</view>
                        <view class="fd-bd-person-role">导演</view>
                    </view>
                    <block v-for="(filmDetailCastItem, index) in filmDetail.casts" :key="index">
                        <view class="fd-bd-person-item">
                            <image class="fd-bd-person-avatar" :src="filmDetailCastItem.avatars.medium"></image>
                            <view class="fd-bd-person-name">{{ filmDetailCastItem.name }}</view>
                            <view class="fd-bd-person-role">演员</view>
                        </view>
                    </block>
                </view>
                <view class="fd-bd-title">标签</view>
                <view class="fd-bd-tag">
                    <block v-for="(filmDetailTagItem, index) in filmDetail.genres" :key="index">
                        <view class="fd-bd-tag-item">{{ filmDetailTagItem }}</view>
                    </block>
                </view>
            </view>
        </view>

        <!-- parse <template is="message" :data="message: message"/> -->
        <block name="message">
            <view class="message-area" v-if="!(message.visiable ? false : true)">
                <view class="message">
                    <view :class="'message-icon message-icon-' + message.icon"></view>
                    <view class="message-content">{{ message.content }}</view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
var douban = require('../../../locale/fetch.js');
var util = require('../../../utils/util.js');
var config = require('../../../locale/config.js');
export default {
    data() {
        return {
            filmDetail: {
                images: {
                    large: ''
                },

                title: '',
                directors: '',
                casts: [],

                rating: {
                    average: 0
                },

                year: '',
                collect_count: '',
                wish_count: '',
                ratings_count: '',
                summary: '',
                genres: []
            },

            showLoading: true,
            isFilmFavorite: false,
            name: '',
            filmDetailCastIndex: 0,

            avatars: {
                medium: ''
            },

            filmDetailCastItem: {
                avatars: {
                    medium: ''
                },

                name: ''
            },

            filmDetailTagItem: '',

            message: {
                visiable: false,
                icon: '',
                content: ''
            }
        };
    },
    onLoad: function (options) {
        this.onLoadClone3389(options);
    },
    onPullDownRefresh: function () {
        var data = {
            id: this.filmDetail.id
        };
        this.onLoadClone3389(data, {});
    },
    methods: {
        onLoadClone3389: function (options) {
            var that = this;
            var id = options.id;
            douban.fetchFilmDetail.call(that, config.apiList.filmDetail, id, function (data) {
                /// 判断是否收藏
                uni.getStorage({
                    key: 'film_favorite',

                    success: function (res) {
                        for (var i = 0; i < res.data.length; i++) {
                            if (res.data[i].id == data.id) {
                                that.setData({
                                    isFilmFavorite: true
                                });
                            }
                        }
                    }
                });
                // 存储浏览历史
                var date = util.getDate();
                var time = util.getTime();
                var film_history = [];
                console.log('----进入----');
                uni.getStorage({
                    key: 'film_history',

                    success: function (res) {
                        film_history = res.data;
                        console.log('----获取缓存----');
                        console.log(res.data);
                        // 当前的数据
                        var now_data = {
                            time: time,
                            data: data
                        };
                        // 今天的数据，没有时插入
                        var sub_data = {
                            date: date,
                            films: []
                        };
                        sub_data.films.push(now_data);
                        if (film_history.length == 0) {
                            // 判断是否为空
                            console.log('----为空插入----');
                            film_history.push(sub_data);
                        } else if ((film_history[0].date = date)) {
                            //判断第一个是否为今天
                            console.log('----今日插入----');
                            console.log(film_history[0].films.length);
                            for (var i = 0; i < film_history[0].films.length; i++) {
                                // 如果存在则删除，添加最新的
                                if (film_history[0].films[i].data.id == data.id) {
                                    film_history[0].films.splice(i, 1);
                                }
                            }
                            film_history[0].films.push(now_data);
                        } else {
                            // 不为今天(昨天)插入今天的数据
                            console.log('----昨日插入今日----');
                            film_history.push(sub_data);
                        }
                        uni.setStorage({
                            key: 'film_history',
                            data: film_history,

                            success: function (res) {
                                console.log(res);
                                console.log('----设置成功----');
                            }
                        });
                        console.log(film_history);
                    },

                    fail: function (res) {
                        console.log('----获取失败----');
                        console.log(res);
                    }
                });
            });
        }
    }
};
</script>
<style>
@import './filmDetail.css';
@import '@/components/message/message.css';
</style>
