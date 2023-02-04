import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import Inventory from '../components/inventory/Inventory'
export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const syncInventory = async () => {
    setIsLoading(true)
    setIsSyncing(true)
    try {
      const endpoint = `https://api.clover.com/v3/merchants/4FKKZT8Q4YAF1/categories/R4XEGFAM3BDVG/items?filter=available=true&limit=1000&expand=itemStock`

      const { data } = await axios.post('/api/cors-proxy', {
        url: endpoint,
        method: 'GET'
      })

      console.log('Data:', data)

      if (data) {
        axios.post('/api/inventory/sync', data.elements).then((res) => {
          setIsLoading(false)
          setIsSyncing(false)
          console.log(res)
        })
      }
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
