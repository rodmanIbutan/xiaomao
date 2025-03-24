<template>
    <view class="container">
        <view class="banner">
            <image src="/static/image/user/youcan.jpg" mode="aspectFill"></image>
        </view>
        <view class="section">
            <view>
                <text>微麦-电影购票小程序</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            info: [
                {
                    label: '姓名',
                    value: '张致豪'
                },
                {
                    label: '职业',
                    value: 'web前端'
                },
                {
                    label: 'QQ',
                    value: '137596665'
                },
                {
                    label: '微信',
                    value: '18771022533'
                },
                {
                    label: 'github',
                    value: 'https://github.com/zhangZhiHao1996'
                }
            ]
        };
    },
    methods: {}
};
</script>
<style>
@import './about-page.css';
</style>
