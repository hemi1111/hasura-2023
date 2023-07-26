import { gql } from "@apollo/client";

export const GET_BADGES = gql`
  query getBadges($search: String!) {
    badges_versions_last(
      where: { is_deleted: { _eq: false }, title: { _ilike: $search } }
      order_by: { created_at: desc }
    ) {
      description
      requirements
      title
      id
    }
  }
`;

export const CREATE_BADGE = gql`
  mutation createBadge(
    $title: String!
    $description: String!
    $requirements: [requirements_definitions_insert_input!]!
  ) {
    insert_badges_definitions(
      objects: {
        title: $title
        description: $description
        badges_definitions_requirements_definitions: { data: $requirements }
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
    create_badge_version(args: { badge_def_id: $id, is_deleted: false }) {
      title
    }
  }
`;

export const DELETE_BADGE = gql`
  mutation deleteBadge($badge_def_id: Int!) {
    create_badge_version(
      args: { badge_def_id: $badge_def_id, is_deleted: true }
    ) {
      id
      is_deleted
    }
  }
`;

export const GET_SINGLE_INFO = gql`
  query getSingleInfo($id: Int!) {
    badges_versions_last(where: { id: { _eq: $id } }) {
      description
      requirements
      title
    }
    badges_definitions {
      badges_definitions_requirements_definitions(
        where: { badge_id: { _eq: $id } }
      ) {
        id
      }
    }
  }
`;

export const GET_BADGE_VERSIONS = gql`
  query badgeVersions($id: Int!) {
    badges_versions(where: { is_deleted: { _eq: false }, id: { _eq: $id } }) {
      description
      requirements
      title
      created_at
    }
  }
`;

export const EDIT_BADGE = gql`
  mutation editBadge(
    $id: Int!
    $title: String!
    $description: String!
    $requirements: jsonb!
  ) {
    update_requirements(args: { requirements: $requirements, u_id: $id }) {
      badge_id
    }
    update_badges_definitions(
      where: { id: { _eq: $id } }
      _set: { description: $description, title: $title }
    ) {
      affected_rows
    }
    create_badge_version(args: { badge_def_id: $id, is_deleted: false }) {
      id
    }
  }
`;
