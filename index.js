const inquirer = require('inquirer');

const menu = () => {
    return inquirer
        // Menu options
        .prompt(
            {
                type: 'rawlist',
                name: 'menu',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update employee role'
                ]
            }
        )
        // Take response and launch appropriate prompt or function
        .then(({menu}) => {
            // If user chose 'view all departments'
            if (menu === 'View all departments') {

            }
            // If user chose 'view all roles'
            else if (menu === 'View all roles') {

            }
            // If user chose 'view all employees'
            else if (menu === 'View all employees') {

            }
            // If user chose 'Add a department'
            else if (menu === 'Add a department') {

            }
            // If user chose 'Add a role'
            else if (menu === 'Add a role') {

            }
            // If user chose 'Add an employee'
            else if (menu === 'Add an employee') {

            }
            // If user chose 'Update employee role;
            else if (menu === 'Update employee role') {
                
            }
        })
}