
const db = require('../db/connection');
const cTable = require('console.table');

const showAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title,  department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.promise().query(sql)
        .then( ([rows, fields]) => {
            console.log('View all departments');
            return console.table(rows);
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports = showAllEmployees;