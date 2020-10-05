/* eslint-disable */
// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      firstname
      lastname
      skills
    }
  }
`;

export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: TableEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        lastname
        skills
      }
      nextToken
    }
  }
`;

export const getSkill = /* GraphQL */ `
  query GetSkill($id: String!) {
    getSkill(id: $id) {
      id
      name
    }
  }
`;

export const listSkills = /* GraphQL */ `
  query ListSkills(
    $filter: TableSkillFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;
