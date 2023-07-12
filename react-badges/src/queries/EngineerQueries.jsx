import { gql } from "@apollo/client";

export const GET_ENGINEERS = gql`
  query getManagersAndEngineers {
    engineers {
      id
      name
    }
  }
`;
export const GET_ENGINEER = gql`
  query Get {
    engineers(where: { id: { _eq: $id } }) {
      id
      name
    }
  }
`;
export const ADD_ENGINEER = gql`
  mutation addEngineer($name: String!) {
    insert_users_one(objects: { name: $name, roles: ["engineer"] }) {
      returning {
        name
      }
    }
  }
`;

export const UPDATE_ENGINEER = gql`
  mutation updateEngineer {
    update_engineers(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        name
      }
    }
  }
`;

export const DELETE_ENGINEER = gql`
  mutation deleteEngineer($id: Int!) {
    deleteRelationManager: delete_users_relations(
      where: { manager: { _eq: $id } }
    ) {
      affected_rows
    }
    deleteRelationEngineer: delete_users_relations(
      where: { engineer: { _eq: $id } }
    ) {
      affected_rows
    }
    delete_users(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
