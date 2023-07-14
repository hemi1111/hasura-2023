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

export const CREATE_BADGE_MUTATION = gql`
  mutation createBadge($title: String!, $description: String!) {
    insert_badges_definitions(
      objects: { title: $title, description: $description }
    ) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const CREATE_BADGE_VERSION = gql`
  mutation MyMutation($id: Int!) {
    create_badge_version(args: { badge_def_id: $id }) {
      title
    }
  }
`;
