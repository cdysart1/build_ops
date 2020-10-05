/* eslint-disable */
// this is an auto generated file. This will be overwritten
import gql from "graphql-tag";

export const onCreateEmployee = /* GraphQL */ gql(`
  subscription OnCreateEmployee(
    $id: ID
    $firstname: String
    $lastname: String
    $skills: AWSJSON
  ) {
    onCreateEmployee(
      id: $id
      firstname: $firstname
      lastname: $lastname
      skills: $skills
    ) {
      id
      firstname
      lastname
      skills
    }
  }
`);

export const onUpdateEmployee = /* GraphQL */ gql(`
  subscription OnUpdateEmployee(
    $id: ID
    $firstname: String
    $lastname: String
    $skills: AWSJSON
  ) {
    onUpdateEmployee(
      id: $id
      firstname: $firstname
      lastname: $lastname
      skills: $skills
    ) {
      id
      firstname
      lastname
      skills
    }
  }
`);

export const onDeleteEmployee = /* GraphQL */ gql(`
  subscription OnDeleteEmployee(
    $id: ID
    $firstname: String
    $lastname: String
    $skills: AWSJSON
  ) {
    onDeleteEmployee(
      id: $id
      firstname: $firstname
      lastname: $lastname
      skills: $skills
    ) {
      id
      firstname
      lastname
      skills
    }
  }
`);

export const onCreateSkill = /* GraphQL */ gql(`
  subscription OnCreateSkill($id: ID, $name: String) {
    onCreateSkill(id: $id, name: $name) {
      id
      name
    }
  }
`);

export const onUpdateSkill = /* GraphQL */ gql(`
  subscription OnUpdateSkill($id: ID, $name: String) {
    onUpdateSkill(id: $id, name: $name) {
      id
      name
    }
  }
`);

export const onDeleteSkill = /* GraphQL */ gql(`
  subscription OnDeleteSkill($id: ID, $name: String) {
    onDeleteSkill(id: $id, name: $name) {
      id
      name
    }
  }
`);
