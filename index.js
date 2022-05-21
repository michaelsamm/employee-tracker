const inquirer = require('inquirer');
const db = require('./db/connection');
const showAllDepartments = require('./lib/department');
const showAllRoles = require('./lib/role');
const showAllEmployees = require('./lib/employee');

const menu = () => {
    return inquirer
        // Menu options
        .prompt(
            {
                type: 'rawlist',
                name: 'navigation',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update employee role',
                    'Quit'
                ]
            }
        )
        // Take response and launch appropriate prompt or function
        .then(({navigation}) => {
            // If user chose 'view all departments'
            if (navigation === 'View all departments') {
                showAllDepartments();
                return menu();
            }
            // If user chose 'view all roles'
            else if (navigation === 'View all roles') {
                showAllRoles();
                return menu();
            }
            // If user chose 'view all employees'
            else if (navigation === 'View all employees') {
                showAllEmployees();
                return menu();
            }
            // If user chose 'Add a department'
            else if (navigation === 'Add a department') {
                return addDepartment();
            }
            // If user chose 'Add a role'
            else if (navigation === 'Add a role') {
                return addRole();
            }
            // If user chose 'Add an employee'
            else if (navigation === 'Add an employee') {
                return addEmployee();
            }
            // If user chose 'Update employee role;
            else if (navigation === 'Update employee role') {
                console.log('update E');
                return menu();
            }
            // If user chose 'Quit' exit
            else if (navigation === 'Quit') {
                return db.end();
            }
        })
}

// Add a new department
const addDepartment = () => {
    return inquirer
        // Prompts for adding a new department
        .prompt(
            {
                type: 'input',
                name: 'name',
                message: 'Department name: ',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    }
                    else {
                        console.log("Please enter a Department name.");
                        return false;
                    }
                }
            }
        )
        .then(({name}) => {
            console.log('name');
            return menu();
        });
}

// Add a new role
const addRole = () => {
    return inquirer
        // Prompts for the new role
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Role title: ',
                validate: titleInput => {
                    if (titleInput) {
                        return true;
                    }
                    else {
                        console.log("Please enter a title for the Role.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Salary: ',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    }
                    else {
                        console.log("Please enter a salary for the Role.");
                        return false;
                    }
                }
            },
            {
                type: 'rawlist',
                name: 'department',
                message: 'Select the department for this role: ',
                // Populate choices from department list
                choices: ['department1','department2']//function to show all department names,
            }
        ])
        .then(({title, salary, department}) => {
            console.log(title, salary, department);
            return menu();
        })
}

// Add a new employee
const addEmployee = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Employee first name: ',
                validate: firstNameInput => {
                    if (firstNameInput) {
                        return true;
                    }
                    else {
                        console.log("Please enter a first name for the Employee.");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Employee last name: ',
                validate: lastNameInput => {
                    if (lastNameInput) {
                        return true;
                    }
                    else {
                        console.log("Please enter a first name for the Employee.");
                        return false;
                    }
                }
            },
            {
                type: 'rawlist',
                name: 'role',
                message: 'Employee role: ',
                // Function to return role titles
                choices: ['QA', 'Dev', 'TS'] //function
            },
            {
                type: 'rawlist',
                name: 'manager',
                message: 'Employee manager: ',
                // Populate choices from department list
                choices: ['Bob','Hennifer']//function to show all employee names,
            }
        ])
}

// Call to initialize the app
menu()

