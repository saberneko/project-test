//接口地址
export const GP = {
	ServiceUrl : "http://121.43.158.213:8003"
}

export const getQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
	var r = window.location.search.substr(1).match(reg)
	if (r != null) return unescape(r[2])
	return null
}

export const NewOpenWindow = function(id) {
	mui.openWindow({
			url: id,
			id: id,
			show: {
				aniShow:'pop-in',//参考官方的效果
			}
		})
}

export default {
	GP,
	getQueryString,
	NewOpenWindow
}

// export const pathToAssets
