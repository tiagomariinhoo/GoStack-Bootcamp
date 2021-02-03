// import { useEffect, useState } from 'react'
import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import { Title } from '../styles/pages/Home'
import math from '../lib/math'
import SEO from '@/components/SEO'

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[]
}

export default function Home({ recommendedProducts }: HomeProps) {

  // const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([])
  // 1 - PRIMEIRO METODO PARA DATA FETCHING
  // useEffect(() => {
  //   // Isso é feito do lado do cliente com o JS, pelo browser, nunca pelo server node do next
  //   fetch('http://localhost:3333/recommended').then(response => {
  //     response.json().then(data => {
  //       setRecommendedProducts(data)
  //     })
  //   })
  // }, [])

  /**
   * Import dinâmico para evitar importar libs pesadas sem necessidade
   */
  async function handleSum() {
    const math = (await import('../lib/math')).default
    alert(math.sum(3, 5))
  }

  return (
    <div>
      <SEO
        title="DevCommerce, very good"
        shouldExcludeTitleSuffix
        shouldIndexPage
      />

      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

/**
 * Quando a página renderiza, já renderiza com todos os elementos e dados. Ao invés de renderizar uma coisa de cada vez
 * Acaba que o TTFB (Time to first byte) é de 2s, ou seja, o tempo para o primeiro byte chegar ao cliente
 * 2 - SEGUNDO METODO PARA DATA FETCHING
 */
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`)
  const recommendedProducts = await response.json()

  return {
    props: {
      recommendedProducts
    }
  }
}