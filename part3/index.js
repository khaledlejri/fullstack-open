const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3001;

const logsDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const requestTime = (request, response, next) => {
  request.requestTime = new Date();
  console.log(`Path: ${request.path}, Timestamp: ${request.requestTime}`);
  console.log("---");
  next();
};

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

// Morgan token to log request body
morgan.token("body", (req) => JSON.stringify(req.body));

// Middleware
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

// log all requests to access.log
app.use(
  morgan("common", {
    stream: fs.createWriteStream(path.join(logsDirectory, "access.log"), {
      flags: "a",
    }),
  })
);
//app.use(requestTime);
//app.use(requestLogger);

// Data
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Endpoints
app.get("/", (request, response) => {
  response.send("The server is working");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.statusMessage = `There is no person with the id ${id}`;
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body) {
    return response
      .status(400)
      .json({ error: "Cannot send empty request body" });
  }
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "Name and Number fields are necessary" });
  }

  const nameExists = persons.find((person) => person.name === body.name);

  if (nameExists) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.status(201).json(person);
});

app.get("/info", (request, response) => {
  const infoPage = `<p>Phonebook has info for ${persons.length} people</p><p>${request.requestTime}</p>`;
  response.send(infoPage);
});

// Unknown endpoint middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// helper functions
const generateId = () => {
  return String(Math.floor(Math.random() * 1000000));
};

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
console.log(`http://localhost:${PORT}`);
