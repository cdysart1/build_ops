import gql from "graphql-tag";
import { listEmployees, listSkills } from '../graphql/queries';

export const fetchEmployees = (client, setEmployees) => {
  try {
    const employeeData = client.readQuery({
      query: gql(listEmployees),
    });
    setEmployees(employeeData.listEmployees.items);
    localStorage.setItem('employeeData', JSON.stringify(employeeData.listEmployees.items));
  }
  catch (error) {
    console.log(`error fetching employees: ${error}`)
  }
};

export const fetchSkills = (client, setSkills) => {
  try {
    const skillsData = client.readQuery({
      query: gql(listSkills),
    });
    setSkills(skillsData.listSkills.items);
    localStorage.setItem('skillsData', JSON.stringify(skillsData.listSkills.items));
  }
  catch (error) {
    console.log(`error fetching skills: ${error}`)
  }
}
