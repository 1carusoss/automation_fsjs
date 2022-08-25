"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetAllUsersQuery = exports.GetAllUsersDocument = exports.useGetUserQuery = exports.GetUserDocument = exports.useDeleteUserMutation = exports.DeleteUserDocument = exports.useEditUserMutation = exports.EditUserDocument = exports.useCreateUserMutation = exports.CreateUserDocument = void 0;
const react_query_1 = require("react-query");
function fetcher(endpoint, requestInit, query, variables) {
    return async () => {
        const res = await fetch(endpoint, {
            method: 'POST',
            ...requestInit,
            body: JSON.stringify({ query, variables }),
        });
        const json = await res.json();
        if (json.errors) {
            const { message } = json.errors[0];
            throw new Error(message);
        }
        return json.data;
    };
}
exports.CreateUserDocument = `
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    name
  }
}
    `;
const useCreateUserMutation = (dataSource, options) => (0, react_query_1.useMutation)('CreateUser', (variables) => fetcher(dataSource.endpoint, dataSource.fetchParams || {}, exports.CreateUserDocument, variables)(), options);
exports.useCreateUserMutation = useCreateUserMutation;
exports.EditUserDocument = `
    mutation EditUser($input: EditUserInput!) {
  editUser(input: $input) {
    id
    username
    name
  }
}
    `;
const useEditUserMutation = (dataSource, options) => (0, react_query_1.useMutation)('EditUser', (variables) => fetcher(dataSource.endpoint, dataSource.fetchParams || {}, exports.EditUserDocument, variables)(), options);
exports.useEditUserMutation = useEditUserMutation;
exports.DeleteUserDocument = `
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    username
    name
  }
}
    `;
const useDeleteUserMutation = (dataSource, options) => (0, react_query_1.useMutation)('DeleteUser', (variables) => fetcher(dataSource.endpoint, dataSource.fetchParams || {}, exports.DeleteUserDocument, variables)(), options);
exports.useDeleteUserMutation = useDeleteUserMutation;
exports.GetUserDocument = `
    query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    name
  }
}
    `;
const useGetUserQuery = (dataSource, variables, options) => (0, react_query_1.useQuery)(['GetUser', variables], fetcher(dataSource.endpoint, dataSource.fetchParams || {}, exports.GetUserDocument, variables), options);
exports.useGetUserQuery = useGetUserQuery;
exports.GetAllUsersDocument = `
    query GetAllUsers($nextToken: String) {
  getAllUsers(nextToken: $nextToken) {
    items {
      id
      username
      name
    }
  }
}
    `;
const useGetAllUsersQuery = (dataSource, variables, options) => (0, react_query_1.useQuery)(variables === undefined ? ['GetAllUsers'] : ['GetAllUsers', variables], fetcher(dataSource.endpoint, dataSource.fetchParams || {}, exports.GetAllUsersDocument, variables), options);
exports.useGetAllUsersQuery = useGetAllUsersQuery;
