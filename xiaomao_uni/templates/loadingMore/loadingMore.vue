<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="loadingMore" v-if="false">
            <view class="loadingMore">
                <image src="/static/image/user/loading.gif" class="loading-img"></image>
                <view class="loading-text">正在加载...</view>
            </view>
        </block>
    </view>
</template>

<style>
@import './loadingMore.css';
</style>
