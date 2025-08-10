import { useState } from "react";
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example: Generate a random integer between 1 and 10 (inclusive)
let randomInteger = getRandomIntInclusive(1, 10);
console.log(randomInteger);

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const DisplayVotes = ({ currentVote }) => {
  return <p>{`has ${currentVote} votes`}</p>;
};

const DisplayMostVoted = (props) => {
  const { mostVotedAnecdote, votes } = props;
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{mostVotedAnecdote}</p>
      <DisplayVotes currentVote={votes} />
    </div>
  );
};

const App = () => {
  const randomAnecdoteHandler = () => {
    const randomIndex = getRandomIntInclusive(0, anecdotes.length - 1);
    setSelected(randomIndex);
    console.log(selected);
  };

  const voteHandler = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;

    // Find the index of the top voted anecdote using the updated copy
    const maxVotes = Math.max(...votesCopy);
    const maxIndex = votesCopy.indexOf(maxVotes);

    setVotes(votesCopy);
    setTopVotedIndex(maxIndex);
  };

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [topVotedIndex, setTopVotedIndex] = useState(0);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <DisplayVotes currentVote={votes[selected]} />
      <Button text="vote" onClick={voteHandler} />
      <Button text="next anecdote" onClick={randomAnecdoteHandler} />
      <DisplayMostVoted
        mostVotedAnecdote={anecdotes[topVotedIndex]}
        votes={votes[topVotedIndex]}
      />
    </div>
  );
};

export default App;
