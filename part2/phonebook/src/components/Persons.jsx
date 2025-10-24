import DeleteButton from "./DeleteButton";
const Persons = ({ filteredPersons, onDelete }) => {
  return (
    <ul>
      {filteredPersons.map((person, index) => (
        <li key={index}>
          {person.name} {person.number}{" "}
          <DeleteButton onClick={() => onDelete(person)} />
        </li>
      ))}
    </ul>
  );
};

export default Persons;
