const Model = require('../model')
const authorizations = require('../auth')

module.exports = {
  Query: {
    // 查询Authorization
    authorizations: () => authorizations,

    // 查询卡片数据
    cards: (root, args, context) => {
      return Model.getCards(args).then(res => {
        return res
      })
    },

    // 查询汇总表格
    count_list: (root, args, context) => {
      return Model.getSummaryList(args).then(res => {
        return res
      })
    }
  },

  Mutation: {
    authorize(root, { code }, context) {
      if (!authorizations.length) {
        authorizations.push({ code })
      }
      return { code }
    }
  }
}
