import { gql } from "@apollo/client";

export const GET_ENGINEERS = gql`
  query getEngineers {
    engineers(order_by: { name: asc }) {
      name
      id
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
