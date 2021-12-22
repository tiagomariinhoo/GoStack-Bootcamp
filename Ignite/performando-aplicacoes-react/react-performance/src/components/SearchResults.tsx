import { useMemo } from "react";
import { ProductItem } from "./ProductItem";
import { AutoSizer, List, ListRowRenderer } from 'react-virtualized'

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }>

  onAddToWishList: (id: number) => void;
  totalPrice: number;
}

export function SearchResults({ results, onAddToWishList, totalPrice }: SearchResultsProps) {

  /**
   * If Im not using useMemo here, always that SearchResults
   * re-render, will create the Total Price from scratch.
   * 
   * Use an useMemo, can avoid this, mainly cause this calculation
   * can take a while
   */
  // const totalPrice = useMemo(() => {
  //   return results.reduce((total, product) => {
  //     return total + product.price;
  //   }, 0)

  // }, [results])

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index ]}
          onAddToWishList={onAddToWishList} />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
      {/* {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishList={onAddToWishList} />
        );
      })} */}
    </div>
  )
}

/**
 * why is necessary put a Key
 * When react runs the render flow
 * He needs to compare each component and this will indicates
 * an Id for each component
 */