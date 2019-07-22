const { gql } = require('apollo-server-express')

module.exports = gql`
  schema {
    query: Query
    mutation: Mutation
  }
  type Query {
    authorizations: [Authorization]
    cards(request_from_app: String!, 
          request_from_page: String!,
          date: String!,
          destOrgCode: [String]!,
          destOrgType: Int!,
          empOrgCode: Int!,
          empOrgType: Int!,
          orgCode: [String!],
          orgType: Int!
    ): [Card]
    count_list(request_from_app: String!, 
          request_from_page: String!,
          date: String!,
          destOrgCode: [String]!,
          destOrgType: Int!,
          empOrgCode: Int!,
          empOrgType: Int!,
          orgCode: [String!],
          orgType: Int!
          target_name: String!): Table
  }
  type Mutation {
    authorize(code: String!): Authorization
  }
  type Authorization {
    id: Int
    code: String
  }
  type Card {
    title: String
    count: Int
    avg_duration: String
    bnet_avg_duration: String
  }
  type Row {
    avg: String
    count: Int
    dest_region_name: String
    src_region_name: String
  }
  type Table {
    tbody: [Row]
    total: Int
  }
`
