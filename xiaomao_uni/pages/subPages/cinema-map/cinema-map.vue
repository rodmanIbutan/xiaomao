<template>
    <view class="container">
        <map id="map" class="map" :longitude="cinemaData.longitude" :latitude="cinemaData.latitude" show-location :markers="markers"></map>
        <!-- 原生组件的层级是最高的，所以页面中的其他组件无论设置 z-index 为多少，都无法盖在原生组件上，所以只能用cover-image -->
        <cover-image src="/static/image/user/pos.png" class="pos" @tap="position"></cover-image>
        <view class="cinema-box">
            <view class="cinema-name">{{ cinemaDetail.nm }}</view>
            <view class="cinema-position">{{ cinemaDetail.addr }}</view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            cinemaData: null,
            markers: [],

            cinemaDetail: {
                nm: '',
                addr: ''
            }
        };
    },
    onLoad(opt) {
        console.log(opt);
        this.initData(opt);
    },
    methods: {
        initData(cinemaData) {
            this.setData({
                cinemaData,
                markers: [
                    {
                        latitude: cinemaData.latitude,
                        longitude: cinemaData.longitude
                    }
                ]
            });
        },

        //定位自己的位置
        position() {
            const MapContext = uni.createMapContext('map');
            MapContext.moveToLocation();
        }
    }
};
</script>
<style>
@import './cinema-map.css';
</style>
