/* eslint-disable */
// this is an auto generated file. This will be overwritten
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee($input: CreateEmployeeInput!) {
    createEmployee(input: $input) {
      id
      firstname
      lastname
      skills
    }
  }
`;

export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
      id
      firstname
      lastname
      skills
    }
  }
`;

export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee($input: DeleteEmployeeInput!) {
    deleteEmployee(input: $input) {
      id
      firstname
      lastname
      skills
    }
  }
`;

export const createSkill = /* GraphQL */ `
  mutation CreateSkill($input: CreateSkillInput!) {
    createSkill(input: $input) {
      id
      name
    }
  }
`;
export const updateSkill = /* GraphQL */ `
  mutation UpdateSkill($input: UpdateSkillInput!) {
    updateSkill(input: $input) {
      id
      name
    }
  }
`;

export const deleteSkill = /* GraphQL */ `
  mutation DeleteSkill($input: DeleteSkillInput!) {
    deleteSkill(input: $input) {
      id
      name
    }
  }
`;
