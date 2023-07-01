import {useState} from 'react';
import {Logo} from './Logo';
import {Form} from './Form';
import {PackingList} from './PackingList';
import {Stats} from './Stats';

function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems(prev => [...prev, item]);
  }
  function handleDelete(id) {
    setItems(item => item.filter(cur => cur.id !== id));
  }
  function handleClearList() {
    const confirmMessage = window.confirm('Do you want to clear your list?');
    if (confirmMessage) setItems([]);
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
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
export default App;
