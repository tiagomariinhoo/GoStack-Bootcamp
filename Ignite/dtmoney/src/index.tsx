import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs'

createServer({
  // internal database from miragejs
  models: {
    transaction: Model
  },


  // load initial datas
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Transaction 2',
          amount: 400,
          type: 'withdraw',
          category: 'House',
          createdAt: new Date('2021-02-14 09:00:00')
        },
      ]
    })
  },

  routes() { // Which routes that we will have in our fake api
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction')
      // return [
      //   {
      //     id: 1,
      //     title: 'Transaction 1',
      //     amount: 400,
      //     type: 'deposit',
      //     category: 'Food',
      //     createdAt: new Date()
      //   }
      // ]
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)


      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
