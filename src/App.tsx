import { useState } from 'react';
import './App.css';
import Cooking from './components/Cooking';
import Gifts from './components/Gifts';
import cooking from '/assets/cooking.png';
import gifts from '/assets/gifts.png';

function App() {
  const [selected, setSelected] = useState('cooking')
  const routes = [
    {
      name: "Cooking",
      key: 'cooking',
      component: Cooking,
      icon: cooking
    },
    {
      name: "Gifts",
      key: 'gifts',
      component: Gifts,
      icon: gifts
    }
  ]

  return (
    <div className="frame-wrapper">
      <div className="side-bar">
        {routes.map((route) => (<div onClick={() => setSelected(route.key)} className={`item ${selected === route.key && "active"}`} style={{ background: `#ffd284 url(${route.icon})` }} key={route.key}></div>))}
      </div>
      <div className="visor">
        {routes.filter(x => x.key === selected).map((route) => (<route.component key={route.key} />))}
      </div>
    </div>
  )
}

export default App
