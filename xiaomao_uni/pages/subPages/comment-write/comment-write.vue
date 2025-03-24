<template>
    <!-- pages/subPages/comment-write/comment-write.wxml -->
    <view class="write">
        <image class="movie-poster" :src="img" />
        <view :class="key == 0 ? 'user_sc' : 'user_sc2'">
            <text style="font-size: 35rpx" v-if="key != 0">{{ key * 2 }}</text>
            <text style="font-size: 20rpx">{{ user_sc }}</text>
        </view>
        <view>
            <block v-for="(item, index) in index" :key="index">
                <image class="movie-star" :src="key > item ? (key - item == 0.5 ? halfSrc : selectedSrc) : normalSrc">
                    <view class="item" style="margin-left: 0rpx" :data-key="item + 0.5" @tap="selectLeft"></view>
                    <view class="item" style="margin-left: 25rpx" :data-key="item + 1" @tap="selectRight"></view>
                </image>
            </block>
        </view>
        <view style="width: 100%; height: 2rpx; background: #f2f2f2"></view>
        <textarea v-if="hasComment" class="text" :value="comment" @input="inputHandler" />
        <textarea v-else class="text" placeholder="请写下你的感受" @input="inputHandler" />
        <button class="submit" @tap="addComment">发布</button>
    </view>
</template>

<script>
// pages/subPages/comment-write/comment-write.js
const app = getApp();
export default {
    data() {
        return {
            movieId: 0,
            img: '',
            user_sc: '期待你的打分',
            stars: ['超烂', '较差', '一般', '较好', '不错', '完美'],
            index: [0, 1, 2, 3, 4],
            normalSrc: '/static/image/user/star-empty.png',
            selectedSrc: '/static/image/user/star-full.png',
            halfSrc: '/static/image/user/star-half.png',
            key: 0,
            comment: '',
            hasComment: false,
            isComment: false
        };
    }
    /**
     * 生命周期函数--监听页面加载
     */,
    onLoad: function (options) {
        const movieId = options.movieId;
        const img = options.img;
        const content = options.content;
        console.log(content);
        if (content != 'undefined') {
            const sc = options.sc;
            this.setData({
                key: sc / 2,
                comment: content,
                hasComment: true
            });
        }
        this.setData({
            movieId,
            img
        });
    },
    methods: {
        //点击左边,半颗星
        selectLeft: function (e) {
            var that = this;
            var key = e.currentTarget.dataset.key;
            if (this.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
                //只有一颗星的时候,再次点击,变为0颗
                key = 0;
                this.setData({
                    key: key,
                    user_sc: '期待你的打分'
                });
                return;
            }
            console.log('得' + key + '分');
            this.setData({
                key: key,
                user_sc: '分 ' + that.stars[parseInt(key - 0.5)]
            });
        },

        //点击右边,整颗星
        selectRight: function (e) {
            var that = this;
            var key = e.currentTarget.dataset.key;
            this.setData({
                key: key,
                user_sc: '分 ' + that.stars[parseInt(key)]
            });
        },

        addComment: function () {
            if (this.comment == '' || this.key == 0) {
                return;
            }
            var that = this;
            uni.getStorage({
                key: 'userInfo',
                success: function (res1) {
                    console.log(res1.data.data.token);
                    uni.request({
                        url: app.globalData.url + '/Comment/addComment',
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                            token: res1.data.data.token
                        },
                        data: {
                            movieId: that.movieId,
                            sc: that.key * 2,
                            content: that.comment
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
                                var pages = getCurrentPages();
                                pages[pages.length - 2].setData({
                                    isComment: true
                                });
                                uni.navigateBack({
                                    delta: 1
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

        inputHandler: function (e) {
            this.setData({
                comment: e.detail.value
            });
        }
    }
};
</script>
<style>
@import './comment-write.css';
</style>
