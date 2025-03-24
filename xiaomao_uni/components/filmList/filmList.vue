<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="filmList" v-if="false">
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
    </view>
</template>

<style>
@import './filmList.css';
</style>
