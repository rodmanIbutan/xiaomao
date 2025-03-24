<template>
    <view v-if="info && current !== -1">
        <view class="video-box">
            <!-- video是原生组件，有很多限制，如不能设置position: fixed；设置其父元素position也不行，所以下面用scroll-view。 -->
            <video id="my-video" :src="videoList[current].videourl" autoplay @ended="endHandle" @error="errorHandle"></video>
        </view>
        <scroll-view class="my-scroll" scroll-y>
            <view class="movie-intro-desc">
                <view class="name-box">
                    <view class="name">{{ info.movieName }}</view>
                    <view class="tag-box" v-if="info.version">
                        <text class="tag-d">{{ info.version[0] }}</text>
                        <text v-if="info.version[1]" class="tag-imax">{{ info.version[1] }}</text>
                    </view>
                </view>
                <view class="sc-box">
                    <view v-if="info.globalReleased" class="">
                        <view v-if="info.sc">
                            评分
                            <text class="yellow">{{ info.sc }}</text>
                        </view>
                        <view v-else>暂无评分</view>
                    </view>
                    <view v-else>
                        <text class="yellow">{{ info.wish }}</text>
                        人想看
                    </view>
                </view>
                <view class="release">{{ info.release }} {{ info.rt }}</view>
                <view class="buy-tickets">
                    <view v-if="info.showst === 3" class="btn" @tap="goTo">购票</view>
                    <view v-else-if="info.showst === 1" :class="'btn ' + (isWish ? 'want-see' : '')" @tap="wantToWatch">
                        <text v-if="isWish">已想看</text>
                        <text v-else>想看</text>
                    </view>
                    <view v-else-if="info.showst === 2" class="btn pre-sale" @tap="goTo">预售</view>
                </view>
            </view>
            <view class="list-box" v-if="videoList.length">
                <view class="play-title">播放列表 （{{ videoList.length }}）</view>
                <view class="video-item" @tap="selectItem" :data-index="index" v-for="(item, index) in videoList" :key="index">
                    <view class="img-box">
                        <image :src="item.videoImg" mode="aspectFill"></image>
                        <view class="txt" v-if="current === index">播放中</view>
                    </view>

                    <view :class="'video-name ' + (current === index ? 'red' : '')">{{ item.videoName }}</view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
const util = require('../../../utils/util.js');
const getRandom = util.getRandom;
const app = getApp();
export default {
    data() {
        return {
            info: null,
            videoList: [],

            //播放列表
            current: -1,

            //当前播放视频索引
            infoList: [],

            isWish: false,
            videourl: ''
        };
    },
    onLoad(opt) {
        const paramsObj = JSON.parse(opt.paramsStr);
        this.initData(paramsObj);
    },
    methods: {
        initData(obj) {
            //没有获取video列表的API，所以只能自己模拟一个播放列表
            // const random = getRandom(1, 4)
            //const videoList = new Array(random).fill(obj.video)
            var that = this;
            uni.getStorage({
                key: 'userInfo',
                success: function (res1) {
                    uni.request({
                        url: app.globalData.url + `/home/getLikeMovieList?movieId=${obj.id}&cat=${obj.cat}`,
                        method: 'GET',
                        header: {
                            token: res1.data.data.token
                        },
                        success(res) {
                            console.log(res);
                            var likeVideos = res.data.data;
                            const videoList = [
                                {
                                    ...obj.video
                                }
                            ];
                            for (var i in likeVideos) {
                                videoList.push({
                                    videourl: likeVideos[i].videoUrl,
                                    videoImg: likeVideos[i].videoImg,
                                    videoName: likeVideos[i].videoName
                                });
                            }
                            // likeVideos.unshift(obj);
                            that.setData(
                                {
                                    videoList,
                                    info: obj,
                                    infoList: likeVideos
                                },
                                () => {
                                    that.setCurrent(0);
                                }
                            );
                        }
                    });
                },
                fail: function (res1) {
                    uni.request({
                        url: app.globalData.url + `/home/getLikeMovieList?movieId=${obj.id}&cat=${obj.cat}`,
                        method: 'GET',
                        success(res) {
                            console.log(res);
                            var likeVideos = res.data.data;
                            const videoList = [
                                {
                                    ...obj.video
                                }
                            ];
                            for (var i in likeVideos) {
                                videoList.push({
                                    videourl: likeVideos[i].videoUrl,
                                    videoImg: likeVideos[i].videoImg,
                                    videoName: likeVideos[i].videoName
                                });
                            }
                            // likeVideos.unshift(obj);
                            that.setData(
                                {
                                    videoList,
                                    info: obj,
                                    infoList: likeVideos
                                },
                                () => {
                                    that.setCurrent(0);
                                }
                            );
                        }
                    });
                }
            });
        },

        //设置当前播放视频
        setCurrent(current) {
            var { info, videoList } = this;
            if (current > 0) {
                const detailMovie = this.infoList[current - 1];
                info = {
                    movieName: detailMovie.nm,
                    //电影名称
                    id: detailMovie.id,
                    //电影ID
                    version:
                        detailMovie.version &&
                        detailMovie.version.split(' ').map((item) => {
                            return item.toUpperCase().replace('V', '');
                        }),
                    //电影类型（3d、IMAX）
                    release: detailMovie.src,
                    //上映时间
                    rt: detailMovie.rt,
                    //电影上映时间
                    wish: detailMovie.wish,
                    //想看的人数
                    globalReleased: detailMovie.globalreleased,
                    //是否上映
                    sc: detailMovie.sc,
                    //评分
                    showst: detailMovie.showst,
                    //判读“想看”、“预售”
                    cat: detailMovie.cat
                };
            }
            if (info.showst == 1) {
                var that = this;
                uni.getStorage({
                    key: 'userInfo',
                    success: function (res1) {
                        uni.request({
                            url: app.globalData.url + '/home/getIsWish',
                            method: 'GET',
                            header: {
                                token: res1.data.data.token
                            },
                            data: {
                                movieId: info.id
                            },
                            success: function (res) {
                                that.setData({
                                    isWish: res.data.data
                                });
                            }
                        });
                    }
                });
            }
            uni.setNavigationBarTitle({
                title: `${info.movieName} ${videoList[current].videoName}`
            });
            this.setData({
                info,
                current
            });
        },

        //播放列表的点击事件
        selectItem(e) {
            const index = e.currentTarget.dataset.index;
            if (index !== this.current) {
                this.setCurrent(index);
            }
        },

        //视频播放结束
        endHandle() {
            const { current, videoList } = this;
            let index = current + 1;
            if (index === videoList.length) {
                index = 0;
            }
            this.setCurrent(index);
        },

        //播放错误时
        errorHandle() {
            uni.showToast({
                title: '播放错误',
                icon: 'none'
            });
        },

        //购票
        goTo() {
            const info = this.info;
            const VideoContext = uni.createVideoContext('my-video', this);
            VideoContext.pause();
            uni.navigateTo({
                url: `../select-cinema/select-cinema?movieId=${info.id}&movieName=${info.movieName}&showTime=${info.rt}`
            });
        },

        //想看
        wantToWatch: function () {
            var that = this;
            uni.getStorage({
                key: 'userInfo',
                success: function (res1) {
                    console.log(res1.data.data.token);
                    uni.request({
                        url: app.globalData.url + '/home/updateWish',
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                            token: res1.data.data.token
                        },
                        data: {
                            movieId: that.movieId
                        },
                        success: function (res) {
                            if (res.data.state == 202) {
                                uni.showModal({
                                    content: '您还未登录',
                                    success(res) {
                                        uni.switchTab({
                                            url: '/pages/user/user'
                                        });
                                    }
                                });
                            } else {
                                that.setData({
                                    isWish: !that.isWish
                                });
                                var pages = getCurrentPages();
                                var prevPage = pages[pages.length - 2]; //上一个页面
                                var isWish = prevPage.data.isWish;
                                prevPage.setData({
                                    isWish: !isWish
                                });
                            }
                        }
                    });
                },
                fail: function (res1) {
                    uni.showModal({
                        content: '您还未登录',
                        success(res) {
                            uni.switchTab({
                                url: '/pages/user/user'
                            });
                        }
                    });
                }
            });
        }
    }
};
</script>
<style>
@import './video-page.css';
</style>
