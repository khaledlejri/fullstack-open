import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [notification, setNotification] = useState(null);

  /*
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response);
      setPersons(response.data);
    });
  }, []);
  */
  useEffect(() => {
    phonebookService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message: message, type: type });
    setTimeout(() => setNotification(null), 5000);
  };

  const onNumberSubmit = (event) => {
    event.preventDefault();
    if (newName === "" || newNum === "") {
      alert("Both fields must be non empty to proceed");
    } else if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        const updatedPerson = { ...personToUpdate, number: newNum };
        phonebookService
          .update(updatedPerson.id, updatedPerson)
          .then(
            setPersons(
              persons.map((person) =>
                person.name === newName ? updatedPerson : person
              )
            )
          )
          .then(() => {
            setNewName("");
            setNewNum("");
          })
          .then(() => {
            console.log("number updated successfully");
          });
      } else {
        console.log("operation was cancelled");
      }
    } else {
      const newPersonObject = {
        name: newName,
        number: newNum,
      };
      phonebookService
        .create(newPersonObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNum("");
          showNotification(
            `${newName} was added with number ${newNum}`,
            "success"
          );
        })
        .catch((error) => {
          console.error("Error creating new number", error);
        });
    }
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumChange = (event) => {
    setNewNum(event.target.value);
  };

  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const includesCaseInsensitive = (str, searchString) =>
    new RegExp(searchString, "i").test(str);

  const filteredPersons = persons.filter((person) =>
    includesCaseInsensitive(person.name, searchTerm)
  );

  const onDelete = (person) => {
    console.log("delete button clicked");
    if (window.confirm(`Delete ${person.name}?`)) {
      const removedId = person.id;
      console.log("index to delete:", removedId);
      console.log("confirmed");
      phonebookService
        .remove(removedId)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== removedId));
        })
        .catch((error) => {
          console.log(`Error while deleting: ${error}`);
        });
    } else {
      console.log("canceled");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNum={newNum}
        onNameChange={onNameChange}
        onNumChange={onNumChange}
        onNumberSubmit={onNumberSubmit}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} onDelete={onDelete} />
    </div>
  );
};

export default App;
