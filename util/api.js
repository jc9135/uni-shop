const BASE_URL = 'http://localhost:8082'
export const myRquest = (ops) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + ops.url,
			method: ops.method || 'GET',
			data: ops.data || {},
			success: (res) => {
				if (res.data.status !== 0) {
					return uni.showToast({
						title: "获取数据失败",
						icon: "none"
					})
				}
				resolve(res)
			},
			fail:(err)=> {
				uni.showToast({
					title: "请求接口失败",
					icon: "none"
				})
				reject(err)
			}
		})
	})
}
