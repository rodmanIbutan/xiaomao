<template>
    <view>
        <view class="hot" v-if="hcmts.length">
            <view class="comment-title">热门评论</view>
            <view>
                <!-- parse <template is="commentSection" :data="comment" v-for="(comment,index) in (hcmts)" :key="index"></template> -->
                <block name="commentSection" v-for="(comment, index) in hcmts" :key="index">
                    <view class="commentSection">
                        <view><image :src="comment.userAvatarUrl" class="avatar"></image></view>
                        <view class="left">
                            <view class="nickName">
                                <text>{{ comment.userNickname }}</text>
                                <text v-if="comment.purchase" class="buy">购</text>
                            </view>
                            <view class="stars">
                                <image class="movie-star" :src="'/image/user/' + item + '.png'" mode="aspectFill" v-for="(item, index) in comment.stars" :key="index"></image>
                            </view>
                            <view class="content">{{ comment.content }}</view>
                            <view class="footer">
                                <view class="comment-time">{{ comment.calcTime }}</view>
                                <view :class="comment.hasApprove ? 'approve1' : 'approve2'">
                                    <text class="iconfont icon-zan1" @tap="upApprove" :data-hi="comment.id" :data-index="index"></text>
                                    <text @tap="upApprove" :data-hi="comment.id" :data-index="index">{{ comment.approve ? comment.approve : '赞' }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
        <view class="hot" v-if="cmts.length">
            <view class="comment-title">最新评论</view>
            <view>
                <!-- parse <template is="commentSection" :data="comment" v-for="(comment,index) in (cmts)" :key="comment.id"></template> -->
                <block name="commentSection" v-if="false" v-for="(comment, index) in cmts" :key="comment.id">
                    <view class="commentSection">
                        <view><image :src="comment.userAvatarUrl" class="avatar"></image></view>
                        <view class="left">
                            <view class="nickName">
                                <text>{{ comment.userNickname }}</text>
                                <text v-if="comment.purchase" class="buy">购</text>
                            </view>
                            <view class="stars">
                                <image class="movie-star" :src="'/image/user/' + item + '.png'" mode="aspectFill" v-for="(item, index) in comment.stars" :key="index"></image>
                            </view>
                            <view class="content">{{ comment.content }}</view>
                            <view class="footer">
                                <view class="comment-time">{{ comment.calcTime }}</view>
                                <view :class="comment.hasApprove ? 'approve1' : 'approve2'">
                                    <text class="iconfont icon-zan1" @tap="upApprove" :data-hi="comment.id" :data-index="index"></text>
                                    <text @tap="upApprove" :data-hi="comment.id" :data-index="index">{{ comment.approve ? comment.approve : '赞' }}</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </block>
            </view>
        </view>
        <view v-if="cmts.length && hasMore">
            <!-- parse <template is="loadingMore"/> -->
            <block name="loadingMore" v-if="false">
                <view class="loadingMore">
                    <image src="/static/image/user/loading.gif" class="loading-img"></image>
                    <view class="loading-text">正在加载...</view>
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
            movieId: '',
            cmts: [],

            //最新评论
            hcmts: [],

            //热门评论
            hasMore: true,

            //是否还有
            pageNum: 0,

            limit: 6,
            comments: '',

            comment: {
                userAvatarUrl: '',
                userNickname: '',
                purchase: '',
                stars: [],
                content: '',
                calcTime: '',
                hasApprove: false,
                id: '',
                approve: false
            }
        };
    },
    onLoad(options) {
        this.initPage(options);
    },
    onReachBottom() {
        this.getComment(this.movieId);
    },
    methods: {
        //初始化页面
        initPage(options) {
            const movieId = options.movieId;
            const movieName = options.movieName;
            uni.setNavigationBarTitle({
                title: `观众评论-${movieName}`
            });
            uni.showLoading({
                title: '正在加载...'
            });
            this.getHotComment(movieId);
            this.getComment(movieId);
            this.setData({
                movieId
            });
        },

        //获取热门观众评论
        getHotComment(movieId) {
            const _this = this;
            //热门评论
            uni.getStorage({
                key: 'userInfo',
                success: function (res1) {
                    uni.request({
                        url: app.globalData.url + `/Comment/getHotComment/${movieId}`,
                        header: {
                            token: res1.data.data.token
                        },
                        success(res) {
                            uni.hideLoading();
                            _this.setData({
                                hcmts: _this.formatData(res.data.data.comList)
                            });
                        }
                    });
                },
                fail: function (res1) {
                    uni.request({
                        url: app.globalData.url + `/Comment/getHotComment/${movieId}`,
                        success(res) {
                            uni.hideLoading();
                            _this.setData({
                                hcmts: _this.formatData(res.data.data.comList)
                            });
                        }
                    });
                }
            });
        },

        //分页获取最新评论
        getComment(movieId) {
            if (!this.hasMore) {
                return;
            }
            var pageNum = this.pageNum;
            var that = this;
            uni.getStorage({
                key: 'userInfo',
                success: function (res1) {
                    uni.request({
                        url: app.globalData.url + `/Comment/getComment/${movieId}`,
                        method: 'GET',
                        header: {
                            token: res1.data.data.token
                        },
                        data: {
                            pageNum: ++pageNum,
                            limit: that.limit
                        },
                        success: function (res) {
                            console.log(res.data.data);
                            const cmts = that.cmts.concat(that.formatData(res.data.data.beanList));
                            that.setData({
                                hasMore: pageNum < res.data.data.tr,
                                cmts: cmts,
                                pageNum: pageNum
                            });
                        }
                    });
                },
                fail: function (res1) {
                    uni.request({
                        url: app.globalData.url + `/Comment/getComment/${movieId}`,
                        method: 'GET',
                        data: {
                            pageNum: ++pageNum,
                            limit: that.limit
                        },
                        success: function (res) {
                            console.log(res.data.data);
                            const cmts = that.cmts.concat(that.formatData(res.data.data.beanList));
                            that.setData({
                                hasMore: pageNum < res.data.data.tr,
                                cmts: cmts,
                                pageNum: pageNum
                            });
                        }
                    });
                }
            });
        },

        //处理数据
        formatData(arr) {
            let list = [];
            if (arr.length) {
                list = arr.map((item) => {
                    let temp = {
                        ...item
                    };
                    //temp.purchase = !!(temp.tagList && temp.tagList.fixed.some(item => item.id === 4))
                    temp.stars = this.formatStar(temp.sc);
                    temp.calcTime = util.calcTime(temp.calcTime);
                    return temp;
                });
            }
            return list;
        },

        //处理评分星星
        formatStar(sc) {
            //1分对应满星，0.5对应半星
            let stars = new Array(5).fill('star-empty');
            const fullStars = Math.floor(sc); //满星的个数
            const halfStar = sc % 1 ? 'star-half' : 'star-empty'; //半星的个数，半星最多1个
            stars.fill('star-full', 0, fullStars); //填充满星
            if (fullStars < 5) {
                stars[fullStars] = halfStar; //填充半星
            }
            return stars;
        },

        upApprove: function (e) {
            console.log(e);
            var that = this;
            uni.getStorage({
                key: 'userInfo',
                success: function (res1) {
                    console.log(res1.data.data.token);
                    uni.request({
                        url: app.globalData.url + '/Comment/upApprove',
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                            token: res1.data.data.token
                        },
                        data: {
                            commentId: e.target.dataset.hi
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
                                const index = e.target.dataset.index;
                                that.comments.comList[index].hasApprove = !that.comments.comList[index].hasApprove;
                                that.setData({
                                    comments: that.comments
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
@import './comment-page.css';
@import '@/templates/commentSection/commentSection.css';
@import '@/templates/loadingMore/loadingMore.css';
</style>
