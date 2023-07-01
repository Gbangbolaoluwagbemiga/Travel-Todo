import {useState} from 'react';
import {Item} from './Item';

export function PackingList({items, onDeleteItems, onToggleItem, onClearList}) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;

  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className=" list">
      <ul className="row ">
        {sortedItems.map(item => (
          <Item
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            item={item}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        {items.length > 0 ? (
          <button onClick={onClearList}>Clear list</button>
        ) : (
          <button>Clear list</button>
        )}
      </div>
    </div>

    // </div>
  );
}
