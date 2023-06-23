import {useState} from 'react';

function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems(prev => [...prev, item]);
  }
  function handleDelete(id) {
    setItems(item => item.filter(cur => cur.id !== id));
  }
  function handleToggleItems(id) {
    setItems(item =>
      item.map(cur => (cur.id === id ? {...cur, packed: !cur.packed} : cur))
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        onDeleteItems={handleDelete}
        onToggleItem={handleToggleItems}
        items={items}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1 className="fw-bold">🏝️ Far Away 🧳</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {description, quantity, packed: false, id: Date.now()};
    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({length: 20}, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({items, onDeleteItems, onToggleItem}) {
  return (
    <div className=" list">
      <ul className="row ">
        {items.map(item => (
          <Item
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            item={item}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({item, onDeleteItems, onToggleItem}) {
  return (
    <li className=" col-4 mb-5">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? {textDecoration: 'Line-through'} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
function Stats({items}) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? 'You got everything! Ready to go ✈️'
          : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default App;
