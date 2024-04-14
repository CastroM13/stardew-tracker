import { FC, useEffect, useState } from 'react';
import StorageService from '../services/Storage.service';
import { IFood } from '../interfaces/IFood.interface';
import ApiService from '../services/Api.service';
import completed from '/assets/completed.png';

interface CookingProps { }

const Cooking: FC<CookingProps> = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [done, setDone] = useState<String[]>([]);
  const [ingredients, setIngredients] = useState<{ [key: string]: any }>({});
  const [filter, setFilter] = useState<string | undefined>();

  const stringToHex = (str: string) => {
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      hex += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return hex;
  }

  const updateDone = (value: string | undefined, isActive: boolean) => {
    if (isActive) {
      const newDone = done.filter(x => x !== stringToHex(value || ''));
      setDone(newDone)
      return StorageService.set('done', newDone);
    }
    const newDone = [...done, stringToHex(value || '')];
    setDone(newDone)
    return StorageService.set('done', newDone);
  }

  const updateAmount = (ingredient: string, value: number) => {
    const stored = StorageService.get<{ [key: string]: any }>('ingredientAmounts') || {};
    if (stored[ingredient]) {
      stored[ingredient] += value;
    }
    stored[ingredient] = value;
    StorageService.set('ingredientAmounts', stored);
  }

  useEffect(() => {
    ApiService.getFood().then((data) => setFoods(data));
    setDone(StorageService.get<String[]>('done') || []);
    setIngredients(StorageService.get<String[]>('ingredientAmounts') || []);
  }, []);

  const isActive = (name: string) => {
    return !!done.find((x) => x === stringToHex(name))
  }

  return (
    <>
      <h3>Foods</h3>
      <div id="frame">
        {foods.map((food) => <img onClick={() => updateDone(food.name, isActive(food.name!))} className={`food` + (isActive(food.name!) ? ' checked' : '')} key={stringToHex(food.name || '')} src={`https://stardewvalleywiki.com${food.image}`} />)}
      </div>
      <br />
      <div className="title-flex">
        <h3>Ingredients
        </h3>
        <div>
          <span>Filter by: </span>
          <button onClick={() => filter === 'completed' ? setFilter(undefined) : setFilter('completed')} data-active={filter === 'completed'}>Completed</button>
          <button onClick={() => filter === 'pending' ? setFilter(undefined) : setFilter('pending')} data-active={filter === 'pending'}>Pending</button>
        </div>
      </div>
      <div id="components">
        {foods.filter(food => !done.includes(stringToHex(food.name || ''))).flatMap(food => food.ingredients).reduce((acc: any[], curr: any) => {
          const existingIngredient = acc.find(ingredient => ingredient.name === curr.name);
          if (existingIngredient) {
            existingIngredient.amount += curr.amount;
          } else {
            acc.push({ ...curr });
          }
          return acc;
        }, []).map(ingredient => ({...ingredient, completed: ingredients[ingredient.name] == ingredient.amount})).filter(ingredient => {
          return filter === 'completed' ? ingredient.completed : (filter === 'pending' ? !ingredient.completed : true)
        }).map(ingredient => (
          <div className={ingredient.completed ? 'completed' : undefined} key={ingredient.name}>
            <div>
              <img src={ingredient.image} alt="" />
              <a target="_blank" rel="noopener noreferrer" href={ingredient.link}>{ingredient.name}</a>
            </div>
            <div>
              {ingredient.completed && <img src={completed} />}
              <input onKeyUp={(event) => updateAmount(ingredient.name, (event?.target as any).value)} defaultValue={ingredients[ingredient.name] || 0} style={{ width: "30px", textAlign: 'right' }} type="text" />
              <span>/{ingredient.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  )
};

export default Cooking;
