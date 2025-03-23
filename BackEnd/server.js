const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());  

const usersFilePath = path.join(__dirname, 'Users', 'users.json');
const companiesFilePath = path.join(__dirname, 'Users', 'companies.json');

 
const readDataFromFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

 
const writeDataToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

 
app.get('/', (req, res) => {
  res.send('Welcome to the JobTalks API');
});

 
app.get('/users', (req, res) => {
  const users = readDataFromFile(usersFilePath);
  res.json(users);
});

 
app.get('/users/:id', (req, res) => {
  const users = readDataFromFile(usersFilePath);
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

 
app.post('/users', (req, res) => {
  const users = readDataFromFile(usersFilePath);
  const newUser = { id: Date.now().toString(), ...req.body };
  users.push(newUser);
  writeDataToFile(usersFilePath, users);
  res.status(201).json(newUser);
});

 
app.put('/users/:id', (req, res) => {
  const users = readDataFromFile(usersFilePath);
  const index = users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    writeDataToFile(usersFilePath, users);
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

 
app.get('/users/exists/:email', (req, res) => {
  const users = readDataFromFile(usersFilePath);
  const userExists = users.some(u => u.email === req.params.email);
  res.json({ exists: userExists });
});

 
app.post('/users/check-credentials', (req, res) => {
  const users = readDataFromFile(usersFilePath);
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

 
app.post('/users/guest-login', (req, res) => {
  const users = readDataFromFile(usersFilePath);
  const defaultData = {
    name: "Guest User",
    email: "guest@example.com",
    method: "guest",
  };

  const existingUser = users.find(u => u.email === defaultData.email);

  if (existingUser) {
    Object.assign(existingUser, defaultData);
    writeDataToFile(usersFilePath, users);
    res.json(existingUser);
  } else {
    const newGuest = { id: Date.now().toString(), ...defaultData };
    users.push(newGuest);
    writeDataToFile(usersFilePath, users);
    res.status(201).json(newGuest);
  }
});

// Get all companies
app.get('/companies', (req, res) => {
  const companies = readDataFromFile(companiesFilePath);
  res.json(companies);
});

// Get company by ID
app.get('/companies/:id', (req, res) => {
  const companies = readDataFromFile(companiesFilePath);
  const company = companies.find(c => c.id === req.params.id);
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
});

// Add a new company
app.post('/companies', (req, res) => {
  const companies = readDataFromFile(companiesFilePath);
  const newCompany = { id: Date.now().toString(), ...req.body };
  companies.push(newCompany);
  writeDataToFile(companiesFilePath, companies);
  res.status(201).json(newCompany);
});

// Update company by ID
app.put('/companies/:id', (req, res) => {
  const companies = readDataFromFile(companiesFilePath);
  const index = companies.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    companies[index] = { ...companies[index], ...req.body };
    writeDataToFile(companiesFilePath, companies);
    res.json(companies[index]);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});