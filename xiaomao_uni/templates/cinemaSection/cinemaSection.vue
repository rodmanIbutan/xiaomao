<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="cinemaSection" v-if="false">
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
</template>

<style>
@import './cinemaSection.css';
</style>
