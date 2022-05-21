const db = require('../db/connection');
const cTable = require('console.table');

const showAllRoles = () => {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;

    db.promise().query(sql)
        .then( ([rows, fields]) => {
            console.log('View all roles');
            return console.table(rows);
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports = showAllRoles;