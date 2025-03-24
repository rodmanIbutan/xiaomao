<template>
    <view>
        <!-- template对应的原始代码，为保证正常显示，已对其进行隐藏。 -->
        <block name="message" v-if="false">
            <view class="message-area" v-if="!(message.visiable ? false : true)">
                <view class="message">
                    <view :class="'message-icon message-icon-' + message.icon"></view>
                    <view class="message-content">{{ message.content }}</view>
                </view>
            </view>
        </block>
    </view>
</template>

<script>
module.exports = {
    show: function (cfg) {
        var that = this;
        that.setData({
            message: {
                content: cfg.content,
                icon: cfg.icon,
                visiable: true
            }
        });
        if (typeof cfg.duration !== 'undefined') {
            setTimeout(function () {
                that.setData({
                    message: {
                        visiable: false
                    }
                });
            }, cfg.duration);
        }
    },
    hide: function () {
        var that = this;
        that.setData({
            message: {
                visiable: false
            }
        });
    }
};
</script>
<style>
@import './message.css';
</style>
