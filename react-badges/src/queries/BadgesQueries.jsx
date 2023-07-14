import { gql } from "@apollo/client";

export const GET_BADGES = gql`
  query getBadges {
    badges_versions_last {
      description
      requirements
      title
    }
  }
`;

export const ADD_BADGES = gql`
  mutation AddBadges(
    $description: String!
    $requirements: jsonb!
    $title: String!
    $created_by: Int!
  ) {
    insert_badges_versions(
      objects: {
        description: $description
        requirements: $requirements
        title: $title
        created_by: $created_by
      }
    ) {
      returning {
        requirements
        title
        description
        created_by
      }
    }
  }
`;
