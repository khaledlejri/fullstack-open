const PersonForm = ({
  newName,
  newNum,
  onNameChange,
  onNumChange,
  onNumberSubmit,
}) => {
  return (
    <form onSubmit={onNumberSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNum} onChange={onNumChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
