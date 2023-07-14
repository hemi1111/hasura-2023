import { gql } from "@apollo/client";

export const GET_BADGES = gql`
  query getBadges {
    badges_versions_last {
      description
      requirements
      image
      title
    }
  }
`;

export const ADD_BADGES = gql`
  mutation addBadges(
    $title: String!
    $description: String!
    $image: String!
    $requirements: [requirements_definitions_insert_input!]!
  ) {
    insert_badges_definitions(
      objects: {
        description: $description
        title: $title
        image: $image
        badges_definitions_requirements_definitions: { data: $requirements }
      }
    ) {
      returning {
        description
        title
        image
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
