<template>
    <view>
        <template name="movieSection">
            <navigator class="movie-section" :url="'/pages/subPages/movie-detail/movie-detail?movieId=' + movie.id">
                <image class="movie-img" :src="movie.img"></image>
                <view class="movie-info">
                    <view class="movie-name line-ellipsis">
                        {{ movie.nm }}
                        <text :class="'version ' + movie.version"></text>
                    </view>
                    <view class="movie-score line-ellipsis">
                        <view v-if="movie.globalReleased">
                            <text v-if="movie.sc">
                                观众评
                                <text class="grade">{{ movie.sc }}</text>
                            </text>
                            <text v-else>暂无评分</text>
                        </view>
                        <view v-else>
                            <text class="grade">{{ movie.wish }}</text>
                            人想看
                        </view>
                    </view>
                    <view class="movie-star line-ellipsis">主演：{{ movie.star }}</view>
                    <view v-if="rt">{{ movie.rt }}上映</view>
                    <view v-else class="movie-showInfo line-ellipsis">{{ movie.showInfo }}</view>
                </view>
                <view class="buy-tickets">
                    <view v-if="movie.showst === 3" class="btn">购票</view>
                    <view v-else-if="movie.showst === 1" class="btn want-see">想看</view>
                    <view v-else-if="movie.showst === 4" class="btn pre-sale">预售</view>
                </view>
            </navigator>
        </template>
    </view>
</template>

<style>
@import './movieSection.css';
</style>
