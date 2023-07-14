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
  mutation createBadge {
    insert_badges_definitions(objects: { title: "j", description: "j" }) {
      affected_rows
      returning {
        id
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
