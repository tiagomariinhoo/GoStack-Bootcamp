import { signIn, useSession } from 'next-auth/client'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string;
}

/**
 * 3 places to use .ENV with a good security
 * 
 * getServerSideProps (SSR)
 * getStaticProps (SSG)
 * API routes
 */

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
    const [session] = useSession()

    const handleSubscribe = async () => {
        // Just redirect the user for auth page
        if (!session) {
            signIn('github')
            return
        }
        // checkout section using stripe
        try {
            // File name is always de route name: subscribe.ts -> subscribe
            const response = await api.post('/subscribe')
            const { sessionId } = response.data

            const stripe = await getStripeJs()
            
            await stripe.redirectToCheckout({ sessionId })
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <button type="button" onClick={handleSubscribe} className={styles.subscribeButton}>
            Subscribe now
        </button>
    )
}