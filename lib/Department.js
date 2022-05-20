// department name, department id
class Department {
    constructor(id = '', name = '') {
        this.id = id;
        this.name = name
    };
}

// CREATE TABLE department (
//     id INT PRIMARY KEY,
//     name VARCHAR(30)
// )

module.exports = Department;