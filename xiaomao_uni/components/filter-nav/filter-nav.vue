<template>
    <view class="nav">
        <view class="tab">
            <view :class="'nav-item ' + (itemNum === 1 ? 'select-item' : '')" @tap="selectItemNum" :data-item-num="1">
                <text class="title line-ellipsis">{{ itemName1 }}</text>
                <text class="city-entry-arrow"></text>
            </view>
            <view :class="'nav-item have-border ' + (itemNum === 2 ? 'select-item' : '')" @tap="selectItemNum" :data-item-num="2">
                <text class="title line-ellipsis">{{ itemName2 }}</text>
                <text class="city-entry-arrow"></text>
            </view>
            <view :class="'nav-item ' + (itemNum === 3 ? 'select-item' : '')" @tap="selectItemNum" :data-item-num="3">
                <text class="title line-ellipsis">{{ itemName3 }}</text>
                <text class="city-entry-arrow"></text>
            </view>
        </view>
        <view class="nav-content">
            <view class="nav-content-item region" :style="'display:' + (itemNum === 1 ? 'block' : 'none')">
                <view class="region-list">
                    <scroll-view class="brand-scroll-view" scroll-y>
                        <view
                            :class="'brand-item ' + (selectRegion == item ? 'red' : '')"
                            @tap="regionClick"
                            :data-region="item"
                            v-for="(item, index) in cityCinemaInfo.data.district"
                            :key="item.id"
                        >
                            <view>
                                <text class="iconfont icon-hook" :style="'visibility:' + (selectRegion == item ? '' : 'hidden')"></text>
                                {{ item }}
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </view>
            <view class="nav-content-item brand" :style="'display:' + (itemNum === 2 ? 'block' : 'none')">
                <scroll-view class="brand-scroll-view" scroll-y>
                    <view
                        :class="'brand-item ' + (selectBrandId === item.id ? 'red' : '')"
                        @tap="selectBrand"
                        :data-brand="item"
                        v-for="(item, index) in cityCinemaInfo.data.cinemaBrandList"
                        :key="item.id"
                    >
                        <view>
                            <text class="iconfont icon-hook" :style="'visibility:' + (selectBrandId === item.id ? '' : 'hidden')"></text>
                            {{ item.brand }}
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view class="nav-content-item special" :style="'display:' + (itemNum === 3 ? 'block' : 'none')">
                <scroll-view class="special-scroll-view" scroll-y>
                    <view class="item-title">特色功能</view>
                    <view class="item-list">
                        <view :class="'btn line-ellipsis ' + (selectServiceId == 1 ? 'select' : '')" @tap="specialSelectItem" :data-type-id="1" data-type="service">改签</view>
                        <view :class="'btn line-ellipsis ' + (selectServiceId == 2 ? 'select' : '')" @tap="specialSelectItem" :data-type-id="2" data-type="service">退票</view>
                    </view>
                    <view class="item-title">特殊厅</view>
                    <view class="item-list">
                        <view
                            :class="'btn line-ellipsis ' + (selectHallTypeId === item.id ? 'select' : '')"
                            @tap="specialSelectItem"
                            :data-type-id="item.id"
                            data-type="hallType"
                            v-for="(item, index) in cityCinemaInfo.data.hallTypeList"
                            :key="index"
                        >
                            {{ item.halltype }}
                        </view>
                    </view>
                </scroll-view>
                <view class="special-btn">
                    <view class="btn" @tap="specialReset">重置</view>
                    <view class="btn confirm-btn" @tap="specialConfirm">确定</view>
                </view>
            </view>
        </view>
        <view class="mask" @tap="cancal" :style="'display:' + (itemNum === -1 ? 'none' : 'block')" @tap.stop.prevent="cancal"></view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            itemNum: -1,
            itemName1: '全城',
            itemName2: '品牌',
            itemName3: '特色',
            selectBrandId: -1,
            //选择的品牌ID
            selectServiceId: -1,
            //选择的服务ID
            selectHallTypeId: -1,
            //选择的特殊厅ID
            selectRegion: '全城'
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        cityCinemaInfo: {
            type: Object
        },
        hidden: {
            type: Boolean,
            default: true
        }
    },
    created() {
        //自己实现的一个watch。因为不能在外面直接写watch，所以只能定义在这里
        const watch = {
            itemNum: (value) => {
                this.$emit('toggleShow', {
                    detail: {
                        item: value
                    }
                });
            }
        };
        this.setWatcherFun(this, watch);
    },
    /**
     * 组件的方法列表
     */
    methods: {
        attached() {},

        //导航栏的点击事件
        selectItemNum(e) {
            const itemNum = e.currentTarget.dataset.itemNum;
            let num = itemNum;
            if (this.itemNum !== -1) {
                num = itemNum === this.itemNum ? -1 : itemNum;
            }
            this.setData({
                itemNum: num
            });
        },

        //蒙板的点击事件
        cancal() {
            this.setData({
                itemNum: -1
            });
        },

        //选择品牌的点击事件
        selectBrand(e) {
            const brand = e.currentTarget.dataset.brand;
            let brandName = brand.brand;
            if (brand.id === -1) {
                brandName = '品牌';
            }
            this.$emit('change', {
                detail: {
                    brandId: brand.id
                }
            });
            this.setData({
                selectBrandId: brand.id,
                itemName2: brandName,
                itemNum: -1
            });
        },

        //特色重置按钮
        specialReset() {
            this.setData({
                selectServiceId: -1,
                selectHallTypeId: -1
            });
        },

        //特色选择按钮
        specialSelectItem(e) {
            const { type, typeId } = e.currentTarget.dataset;
            if (type === 'service') {
                this.setData({
                    selectServiceId: typeId
                });
            } else {
                this.setData({
                    selectHallTypeId: typeId
                });
            }
        },

        //特色确定按钮
        specialConfirm() {
            const { selectServiceId, selectHallTypeId } = this;
            console.log();
            this.$emit('change', {
                detail: {
                    serviceId: selectServiceId,
                    hallType: selectHallTypeId
                }
            });
            this.setData({
                itemNum: -1
            });
        },

        //行政区域的点击事件
        regionClick(e) {
            const region = e.currentTarget.dataset.region;
            if (region == '全城') {
                this.$emit('change', {
                    detail: {
                        selectRegion: ''
                    }
                });
            } else {
                this.$emit('change', {
                    detail: {
                        selectRegion: region
                    }
                });
            }
            this.setData({
                selectRegion: region,
                itemNum: -1,
                itemName1: region
            });
        },

        //简单实现类似vue的watch
        setWatcherFun(data, watch) {
            Object.keys(watch).forEach((key) => {
                this.observeFun(data, key, watch[key]);
            });
        },

        observeFun(obj, key, func) {
            let val = obj[key];
            Object.defineProperty(obj, key, {
                configurable: true,
                enumerable: true,
                set: function (newVal) {
                    if (newVal === val) {
                        return;
                    }
                    val = newVal;
                    func(newVal); // 赋值(set)时，调用对应函数
                },
                get: function () {
                    return val;
                }
            });
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
    },
    watch: {
        hidden: {
            handler: function (newVal) {
                if (newVal) {
                    this.setData({
                        itemNum: -1
                    });
                }
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './filter-nav.css';
</style>
