import { gql } from "@apollo/client";
export const DELETE_MANAGER = gql`
  mutation deleteMngr($id: Int!) {
    update_valid_users(
      where: { id: { _eq: $id } }
      _set: { is_deleted: true }
    ) {
      returning {
        name
        id
      }
      affected_rows
    }
  }
`;
export const GET_ENGINEERS_BY_MANAGER = gql`
  mutation getEngineerByMngr($id: Int!) {
    get_engineers_by_manager(
      args: { manager_id: $id }
      order_by: { name: asc }
    ) {
      name
      id
    }
  }
`;
export const ADD_RELATION = gql`
  mutation addRela($engineer: Int!, $manager: Int!) {
    insert_users_relations_one(
      object: { engineer: $engineer, manager: $manager }
    ) {
      manager
      engineer
      created_by
      created_at
    }
  }
`;
export const GET_MANAGERS = gql`
  query getManagers($name: String!) {
    managers(where: { name: { _ilike: $name } }, order_by: { name: asc }) {
      name
      id
    }
  }
`;
export const GET_MANAGER = gql`
  query getManager($id: Int!) {
    managers(where: { id: { _eq: $id } }) {
      name
      id
    }
  }
`;
export const DELETE_RELATION = gql`
  mutation deleteRel($manager_id: Int!, $engineer_id: Int!) {
    delete_users_relations(
      where: { manager: { _eq: $manager_id }, engineer: { _eq: $engineer_id } }
    ) {
      returning {
        manager
        engineer
      }
      affected_rows
    }
  }
`;
export const UPDATE_MANAGER = gql`
  mutation updateManager($id: Int!, $name: String!) {
    update_managers(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        name
      }
    }
  }
`;
export const GET_UNASSIGNED_ENGINEERS = gql`
  mutation getUnassignedEngr($manager: Int!) {
    get_unassigned_engineers(args: { manager_id: $manager }) {
      name
      id
    }
  }
`;
export const CREATE_MANAGER = gql`
  mutation CreateManager($name: String!) {
    insert_users_one(object: { name: $name, roles: ["manager"] }) {
      id
      created_at
      modified_at
      name
    }
  }
`;
