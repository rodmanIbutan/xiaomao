<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="cinemaMap" v-if="false">
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
</template>

<style>
@import './cinemaMap.css';
</style>
