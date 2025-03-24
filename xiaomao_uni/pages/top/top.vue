<template>
    <view>
        <!-- parse <template is="filmList" :data="films: films"/> -->
        <block name="filmList">
            <view class="film">
                <block v-for="(filmItem, filmIndex) in films" :key="filmIndex">
                    <view :data-id="filmItem.subject.id" class="film-item" @tap.stop.prevent="viewFilmDetail">
                        <view class="film-cover">
                            <image :src="filmItem.subject.images.large" class="film-cover-img"></image>
                            <view class="film-rating">
                                <block v-if="filmItem.subject.rating.average == 0">暂无评分</block>
                                <block v-else>{{ filmItem.subject.rating.average }}分</block>
                            </view>
                        </view>
                        <view class="file-intro">
                            <view class="film-title">{{ filmItem.subject.title }}</view>
                            <view class="film-tag">
                                <view class="film-tag-item" v-for="(filmTagItem, index) in filmItem.subject.genres" :key="index">
                                    {{ filmTagItem }}
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
            </view>
        </block>

        <!-- parse <template is="message" :data="message: message"/> -->
        <block name="message" v-if="false">
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
var douban = require('../../locale/fetch.js');
var config = require('../../locale/config.js');
export default {
    data() {
        return {
            films: [],
            hasMore: true,
            start: 0,
            filmIndex: 0,

            filmItem: {
                subject: {
                    id: '',

                    images: {
                        large: ''
                    },

                    rating: {
                        average: 0
                    },

                    title: '',
                    genres: []
                }
            },

            filmTagItem: '',

            message: {
                visiable: false,
                icon: '',
                content: ''
            }
        };
    },
    onLoad: function () {
        var that = this;
        // douban.fetchFilms.call(that, config.apiList.top, that.data.start)
        douban.fetchFilms.call(that, config.apiList.weekly);
    },
    onPullDownRefresh: function () {
        var that = this;
        uni.showLoading({
            title: '加载中...'
        });
        that.setData({
            films: [],
            hasMore: true,
            start: 0
        });
        douban.fetchFilms.call(that, config.apiList.weekly);
        uni.hideLoading();
    },
    onReachBottom: function () {
        // var that = this
        // if (that.data.hasMore) {
        // 	douban.fetchFilms.call(that, config.apiList.top, that.data.start)
        // }
    },
    methods: {
        viewFilmDetail: function (e) {
            var data = e.currentTarget.dataset;
            uni.navigateTo({
                url: '/pages/subPages/filmDetail/filmDetail?id=' + data.id
            });
        }
    }
};
</script>
<style>
@import './top.css';
@import '@/components/filmList/filmList.css';
@import '@/components/message/message.css';
</style>
