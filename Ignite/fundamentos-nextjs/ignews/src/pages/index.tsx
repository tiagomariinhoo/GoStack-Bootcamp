import { GetServerSideProps, GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

import styles from './home.module.scss'

/**
 * SERVER SIDE RENDERING
 * From Page to Component
 * 
 * Basically will render the data before render the page
 * This avoid that the page render without the data and when the data render, 
 * the page will shift the layout to show de data later
 * 
 * If you disable the Javascript in browser options, 
 * the data content will be intact
 * 
 * STATIC SIDE GENERATION
 * NextJS will save the generated html as a static file
 * that will have the result
 */

/**
 * 3 Ways to populate a page with contents
 * 
 * Client-Side
 * Server-Side
 * Static Site Generation
 * 
 * Blog Post
 * - Content (SSG)
 * - Comments (Client-Side)
 */

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {

  // Everything that I pass in getServerSideProps, I can get here using props
  // console.log('Props')


  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {

//   const price = await stripe.prices.retrieve('price_1JA41yDx1zYs1KotDteIC9rA')

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//     }).format(price.unit_amount / 100), //cents

//   }

//   return {
//     props: {
//       product
//     }
//   }
// }


// Use static page when the content is the same for everyone
export const getStaticProps: GetStaticProps = async () => {
  

  const price = await stripe.prices.retrieve('price_1JA41yDx1zYs1KotDteIC9rA')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100), //cents

  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
    // How much time in seconds I will keep this page without revalidate
  }
}
