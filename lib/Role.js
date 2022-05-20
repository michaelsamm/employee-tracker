// job title, role id, dept the role belongs to, salary

class Role {
    constructor(id = '', title = '', salary = '', department_id = []) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id
    }
}

// CREATE TABLE role (
//     id INT PRIMARY KEY,
//     title VARCHAR(30),
//     salary DECIMAL,
//     department_id INT,
//     constraint fk_dept FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
// )

module.exports = Role;