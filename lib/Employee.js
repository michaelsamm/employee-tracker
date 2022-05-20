// employee id, first name, last name, role, department, salary, manager(s)
class Employee {
    constructor(id = '', first_name = '', last_name = '', role_id = [], manager_id = []) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
}

// CREATE TABLE employee (
//     id INT PRIMARY KEY,
//     first_name VARCHAR(30),
//     last_name VARCHAR(30),
//     role_id INT,
//     manager_id INT,
//     constraint fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL
//     constraint fk_id FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
// )

module.exports = Employee;