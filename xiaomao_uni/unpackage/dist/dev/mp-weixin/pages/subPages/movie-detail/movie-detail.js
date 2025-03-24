(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/subPages/movie-detail/movie-detail"],{

/***/ 120:
/*!**********************************************************************************************************************************!*\
  !*** C:/Users/Rodman/project/weimai-wetapp-master/xiaomao_uni/main.js?{"page":"pages%2FsubPages%2Fmovie-detail%2Fmovie-detail"} ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _movieDetail = _interopRequireDefault(__webpack_require__(/*! ./pages/subPages/movie-detail/movie-detail.vue */ 121));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_movieDetail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 121:
/*!*************************************************************************************************************!*\
  !*** C:/Users/Rodman/project/weimai-wetapp-master/xiaomao_uni/pages/subPages/movie-detail/movie-detail.vue ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _movie_detail_vue_vue_type_template_id_6aec23bd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movie-detail.vue?vue&type=template&id=6aec23bd& */ 122);
/* harmony import */ var _movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movie-detail.vue?vue&type=script&lang=js& */ 124);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _movie_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./movie-detail.vue?vue&type=style&index=0&lang=css& */ 126);
/* harmony import */ var _application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 33);

var renderjs





/* normalize component */

var component = Object(_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _movie_detail_vue_vue_type_template_id_6aec23bd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _movie_detail_vue_vue_type_template_id_6aec23bd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _movie_detail_vue_vue_type_template_id_6aec23bd___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/subPages/movie-detail/movie-detail.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 122:
/*!********************************************************************************************************************************************!*\
  !*** C:/Users/Rodman/project/weimai-wetapp-master/xiaomao_uni/pages/subPages/movie-detail/movie-detail.vue?vue&type=template&id=6aec23bd& ***!
  \********************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_template_id_6aec23bd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./movie-detail.vue?vue&type=template&id=6aec23bd& */ 123);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_template_id_6aec23bd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_template_id_6aec23bd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_template_id_6aec23bd___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_template_id_6aec23bd___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 123:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Rodman/project/weimai-wetapp-master/xiaomao_uni/pages/subPages/movie-detail/movie-detail.vue?vue&type=template&id=6aec23bd& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  var g0 = _vm.detailMovie
    ? !_vm.detailMovie.movie.videoImg && !_vm.detailMovie.photos.length
    : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        g0: g0,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 124:
/*!**************************************************************************************************************************************!*\
  !*** C:/Users/Rodman/project/weimai-wetapp-master/xiaomao_uni/pages/subPages/movie-detail/movie-detail.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _application_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./movie-detail.vue?vue&type=script&lang=js& */ 125);
/* harmony import */ var _application_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_application_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _application_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _application_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_application_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 125:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Rodman/project/weimai-wetapp-master/xiaomao_uni/pages/subPages/movie-detail/movie-detail.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var util = __webpack_require__(/*! ../../../utils/util.js */ 52);
var app = getApp();
var _default = {
  data: function data() {
    return {
      movieBackground: "",
      moviePoster: "",
      serverHost: app.globalData.url,
      detailMovie: null,
      isFold: true,
      comments: {
        total: '',
        comList: []
      },
      //观众评论
      showst: 0,
      //1想看 2预售 3上映
      movieId: 0,
      isWish: false,
      isComment: false,
      comment: {
        userAvatarUrl: '',
        userNickname: '',
        purchase: '',
        stars: [],
        content: '',
        calcTime: '',
        hasApprove: false,
        id: '',
        approve: false
      },
      img: '',
      nm: '',
      enm: '',
      globalreleased: '',
      sc: '',
      stars: [],
      snum: '',
      wish: '',
      cat: '',
      version: '',
      src: '',
      dur: '',
      rt: '',
      dra: '',
      star: '',
      videoImg: '',
      id: ''
    };
  },
  onLoad: function onLoad(options) {
    var movieId = options.movieId;
    var showst = options.showst;
    this.setData({
      showst: showst,
      movieId: movieId
    });
    this.initPage(movieId);
  },
  methods: {
    //初始页面
    initPage: function initPage(movieId) {
      var _this = this;
      uni.showLoading({
        title: '加载中...'
      });
      this.getComment(movieId);
      uni.request({
        url: app.globalData.url + "/home/getMovieById/".concat(movieId),
        success: function success(res) {
          uni.hideLoading();
          res.data.data.movie = _this.handleData(res.data.data.movie);
          console.log(res.data.data.movie);
          _this.setData({
            detailMovie: res.data.data
          });
          _this.moviePoster = "background-image: url('".concat(_this.serverHost).concat(_this.detailMovie.movie.img, "')");
          _this.movieBackground = "background-image: url('".concat(_this.serverHost).concat(_this.detailMovie.movie.photos, "')");
        }
      });
      uni.getStorage({
        key: 'userInfo',
        success: function success(res1) {
          console.log(res1.data.data.token);
          uni.request({
            url: app.globalData.url + '/home/getIsWish',
            method: 'GET',
            header: {
              token: res1.data.data.token
            },
            data: {
              movieId: _this.movieId
            },
            success: function success(res) {
              _this.setData({
                isWish: res.data.data
              });
            }
          });
          uni.request({
            url: app.globalData.url + '/Comment/getIsComment',
            method: 'GET',
            header: {
              token: res1.data.data.token
            },
            data: {
              movieId: _this.movieId
            },
            success: function success(res) {
              if (res.data.data == null) {
                return;
              }
              _this.setData({
                comment: res.data.data,
                isComment: true
              });
            }
          });
        }
      });
    },
    //获取观众评论
    getComment: function getComment(movieId) {
      var _this = this;
      uni.getStorage({
        key: 'userInfo',
        success: function success(res1) {
          uni.request({
            url: app.globalData.url + "/Comment/getHotComment/".concat(movieId),
            header: {
              token: res1.data.data.token
            },
            success: function success(res) {
              if (res.data.state == 200) {
                var com = res.data.data;
                com.comList = _this.formatData(res.data.data.comList);
                console.log(com);
                _this.setData({
                  comments: com
                });
              }
            }
          });
        },
        fail: function fail(res1) {
          uni.request({
            url: app.globalData.url + "/Comment/getHotComment/".concat(movieId),
            success: function success(res) {
              if (res.data.state == 200) {
                var com = res.data.data;
                com.comList = _this.formatData(res.data.data.comList);
                console.log(com);
                _this.setData({
                  comments: com
                });
              }
            }
          });
        }
      });
    },
    //处理数据
    formatData: function formatData(arr) {
      var _this2 = this;
      var list = [];
      if (arr.length) {
        list = arr.map(function (item) {
          var temp = _objectSpread({}, item);
          temp.stars = _this2.formatStar(temp.sc / 2);
          temp.calcTime = util.calcTime(temp.calcTime);
          return temp;
        });
      }
      return list;
    },
    //预览图片
    previewImage: function previewImage(e) {
      var currentIndex = e.currentTarget.dataset.index;
      var urls = this.detailMovie.photos.map(function (item) {
        return item.replace('180w_140h', '375w_250h');
      });
      uni.previewImage({
        urls: urls,
        current: urls[currentIndex]
      });
    },
    //处理评分星星
    formatStar: function formatStar(sc) {
      //1分对应满星，0.5对应半星
      var stars = new Array(5).fill('star-empty');
      var fullStars = Math.floor(sc); //满星的个数
      var halfStar = sc % 1 ? 'star-half' : 'star-empty'; //半星的个数，半星最多1个
      stars.fill('star-full', 0, fullStars); //填充满星
      if (fullStars < 5) {
        stars[fullStars] = halfStar; //填充半星
      }

      return stars;
    },
    //处理数据
    handleData: function handleData(data) {
      //小程序的{{}}中不能调用函数，只能在这里处理数据
      var obj = data;
      //将类似“v3d imax”转化为['3D','IMAX']
      obj.version = obj.version && obj.version.split(' ').map(function (item) {
        return item.toUpperCase().replace('V', '');
      });
      //将评分人数单位由个转化为万
      obj.snum = obj.snum / 10000;
      obj.snum = obj.snum.toFixed(1);
      //评分星星,满分10分，一颗满星代表2分
      obj.stars = this.formatStar(obj.sc / 2);
      //处理上映日期
      obj.rt = util.formatYear(new Date(obj.rt));
      return obj;
    },
    //折叠与展开剧情简介
    toggleFold: function toggleFold() {
      this.setData({
        isFold: !this.isFold
      });
    },
    //跳转到video页面
    toVideo: function toVideo() {
      var detailMovie = this.detailMovie.movie;
      var paramsStr = JSON.stringify({
        video: {
          videourl: this.serverHost + detailMovie.videoUrl,
          videoImg: this.serverHost + detailMovie.videoImg,
          videoName: detailMovie.videoName
        },
        movieName: detailMovie.nm,
        //电影名称
        id: detailMovie.id,
        //电影ID
        version: detailMovie.version,
        //电影类型（3d、IMAX）
        release: detailMovie.src,
        //上映时间
        rt: detailMovie.rt,
        //电影上映时间
        wish: detailMovie.wish,
        //想看的人数
        globalReleased: detailMovie.globalreleased,
        //是否上映
        sc: detailMovie.sc,
        //评分
        showst: detailMovie.showst,
        //判读“想看”、“预售”
        cat: detailMovie.cat
      });
      uni.navigateTo({
        url: "../video-page/video-page?paramsStr=".concat(paramsStr)
      });
    },
    goCommentWrite: function goCommentWrite() {
      var that = this;
      uni.navigateTo({
        url: "../comment-write/comment-write?movieId=" + that.detailMovie.movie.id + "&img=" + that.detailMovie.movie.img + "&sc=" + that.comment.sc + "&content=" + that.comment.content
      });
    },
    wantToWatch: function wantToWatch() {
      var that = this;
      uni.getStorage({
        key: 'userInfo',
        success: function success(res1) {
          console.log(res1.data.data.token);
          uni.request({
            url: app.globalData.url + '/home/updateWish',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              token: res1.data.data.token
            },
            data: {
              movieId: that.movieId
            },
            success: function success(res) {
              if (res.data.state == 202) {
                uni.showModal({
                  content: '您还未登录',
                  success: function success(res) {
                    uni.switchTab({
                      url: '/pages/user/user'
                    });
                  }
                });
              } else {
                that.setData({
                  isWish: !that.isWish
                });
              }
            }
          });
        },
        fail: function fail(res1) {
          uni.showModal({
            content: '您还未登录',
            success: function success(res) {
              uni.switchTab({
                url: '/pages/user/user'
              });
            }
          });
        }
      });
    },
    upApprove: function upApprove(e) {
      console.log(e);
      var that = this;
      uni.getStorage({
        key: 'userInfo',
        success: function success(res1) {
          console.log(res1.data.data.token);
          uni.request({
            url: app.globalData.url + '/Comment/upApprove',
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              token: res1.data.data.token
            },
            data: {
              commentId: e.target.dataset.hi
            },
            success: function success(res) {
              if (res.data.state == 202) {
                uni.showModal({
                  content: '您还未登录',
                  success: function success(res) {
                    uni.switchTab({
                      url: '/pages/user/user'
                    });
                  }
                });
              } else {
                var index = e.target.dataset.index;
                that.comments.comList[index].hasApprove = !that.comments.comList[index].hasApprove;
                that.setData({
                  comments: that.comments
                });
              }
            }
          });
        },
        fail: function fail(res1) {
          uni.showModal({
            content: '您还未登录',
            success: function success(res) {
              uni.switchTab({
                url: '/pages/user/user'
              });
            }
          });
        }
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),

/***/ 126:
/*!**********************************************************************************************************************************************!*\
  !*** C:/Users/Rodman/project/weimai-wetapp-master/xiaomao_uni/pages/subPages/movie-detail/movie-detail.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _application_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_application_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_application_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../application/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./movie-detail.vue?vue&type=style&index=0&lang=css& */ 127);
/* harmony import */ var _application_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_application_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_application_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_application_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_application_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_application_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _application_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_application_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_application_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _application_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_application_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_application_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_application_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_application_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_application_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_application_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_movie_detail_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 127:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/Rodman/project/weimai-wetapp-master/xiaomao_uni/pages/subPages/movie-detail/movie-detail.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[120,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/subPages/movie-detail/movie-detail.js.map