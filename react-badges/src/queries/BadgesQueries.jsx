import { gql } from "@apollo/client";

export const GET_BADGES = gql`
  query getBadges {
    badges_definitions {
      id
      title
      description
      badges_definitions_requirements_definitions {
        id
        title
        description
      }
    }
  }
`;

export const ADD_BADGES = gql`
  mutation addBadges(
    $title: String!
    $description: String!
    $requirements: [requirements_definitions_insert_input!]!
  ) {
    insert_badges_definitions(
      objects: {
        description: $description
        title: $title
        badges_definitions_requirements_definitions: { data: $requirements }
      }
    ) {
      returning {
        description
        title
        badges_definitions_requirements_definitions {
          description
          title
        }
      }
    }
  }
`;

export const DELETE_BADGE = gql`
  mutation deleteBadges($id: Int!) {
    delete_requirements_definitions(where: { badge_id: { _eq: $id } }) {
      affected_rows
    }
    delete_badges_definitions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
