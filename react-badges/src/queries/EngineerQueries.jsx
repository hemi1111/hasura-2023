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
  mutation addEngineer {
    insert_engineers(objects: { name: $name }) {
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

// const DELETE_ENGINEER = gql`
//   mutation deleteEngineer {
//     delete_users_relations(where: { engineer: { _eq: $id } }) {
//       affected_rows
//     }
//     delete_engineers(where: { id: { _eq: &id } }) {
//       affected_rows
//     }
//   }
// `;
