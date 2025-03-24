<template>
    <view>
        <scroll-view class="timeline scroll-view_H" scroll-x>
            <view :class="'day ' + (item.day === selectDay ? 'active' : '')" @tap="selectDayFun" :data-day="item.day" v-for="(item, index) in daysClone" :key="index">
                {{ item.title }}
            </view>
        </scroll-view>
    </view>
</template>

<script>
const util = require('../../utils/util.js');
export default {
    data() {
        return {
            selectDay: '',
            daysClone: []
        };
    },
    props: {
        /**
         * 模拟日期列表时开头的时间
         */
        startTime: {
            type: String,
            default: util.getToday()
        },
        /**
         * 默认选择的天数
         */
        defaultSelect: {
            type: String,
            default: ''
        },
        /**
         * 日期列表
         */
        days: {
            type: Array,
            default: null
        }
    },
    mounted() {
        // 处理小程序 attached 生命周期
        this.attached();
		console.log(this.daysClone);
    },
    methods: {
        attached() {
            //如果没有传递日期列表，就模拟一个日期列表
            if (!this.days) {
                this.getWeek(this.startTime);
            }else
			{
				this.daysClone = this.days
			}
        },
        //模拟7天时间列表
        getWeek(startTime) {
            const todayTomorrow = ['今天', '明天', '后天'];
            const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            let days = [];
            //当开始时间大于今天时，日期从大的时间开始算（主要是为了“预售”时间）
            let start = util.getToday();
            if (startTime > start) {
                //都是“2018-09-12”的格式，所以可以直接相减，否则转化为毫秒在相减
                start = startTime;
            }
            for (let i = 0; i < 7; i++) {
                let day = new Date(start);
                day.setDate(day.getDate() + i); //往后推几天
                const num = (day - new Date(util.getToday())) / (3600000 * 24); //计算相隔几天，减少必须是“今天”0时0分
                days.push({
                    title: `${todayTomorrow[num] || week[day.getDay()]}${day.getMonth() + 1}月${day.getDate()}日`,
                    //获取类似 “后天9月1日” 的字符串
                    day: util.formatTime(day).split(' ')[0]
                });
            }
            this.setData(
                {
                    daysClone: days
                },
                () => {
                    this.selectDayFun();
                }
            );
        },
        selectDayFun(e) {
            const day = (e && e.currentTarget.dataset.day) || this.findDefaultDay() || this.daysClone[0].day;
            if (day === this.selectDay) {
                return;
            }
            this.setData({
                selectDay: day
            });
            this.$emit('selectDayEvent', {
                detail: {
                    day
                }
            });
        },

        findDefaultDay() {
            const day = this.daysClone.find((item) => item.day === this.defaultSelect);
            return day && day.day;
        }
    },
    created: function () {},
    watch: {
        startTime: {
            handler: function (start) {
                if (start) {
                    this.getWeek(start);
                }
            },

            immediate: true
        },

        defaultSelect: {
            handler: function (day) {
                if (day) {
                    this.setData({
                        selectDay: day
                    });
                }
            },

            immediate: true
        },
        days: {
            handler: function (days) {
                this.daysClone = this.clone(this.days);
                if (Array.isArray(days) && days.length) {
                    this.setData(
                        {
                            daysClone: days
                        },
                        () => {
                            this.selectDayFun();
                        }
                    );
                }
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
@import './select-time.css';
</style>
