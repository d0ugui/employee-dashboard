db.createCollection('employees');

const employees = Array.from({ length: 20}, (_, index) => ({
  nome: `Employee ${index}`,
  cargo: `Analista ${index}`,
  departamento: "Tecnologia"
}))

db.employees.insertMany(employees);

