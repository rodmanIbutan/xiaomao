<template>
    <view v-if="detailMovie">
        <view class="movie-header">
            <view class="movie-background" :style="movieBackground"></view>
            <view class="movie-mask"></view>
            <view class="movie-content">
                <view class="movie-poster" :style="moviePoster"></view>
                <view class="movie-info">
                    <view class="movie-name line-ellipsis">{{ detailMovie.movie.nm }}</view>
                    <view class="movie-ename line-ellipsis">{{ detailMovie.movie.enm }}</view>
                    <view v-if="detailMovie.movie.globalreleased">
                        <view v-if="detailMovie.movie.sc">
                            <view class="movie-score line-ellipsis">
                                <image class="movie-star" :src="'/image/user/' + item + '.png'" v-for="(item, index) in detailMovie.movie.stars" :key="index"></image>
                                {{ detailMovie.movie.sc }}
                            </view>
                            <view class="score-num line-ellipsis">({{ detailMovie.movie.snum }}万人评分)</view>
                        </view>
                        <view class="no-score" v-else>暂无评分</view>
                    </view>
                    <view v-else class="movie-score">{{ detailMovie.movie.wish }}人想看</view>
                    <view class="movie-category line-ellipsis">
                        <view>{{ detailMovie.movie.cat }}</view>
                        <view class="tag-box" v-if="detailMovie.movie.version">
                            <text class="tag-d">{{ detailMovie.movie.version[0] }}</text>
                            <text v-if="detailMovie.movie.version[1]" class="tag-imax">{{ detailMovie.movie.version[1] }}</text>
                        </view>
                    </view>
                    <view class="movie-time line-ellipsis">{{ detailMovie.movie.src }} / {{ detailMovie.movie.dur }}分钟</view>
                    <view class="movie-time line-ellipsis">{{ detailMovie.movie.rt }} 上映</view>
                </view>
                <view class="two-button">
                    <button class="wish-button" hover-class="wish-button-hover" @tap="wantToWatch">
                        <text :class="'fa fa-heart ' + (isWish ? 'isWish' : '')" />
                        <text style="margin-left: 10rpx">想看</text>
                    </button>
                    <button :class="isComment ? 'isComment' : 'wish-button'" hover-class="wish-button-hover" @tap="goCommentWrite">
                        <text class="fa fa-star" />
                        <text style="margin-left: 10rpx">评论</text>
                    </button>
                </view>
            </view>
        </view>
        <view class="movie-body">
            <view class="section">
                <view class="section-title">剧情简介</view>
                <view class="synopsis" :style="'height:' + (isFold ? '120rpx' : 'auto')">{{ detailMovie.movie.dra }}</view>
                <view :class="'iconfont icon-jiantouarrow483 ' + (isFold ? '' : 'unfold')" @tap="toggleFold"></view>
            </view>
            <view class="section">
                <view class="section-title">演职人员</view>
                <scroll-view scroll-x class="scroll-view_H">{{ detailMovie.movie.star }}</scroll-view>
            </view>
            <view class="section">
                <view class="section-title">媒体库</view>
                <scroll-view scroll-x class="scroll-view_H">
                    <view v-if="!detailMovie.movie.videoImg && !detailMovie.photos.length">暂无数据...</view>
                    <view class="videoImg-box" v-if="detailMovie.movie.videoImg" @tap="toVideo">
                        <image :src="serverHost+detailMovie.movie.videoImg" class="videoImg" mode="aspectFill"></image>
                        <view class="iconfont icon-zanting"></view>
                    </view>
                    <image :src="item" class="photo" mode="aspectFill" @tap="previewImage" :data-index="index" v-for="(item, index) in detailMovie.photos" :key="index"></image>
                </scroll-view>
            </view>
            <view class="section" v-if="comments.total">
                <view class="section-title comment">
                    <text>观众评论</text>
                    <view style="flex: 1" />
                    <button class="writeComm" @tap="goCommentWrite">写短评</button>
                </view>
                <view>
                    <!-- parse <template is="commentSection" :data="comment,index:index" v-for="(comment,index) in (comments.comList)" :key="index"></template> -->
                    <block name="commentSection" v-if="false" v-for="(comment, index) in comments.comList" :key="index">
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
                <navigator v-if="comments.total > 3" class="total" :url="'../comment-page/comment-page?movieId=' + detailMovie.movie.id + '&movieName=' + detailMovie.movie.nm">
                    查看全部{{ comments.total }}条短评
                </navigator>
            </view>
        </view>
        <navigator
            v-if="showst != 1"
            hover-class="none"
            :url="'/pages/subPages/select-cinema/select-cinema?movieId=' + detailMovie.movie.id + '&movieName=' + detailMovie.movie.nm + '&showTime=' + detailMovie.movie.rt"
            class="purchase"
        >
            购票
        </navigator>
    </view>
</template>

<script>
const util = require('../../../utils/util.js');
const app = getApp();
export default {
    data() {
        return {
			movieBackground:"",
			moviePoster:"",
			serverHost:app.globalData.url,
            detailMovie: null,
            isFold: true,

            comments: {
                total: '',
                comList: []
            },

            //观众评论
            showst: 0,

            //1想看 2预售 3上映
            movieId: 0,

            isWish: false,
            isComment: false,

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
            },

            img: '',
            nm: '',
            enm: '',
            globalreleased: '',
            sc: '',
            stars: [],
            snum: '',
            wish: '',
            cat: '',
            version: '',
            src: '',
            dur: '',
            rt: '',
            dra: '',
            star: '',
            videoImg: '',
            id: ''
        };
    },
    onLoad(options) {
        const movieId = options.movieId;
        const showst = options.showst;
        this.setData({
            showst,
            movieId
        });
        this.initPage(movieId);
    },
    methods: {
        //初始页面
        initPage(movieId) {
            const _this = this;
            uni.showLoading({
                title: '加载中...'
            });
            this.getComment(movieId);
            uni.request({
                url: app.globalData.url + `/home/getMovieById/${movieId}`,
                success(res) {
                    uni.hideLoading();
                    res.data.data.movie = _this.handleData(res.data.data.movie);
					console.log(res.data.data.movie)
                    _this.setData({
                        detailMovie: res.data.data
                    });
					_this.moviePoster = `background-image: url('${_this.serverHost}${_this.detailMovie.movie.img}')`
					_this.movieBackground = `background-image: url('${_this.serverHost}${_this.detailMovie.movie.photos}')`
					
                }
            });
            uni.getStorage({
                key: 'userInfo',
                success: function (res1) {
                    console.log(res1.data.data.token);
                    uni.request({
                        url: app.globalData.url + '/home/getIsWish',
                        method: 'GET',
                        header: {
                            token: res1.data.data.token
                        },
                        data: {
                            movieId: _this.movieId
                        },
                        success: function (res) {
                            _this.setData({
                                isWish: res.data.data
                            });
                        }
                    });
                    uni.request({
                        url: app.globalData.url + '/Comment/getIsComment',
                        method: 'GET',
                        header: {
                            token: res1.data.data.token
                        },
                        data: {
                            movieId: _this.movieId
                        },
                        success: function (res) {
                            if (res.data.data == null) {
                                return;
                            }
                            _this.setData({
                                comment: res.data.data,
                                isComment: true
                            });
                        }
                    });
                }
            });
        },

        //获取观众评论
        getComment(movieId) {
            const _this = this;
            uni.getStorage({
                key: 'userInfo',
                success: function (res1) {
                    uni.request({
                        url: app.globalData.url + `/Comment/getHotComment/${movieId}`,
                        header: {
                            token: res1.data.data.token
                        },
                        success(res) {
                            if (res.data.state == 200) {
                                var com = res.data.data;
                                com.comList = _this.formatData(res.data.data.comList);
                                console.log(com);
                                _this.setData({
                                    comments: com
                                });
                            }
                        }
                    });
                },
                fail: function (res1) {
                    uni.request({
                        url: app.globalData.url + `/Comment/getHotComment/${movieId}`,
                        success(res) {
                            if (res.data.state == 200) {
                                var com = res.data.data;
                                com.comList = _this.formatData(res.data.data.comList);
                                console.log(com);
                                _this.setData({
                                    comments: com
                                });
                            }
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
                    temp.stars = this.formatStar(temp.sc / 2);
                    temp.calcTime = util.calcTime(temp.calcTime);
                    return temp;
                });
            }
            return list;
        },

        //预览图片
        previewImage(e) {
            const currentIndex = e.currentTarget.dataset.index;
            const urls = this.detailMovie.photos.map((item) => item.replace('180w_140h', '375w_250h'));
            uni.previewImage({
                urls,
                current: urls[currentIndex]
            });
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

        //处理数据
        handleData(data) {
            //小程序的{{}}中不能调用函数，只能在这里处理数据
            let obj = data;
            //将类似“v3d imax”转化为['3D','IMAX']
            obj.version =
                obj.version &&
                obj.version.split(' ').map((item) => {
                    return item.toUpperCase().replace('V', '');
                });
            //将评分人数单位由个转化为万
            obj.snum = obj.snum / 10000;
            obj.snum = obj.snum.toFixed(1);
            //评分星星,满分10分，一颗满星代表2分
            obj.stars = this.formatStar(obj.sc / 2);
            //处理上映日期
            obj.rt = util.formatYear(new Date(obj.rt));
            return obj;
        },

        //折叠与展开剧情简介
        toggleFold() {
            this.setData({
                isFold: !this.isFold
            });
        },

        //跳转到video页面
        toVideo() {
            const detailMovie = this.detailMovie.movie;
            const paramsStr = JSON.stringify({
                video: {
                    videourl: this.serverHost+detailMovie.videoUrl,
                    videoImg: this.serverHost+detailMovie.videoImg,
                    videoName: detailMovie.videoName
                },
                movieName: detailMovie.nm,
                //电影名称
                id: detailMovie.id,
                //电影ID
                version: detailMovie.version,
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
            });
            uni.navigateTo({
                url: `../video-page/video-page?paramsStr=${paramsStr}`
            });
        },

        goCommentWrite: function () {
            var that = this;
            uni.navigateTo({
                url:
                    `../comment-write/comment-write?movieId=` +
                    that.detailMovie.movie.id +
                    `&img=` +
                    that.detailMovie.movie.img +
                    `&sc=` +
                    that.comment.sc +
                    `&content=` +
                    that.comment.content
            });
        },

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
@import './movie-detail.css';
@import '@/templates/commentSection/commentSection.css';
</style>
