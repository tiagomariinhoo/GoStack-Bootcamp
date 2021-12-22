import React, { FormEvent, useCallback, useState } from 'react';
import { SearchResults } from './components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
}

function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  })

  const handleSearch = async (event: FormEvent) => {
    // To avoid that the page will be updated
    event.preventDefault()

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map((product: any) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((total: any, product: any) => {
      return total + product.price;
    }, 0)

    setResults({ totalPrice, data: products})
  }

  const addToWishList = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)} />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        onAddToWishList={addToWishList}
        results={results!.data} 
        totalPrice={results!.totalPrice}
        />
    </div>
  );
}

export default App;

/**
 * 1. Create a new version of the component
 * 2. Compare with the previous version
 * 3. If there is changes, will update the changes
 */
