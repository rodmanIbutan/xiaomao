<template>
    <view class="swiper-container">
        <view class="post-bg" :style="postBg"></view>
        <view class="post-bg-mask"></view>
        <scroll-view class="swiper-wrapper scroll-view_H" scroll-x scroll-with-animation :scroll-left="scrollLeft">
            <view class="movie-item" :data-movie="item" @tap="selectMovie" :id="'item' + index" v-for="(item, index) in moviesClone" :key="item.id">
                <view :class="'post ' + (movie.id === item.id ? 'select' : '')">
                    <image :src="serverHost+item.img"></image>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
const app = getApp();
export default {
    data() {
        return {
            moviesClone: [],
            movie: null,

            //选中的电影
            scrollLeft: 0,

            //设置滚动条位置
            size: 0,

            //电影item的大小（包括margin）
            //当前电影的索引,下面的函数传递了事件对象后就不能传递其他参数了，所以只能放在data中传递
            i: 0,

            moviesClone: [],
			serverHost:app.globalData.url,
			postBg:''
        };
    },
    props: {
        movies: {
            type: Array,
            default: () => []
        },
        defaultSelectID: {
            type: String,
            default: ''
        }
    },
    methods: {
        //选中电影
        selectMovie(e) {
			const _this = this
            const { moviesClone: movies } = this;
            const movie = (e && e.currentTarget.dataset.movie) || movies.find((item) => item.id == this.defaultSelectID) || movies[this.i];
            if (movies.length && this.movie && movie.id === this.movie.id) {
                return;
            }
            const index = movies.findIndex((item) => item.id === movie.id);
            if (this.size) {
                this.setData({
                    movie,
                    scrollLeft: this.size * index
                });
            } else {
                this.calcSize().then((size) => {
                    this.setData({
                        movie,
                        size,
                        scrollLeft: size * index
                    });
                });
            }
            this.$emit('selectMovie', {
                detail: {
                    movie
                }
            });
			this.postBg = `"background-image:url('${_this.serverHost}${_this.moviesClone[_this.scrollLeft].img}')"`
        },
        //计算节点大小
        calcSize() {
            return new Promise((resolve, reject) => {
                const query = uni.createSelectorQuery().in(this);
                query
                    .select(`#item1`)
                    .fields(
                        {
                            size: true,
                            computedStyle: ['margin-left']
                        },
                        function (res) {
                            let size = 0;
                            if (res) {
                                size = res.width + parseFloat(res['margin-left']);
                            }
                            resolve(size);
                        }
                    )
                    .exec();
            });
        }
        /**
   * 本来想用touchend事件来做滚动结束后“选择电影”功能，但是获取scrollOffset有两三秒的延迟，所以就放弃了
  handleTouchend(e) {
    const size = this.data.size
    const query = wx.createSelectorQuery().in(this)
    query.select('.swiper-wrapper').scrollOffset((res) => {
      const scrollLeft = res.scrollLeft
      let index = Math.ceil(scrollLeft / size)
      if ((index * size - size / 2) < scrollLeft && (index * size + size / 2)) {
       } else {
        index--
      }
      this.setData({
        i: index
      }, () => {
        this.selectMovie()
      })
    }).exec()
  }
   */
    },
    created: function () {},
    watch: {
        movies: {
            handler: function (movies) {
                this.moviesClone = this.clone(this.movies);
                if (Array.isArray(movies) && movies.length) {
                    this.setData(
                        {
                            moviesClone: movies
                        },
                        () => {
                            this.selectMovie();
                        }
                    );
                }
            },

            immediate: true,
            deep: true
        },

        defaultSelectID: {
            handler: function (movie) {
                // movie && this.selectMovie()
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './select-movie.css';
</style>
