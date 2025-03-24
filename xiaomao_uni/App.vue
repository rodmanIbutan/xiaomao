<script>
	//app.js
	const QQMapWX = require('./locale/qqmap-wx-jssdk.min.js');
	let qqmapsdk;
	qqmapsdk = new QQMapWX({
		key: 'MBBBZ-6SCK5-67LIK-I6LD3-UUQBK-TTFWF'
	});
	export default {
		data() {
			return {};
		},
		onLaunch: function() {
			this.globalData.initPage();
		},
		globalData: {
			userInfo: null,

			//用户信息
			userLocation: null,

			//用户的位置信息
			selectCity: null,

			//用户切换的城市
			isRefresh: false,

			// url: 'http://122.231.47.165:4522',
			url: 'http://localhost:8080',
			// url: 'http://rodman.tpddns.cn:4522',

			initPage() {

				// 获取用户授权信息信息,防止重复出现授权弹框
				uni.getSetting({
					success: (res) => {
						//已有权限直接获得信息，否则出现授权弹框
						if (res.authSetting['scope.userLocation']) {
							this.getUserLocation();
						} else {
							this.getUserLocation();
						}
					}
				});
			},

			//获取用户的位置信息
			getUserLocation() {
				uni.getLocation({
					//成功授权
					success: (res) => {
						const latitude = res.latitude;
						const longitude = res.longitude;
						// 使用腾讯地图接口将位置坐标转出成名称
						qqmapsdk.reverseGeocoder({
							location: {
								latitude,
								longitude
							},
							success: (res) => {

								const cityFullname = res.result.address_component.city;
								const cityInfo = {
									latitude,
									longitude,
									cityName: cityFullname.substring(0, cityFullname.length -
										1),
									status: 1
								};
								this.userLocation = {
									...cityInfo
								}; //浅拷贝对象
								this.selectCity = {
									...cityInfo
								}; //浅拷贝对象
								if (this.userLocationReadyCallback) {
									this.userLocationReadyCallback();
								}
							}
						});
					},
					fail: (err) => {
						console.log(err);
						this.userLocation = {
							status: 0
						};
						//防止当弹框出现后，用户长时间不选择，
						if (this.userLocationReadyCallback) {
							this.userLocationReadyCallback();
						}
					}
				});
			}
		}
	};
</script>
<style>
	@import './app.css';
</style>