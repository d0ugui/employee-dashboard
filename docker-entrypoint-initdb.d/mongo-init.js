db.createCollection('employee');

const employees = Array.from({ length: 20}, (_, index) => ({
  nome: `Employee ${index}`,
  cargo: `Analista ${index}`,
  departamento: "Tecnologia"
}))

db.employee.insertMany(employees);

