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
  mutation createBadge(
    $title: String!
    $description: String!
    $req_title: String!
    $req_description: String!
  ) {
    insert_badges_definitions(
      objects: {
        description: $description
        title: $title
        badges_definitions_requirements_definitions: {
          data: { description: $req_description, title: $req_title }
        }
      }
    ) {
      affected_rows
      returning {
        description
        title
      }
    }
  }
`;

export const CREATE_BADGE_VERSION = gql`
  mutation create_badge_version($id: Int!) {
    create_badge_version(args: { badge_def_id: $id }) {
      title
    }
  }
`;
