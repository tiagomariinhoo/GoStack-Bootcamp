import { memo, useState, lazy, Suspense } from 'react'
import { AddProductToWishListProps } from './AddProductToWishlist'
// import { AddProductToWishList } from './AddProductToWishlist';
// const dynamic from 'next/dynamic'
const AddProductToWishList = lazy(() =>
  import('./AddProductToWishlist').then((mod) => ({
    default: mod.AddProductToWishList
  }))
)


interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  }
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false)
  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={() => setIsAddingToWishList(true)}>
        Adicionar aos favoritos
      </button>
      <Suspense fallback={<span>Carregando...</span>}>
        {
          isAddingToWishList &&
          <AddProductToWishList
            onAddToWishList={() => onAddToWishList(product.id)}
            onRequestClose={() => setIsAddingToWishList(false)}
          />}
      </Suspense>
    </div>
  )
}

// Second parameter is just a function that will have conditions
// to update the component
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps); // Deep compare, is good to compare simple objects
})