import { Children, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

//createContext(defaultValue)

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionInput {
    title: string;
    amount: number;
    type: string;
    category: string;
}

// Create an interface based on Transaction, omitting id and createdAt
// type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
// Same previous way but here, u select the fields that u want
// type TransactionInput = Pick<Transaction, 'id' | 'amount'...>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
)

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    const createTransaction = async (transactionInput: TransactionInput) => {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        })
        const { transaction } = response.data

        setTransactions([...transactions, transaction])
    }

    return (
        <TransactionContext.Provider value={{ transactions, createTransaction }} >
            {children}
        </TransactionContext.Provider >
    )

}

export const useTransactions = () => {
    const context = useContext(TransactionContext)

    return context
}