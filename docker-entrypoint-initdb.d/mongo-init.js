db.createCollection('employees');

const names = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Brown",
  "David Wilson",
  "Eva Davis",
  "Frank Miller",
  "Grace Lee",
  "Hannah White",
  "Isaac Harris",
  "Jack Thompson",
  "Karen Garcia",
  "Liam Martinez",
  "Mia Robinson",
  "Nathan Clark",
  "Olivia Rodriguez",
  "Paul Lewis",
  "Quincy Walker",
  "Rachel Hall",
  "Sam Allen",
  "Tina Young"
];

const workPositions = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "Graphic Designer",
  "Marketing Specialist",
  "Sales Manager",
  "Human Resources Manager",
  "Financial Analyst",
  "Customer Service Representative",
  "Operations Manager",
  "Quality Assurance Tester",
  "Business Analyst",
  "Project Coordinator",
  "IT Support Specialist",
  "Web Developer",
  "Accountant",
  "Content Writer",
  "Social Media Manager",
  "UX/UI Designer",
  "Network Administrator"
];

const employees = Array.from({ length: 20}, (_, index) => ({
  nome: names[index],
  cargo: workPositions[index],
  departamento: `Analista ${index}`
}))

db.employees.insertMany(employees);

