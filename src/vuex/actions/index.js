import R from 'src/common/request'

/**
 * 获取排名前五的内容
 *
 * @return {[type]} [description]
 */
export const getHot5ProjectList = ({commit, state}) => {
  return R.get('/Service/GetHot5ProjectList.ashx', { '_flag': 're' }).then(projects => {
    // 取出 state 里的 map 对象
    let { projectMap } = state
    // 遍历前五个事项
    projects.forEach((item, index) => {
      // 取出每个事项里的 GP_ProjectId
      let {
        GP_ProjectId
      } = item
      // 以 GP_ProjectId 为 key, item 为 value,设置 map 对象
      if (GP_ProjectId) {
        projectMap.set(GP_ProjectId, item)
      }
    })
    commit('SET_STORE', 'projectMap', projectMap)
    return projects
  })
}

export const getBigMaster = ({dispatch, state}) => {
  return R.post('/Service/GetBigMatterList.ashx').then(res => {
    dispatch('SET_STORE', 'matterList', res)
    return res
  })
}
