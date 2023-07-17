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

export const CREATE_BADGE = gql`
  mutation createBadge(
    $title: String!
    $description: String!
    $req_title: String!
    $req_description: String!
  ) {
    insert_badges_definitions(
      objects: {
        title: $title
        description: $description
        badges_definitions_requirements_definitions: {
          data: { description: $req_description, title: $req_title }
        }
      }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const CREATE_BADGE_VERSION = gql`
  mutation createBadgeVersion($id: Int!) {
    create_badge_version(args: { badge_def_id: $id }) {
      title
    }
  }
`;
