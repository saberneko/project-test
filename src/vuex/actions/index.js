import R from 'src/common/request'

/**
 * 获取排名前五的内容
 *
 * @return {[type]} [description]
 */
export const getHot5ProjectList = ({dispatch, state}) => {
	return R.get('/Service/GetHot5ProjectList.ashx', { '_flag': 're' }).then(projects => {
		let { projectMap } = state
		projects.forEach((item, index) => {
			let {
				GP_ProjectId
			} = item

			if (GP_ProjectId) {
				projectMap.set(GP_ProjectId, item)
			}
		})
		dispatch('SET_STORE', 'projectMap', projectMap)
		return projects
	})
}

export const getBigMaster = ({dispatch, state}) => {
	return R.post('/Service/GetBigMatterList.ashx').then(res => {
		dispatch('SET_STORE', 'matterList', res)
		return res
	})
}
