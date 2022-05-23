const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');


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
                    'View employees by manager',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update employee role',
                    'Delete department',
                    'Delete role',
                    'Delete employee',
                    'Quit'
                ]
            }
        )
        // Take response and launch appropriate prompt or function
        .then(({navigation}) => navManager(navigation))
}
const navManager = (navigation) => {
     // If user chose 'view all departments'
     if (navigation === 'View all departments') {
        return showAllDepartments();
    }
    // If user chose 'view all roles'
    else if (navigation === 'View all roles') {
        return showAllRoles();
    }
    // If user chose 'view all employees'
    else if (navigation === 'View all employees') {
        return showAllEmployees();
    }
    // If user chose 'view employees by manager'
    else if (navigation === 'View employees by manager') {
        return empByManager();
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
    // If user chose 'Update employee role'
    else if (navigation === 'Update employee role') {
        return changeEmpRole();
    }
    // If user chose 'Delete department'
    else if (navigation === 'Delete department') {
        return deleteDepartment();
    }
    // If user chose 'Delete department'
    else if (navigation === 'Delete role') {
        return deleteRole();
    }
    // If user chose 'Delete department'
    else if (navigation === 'Delete employee') {
        return deleteEmployee();
    }
    // If user chose 'Quit' exit
    else if (navigation === 'Quit') {
        return db.end();
    }
}

// View All Departments
const showAllDepartments = () => {
    const sql = `SELECT department.name AS department, department.id AS id FROM department`;

    db.promise().query(sql)
        .then( ([rows, fields]) => {
            console.log('View all departments');
            console.table(rows);
            menu();
        })
        .catch(err => {
            console.log(err);
        })
};

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
            newDepartment(name);
        });
};
const newDepartment = (name) => {
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const params = name;

    db.promise().query(sql, params)
        .then( ([result]) => {
            console.log('Adding department...');
            console.log(name + ' has been added');
            menu();
        }) 
        .catch(err => {
            console.log(err);
        })
};

// Delete a department
const deleteDepartment = () => {
    const sql = `SELECT name, id FROM department`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        const departments = rows.map(({ name, id}) => ({ name: name, value: id }));
        return inquirer
            .prompt(
                {
                    type: 'rawlist',
                    name: 'deldept',
                    message: 'Which department would you like to delete?',
                    choices: departments
                }
            )
            .then(({deldept}) => {
                const delSql = `DELETE FROM department WHERE id = ?`;
                const params = [deldept];
                db.query(delSql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Deleting department...');
                    console.log(deldept + ' was deleted');
                    menu();
                })
            })
    }) 
}

// View All Roles
const showAllRoles = () => {
    const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;

    db.promise().query(sql)
        .then( ([rows, fields]) => {
            console.log('View all roles');
            console.table(rows);
            menu();
        })
        .catch(err => {
            console.log(err);
        })
};

// Add a new role
const addRole = () => {
    const sql = `SELECT name, id FROM department`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        const departments = rows.map(({ name, id}) => ({ name: name, value: id }));
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
                            console.log("Please enter a numeric salary for the Role.");
                            return false;
                        }
                    }
                },
                {
                    type: 'rawlist',
                    name: 'department',
                    message: 'Select the department for this role: ',
                    // Populate choices from department list
                    choices: departments
                }
            ])
            .then(({title, salary, department}) => {
                newRole(title, salary, department);
            })
    })
}
const newRole = (title, salary, department_id) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [title, salary, department_id];
    console.log(params);

    db.promise().query(sql, params)
        .then(result => {
            console.log('Adding role...');
            console.log(title + ' has been added');
            menu();
        })
        .catch(err => console.log(err));
}

// Delete a role
const deleteRole = () => {
    const sql = `SELECT title, id FROM role`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        const roles = rows.map(({ title, id}) => ({ name: title, value: id }));
        return inquirer
            .prompt(
                {
                    type: 'rawlist',
                    name: 'delrole',
                    message: 'Which role would you like to delete?',
                    choices: roles
                }
            )
            .then(({delrole}) => {
                const delSql = `DELETE FROM role WHERE id = ?`;
                const params = [delrole];
                db.query(delSql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Deleting role...');
                    console.log(delrole + ' was deleted');
                    menu();
                })
            })
    })  
}

// View All Employees
const showAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title,  department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;

    db.promise().query(sql)
        .then( ([rows, fields]) => {
            console.log('View all departments');
            console.table(rows);
            menu();
        })
        .catch(err => {
            console.log(err);
        })
};

// View employees by manager
const empByManager = () => {
    const managersSql = `SELECT CONCAT(first_name, ' ', last_name) AS manager, id FROM employee`;
        db.query(managersSql, (err, rows) => {
            if (err) throw err;
            const managers = rows.map(({ manager, id}) => ({ name: manager, value: id }));
            return inquirer
                .prompt(
                    {
                        type: 'rawlist',
                        name: 'empmans',
                        message: 'Which manager would you like employees for?',
                        choices: managers
                    }
                )
                .then(({empmans}) => {
                    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title,  department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                    FROM employee 
                    LEFT JOIN role ON employee.role_id = role.id
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee manager ON employee.manager_id = manager.id
                    WHERE employee.manager_id = ?`;
                    const params = [empmans]
                    db.query(sql, params, (err, res) => {
                        if (err) throw err;
                        console.log(`Showing employees...`);
                        console.table(res);
                        menu();
                    })
                })
            })
}

// Add a new employee
const addEmployee = () => {
    const rolesSql = `SELECT title, id FROM role`;
    db.query(rolesSql, (err, rows) => {
        if (err) throw err;
        const roles = rows.map(({ title, id}) => ({ name: title, value: id }));

        const managersSql = `SELECT CONCAT(first_name, ' ', last_name) AS manager, id FROM employee`;
        db.query(managersSql, (err, rows) => {
            if (err) throw err;
            const managers = rows.map(({ manager, id}) => ({ name: manager, value: id }));
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
                        choices: roles
                    },
                    {
                        type: 'rawlist',
                        name: 'manager',
                        message: 'Employee manager: ',
                        choices: managers
                    }
                ])
                .then(({first_name, last_name, role, manager}) => {
                    newEmployee(first_name, last_name, role, manager);
                })
        });    
    });
}
const newEmployee = (first_name, last_name, role_id, manager_id) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
    const params = [first_name, last_name, role_id, manager_id];

    db.promise().query(sql, params)
        .then(result => {
            console.log('Adding employee...');
            console.log(first_name + ' ' + last_name + ' has been added');
            menu();
        })
        .catch(err => console.log(err));
}

// Delete an employee
const deleteEmployee = () => {
    const sql = `SELECT CONCAT(first_name, ' ', last_name) AS staff, id FROM employee`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        const employees = rows.map(({ staff, id}) => ({ name: staff, value: id }));
        return inquirer
            .prompt(
                {
                    type: 'rawlist',
                    name: 'delemp',
                    message: 'Which employee would you like to delete?',
                    choices: employees
                }
            )
            .then(({delemp}) => {
                const delSql = `DELETE FROM employee WHERE id = ?`;
                const params = [delemp];
                db.query(delSql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Deleting employee...');
                    console.log(delemp + ' was deleted');
                    menu();
                })
            })
    })  
}

// Update employee role
const changeEmpRole = () => {
    const rolesSql = `SELECT title, id FROM role`;
    db.query(rolesSql, (err, rows) => {
        if (err) throw err;
        const roles = rows.map(({ title, id}) => ({ name: title, value: id }));

        const empsql = `SELECT CONCAT(first_name, ' ', last_name) AS staff, id FROM employee`;
        db.query(empsql, (err, rows) => {
            if (err) throw err;
            const employees = rows.map(({ staff, id}) => ({ name: staff, value: id }));
            return inquirer
                .prompt([
                    {
                        type: 'rawlist',
                        name: 'emp',
                        message: 'Whose role would you like to update?',
                        choices: employees
                    },
                    {
                        type: 'rawlist',
                        name: 'newrole',
                        message: 'New role for employee: ',
                        choices: roles
                    }
                ])
                .then(({emp, newrole}) => {
                    const updatesql = `UPDATE employee SET role_id = ? WHERE id = ?`;

                    const params = [newrole, emp];
                    db.query(updatesql, params, (err, res) => {
                        if (err) throw err;
                        console.log('Employee role has been updated');
                        menu();
                    })
                })
        });    
    });
}

// Call to initialize the app
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    menu();
});