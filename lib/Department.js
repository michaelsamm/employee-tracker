const db = require('../db/connection');
const cTable = require('console.table');

const showAllDepartments = () => {
    const sql = `SELECT department.name AS department, department.id AS id FROM department`;

    db.promise().query(sql)
        .then( ([rows, fields]) => {
            console.log('View all departments');
            return console.table(rows);
        })
        .catch(err => {
            console.log(err);
        })
};

module.exports = showAllDepartments;