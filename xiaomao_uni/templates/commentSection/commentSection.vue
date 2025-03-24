<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="commentSection" v-if="false">
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
</template>

<style>
@import './commentSection.css';
</style>
