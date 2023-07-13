import { gql } from "@apollo/client";
export const DELETE_MANAGER = gql`
  mutation deleteMngr($id: Int!) {
    deleteRelationAsManager: delete_users_relations(
      where: { manager: { _eq: $id } }
    ) {
      affected_rows
    }
    deleteRelationAsEngineer: delete_users_relations(
      where: { engineer: { _eq: $id } }
    ) {
      affected_rows
    }
    delete_users(where: { id: { _eq: $id } }) {
      returning {
        name
      }
    }
  }
`;
export const GET_ENGINEERS_BY_MANAGER = gql`
  mutation getEngineerByMngr {
    get_engineers_by_manager(args: { manager_id: 5 }, order_by: { id: asc }) {
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
  query getManagersAndEngineers {
    managers {
      id
      name
    }
    engineers {
      id
      name
    }
  }
`;
export default {
  GET_MANAGERS,
  DELETE_MANAGER,
  ADD_RELATION
};
