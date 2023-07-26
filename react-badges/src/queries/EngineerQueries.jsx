import { gql } from "@apollo/client";

export const GET_ENGINEERS = gql`
  query getEngineers($_ilike: String!) {
    engineers_with_managers(
      order_by: { name: asc }
      where: { name: { _ilike: $_ilike } }
    ) {
      id
      name
      managers
    }
  }
`;
export const GET_ENGINEER = gql`
  query Get($id: Int!) {
    engineers(where: { id: { _eq: $id } }) {
      id
      name
    }
  }
`;

export const GET_MANAGERS_BY_ENGINEER = gql`
  mutation getManagersByEngineer($id: Int!) {
    get_manager_by_engineers(args: { engineer_id: $id }) {
      name
      id
    }
  }
`;

export const ADD_ENGINEER = gql`
  mutation addEngineer($name: String!) {
    insert_users_one(object: { name: $name, roles: ["engineer"] }) {
      id
      name
    }
  }
`;

export const UPDATE_ENGINEER = gql`
  mutation updateEngineer($id: Int!, $name: String!) {
    update_engineers(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        name
      }
    }
  }
`;

export const DELETE_ENGINEER = gql`
  mutation deleteEngineer($id: Int!) {
    update_engineers(where: { id: { _eq: $id } }, _set: { is_deleted: true }) {
      affected_rows
    }
  }
`;

export const GET_ENGINEER_BY_MANAGER = gql`
  mutation relationsEngineerManager($id: Int!) {
    get_engineers_by_manager(args: { manager_id: $id }) {
      name
    }
  }
`;

export const GET_ENGINEER_MANAGERS_RELATION = gql`
  query engineerRelations($id: Int!) {
    engineers_with_managers(where: { id: { _eq: $id } }) {
      id
      name
      managers
    }
  }
`;

export const GET_MANAGER_WITHOUT_RELATION = gql`
  mutation managerWithoutRelation($id: Int!) {
    get_managers_without_relation(args: { id: $id }) {
      id
      name
    }
  }
`;

export const ADD_ENGINEER_MANAGER_RELATION = gql`
  mutation insertRelation($engineer: Int!, $manager: Int!) {
    insert_users_relations_one(
      object: { engineer: $engineer, manager: $manager }
    ) {
      engineer
      manager
    }
  }
`;

export const UPDATE_ENGINEER_MANAGER_RELATION = gql`
  mutation updateRelation($id: Int!, $oldManager: Int!, $newManager: Int!) {
    update_users_relations(
      where: { engineer: { _eq: $id }, manager: { _eq: $oldManager } }
      _set: { manager: $newManager }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_ENGINEER_MANAGER_RELATION = gql`
  mutation deleteEngineersRelations($engineer: Int!, $manager: Int!) {
    delete_users_relations(
      where: { manager: { _eq: $manager }, engineer: { _eq: $engineer } }
    ) {
      affected_rows
    }
  }
`;
