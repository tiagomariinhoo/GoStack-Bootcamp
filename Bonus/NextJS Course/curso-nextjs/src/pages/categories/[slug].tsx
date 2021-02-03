import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

interface IProduct {
    id: string;
    title: string;
}

interface CategoryProps {
    products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
    const router = useRouter()

    if (router.isFallback) {
        return <p>Carregando...</p>
    }

    return <div>
        <h1>{router.query.slug}</h1>

        <ul>
          {products.map(product => {
            return (
              <li key={product.id}>
                {product.title}
              </li>
            )
          })}
        </ul>

    </div>
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch(`http://localhost:3333/categories`)
    const categories = await response.json()

    const paths = categories.map(category => {
        return {
            params: { slug: category.id }
        }
    })
    return {
        paths,
        fallback: true, //Se usar como true, sempre que o usuário tentar acessar uma rota que nao existe, ele tenta gerar
    }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
    const { slug } = context.params //Pegar o slug da categoria

    const response = await fetch(`http://localhost:3333/products?category_id=${slug}`)
    const products = await response.json()

    return {
        props: {
            products,
        },
        revalidate: 60, //A cada 5 segundos a pagina vai ser revalidada, ou seja, será gerada uma nova versão dessa página
    }
}