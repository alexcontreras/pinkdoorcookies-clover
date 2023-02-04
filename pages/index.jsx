import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import Inventory from '../components/inventory/Inventory'
export default function Home() {
  console.log(process.env)
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const AUTH_TOKEN = process.env.NEXT_PUBLIC_CLOVER_AUTH_TOKEN

  const syncInventory = () => {
    setIsLoading(true)
    setIsSyncing(true)
    try {
      const endpoint = `https://api.clover.com/v3/merchants/${process.env.NEXT_PUBLIC_MERCHANT_ID}/categories/R4XEGFAM3BDVG/items?filter=available=true&limit=1000&expand=itemStock`

      fetch(endpoint, {
        headers: {
          'Authorization': `Bearer 8a84d42c-35eb-8686-e601-8f643c879931`
        },
        mode: 'no-cors'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          axios.post(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/inventory/sync`, data.elements).then((res) => {
            setIsLoading(false)
            setIsSyncing(false)
          })
        })
        .catch(error => {
          console.error(error);
        });
    } catch(error) {
      console.error(error)
      setIsLoading(false)
      setIsSyncing(false)
      return []
    }
  }

  return (
    <>
      <Head>
        <title>Pink Door Cookies Inventory - Clover API</title>
        <meta name="description" content="Manage clover inventory" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid">
        <div className="row">
          <div className="col">
            <h1>
              PDC Inventory
              <button className="btn btn-danger btn-sm ms-3" disabled={isLoading} onClick={syncInventory}>Sync Inventory</button>
              {isSyncing && (
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Inventory isSyncing={isSyncing} />
          </div>
        </div>
      </main>
    </>
  )
}
