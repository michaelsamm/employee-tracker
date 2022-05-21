INSERT INTO department (name)
VALUES
    ('R&D'),
    ('HR'),
    ('ADMIN'),
    ('SALES');

INSERT INTO role (title, salary, department_id)
VALUES
    ('QA', 55000, 1),
    ('DEV', 75000, 1),
    ('VP', 135000, 3),
    ('Secretary', 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Jon', 'Ford', 1, null),
    ('Patty', 'Begonia', 1, 1),
    ('Jeronimy', 'Jergovitz', 1, 1),
    ('Billy', 'Child', 2, null),
    ('Deborah', 'Scott', 3, null);