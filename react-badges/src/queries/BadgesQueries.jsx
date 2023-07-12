import {gql} from '@apollo/client'

export const GET_BADGES = gql`
query getBadges {
    badges_definitions {
      title
      description
      created_at
    }
  }
`; 