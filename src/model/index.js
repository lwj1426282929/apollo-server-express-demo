const Service = require('../service/index')

class Model {
  // 获取卡片数据
  async getCards(args) {
    let targetNames = [
      'duration_canvass', // 订单揽收时长
      'duration_departure', // 出港运输时长
      'duration_src_trans', // 始发中心操作时长
      'duration_transit', // 中转时长
      'duration_dest_trans', // 目的中心操作时长
      'duration_arrival', // 进港运输时长
      'duration_delivery', // 派送时长
    ]
    let params = targetNames.map(item => {
      return {
        url: 'http://10.1.241.152:8086/cockpit/duration/card',
        params: { ...args, target_name: item }
      }
    })
    let res = await Service.query(params)
    const titles = [ '订单揽收时长', '出港运输时长', '始发中心操作时长', '中转时长', '目的中心操作时长', '进港运输时长', '派件时长' ]
    res.forEach((item, index) => {
      item.title = titles[index]
    })
    return res
  }

  // 获取汇总列表数据
  async getSummaryList(args) {
    let params = [{
      url: 'http://10.1.241.152:8086/cockpit/duration/count_list',
      params: args
    }]
    let res = await Service.query(params)
    let result = res[0]
    result.total = result.page.count
    return result
  }
}

module.exports = new Model()
