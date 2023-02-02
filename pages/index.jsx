import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Inventory from '../components/inventory/Inventory'
export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const AUTH_TOKEN = process.env.CLOVER_AUTH_TOKEN
  const instance = axios.create({
    baseURL: process.env.CLOVER_URL,
    headers: { 
      'Authorization': `Bearer ${AUTH_TOKEN}`,
      'Access-Control-Allow-Origin': '*'
    }
  })

  const localApi = axios.create({
    baseURL: process.env.LOCAL_URL,
  })

  const syncInventory = async () => {
    console.log(AUTH_TOKEN)
    setIsLoading(true)
    setIsSyncing(true)
    try {
      const endpoint = `/v3/merchants/${process.env.MERCHANT_ID}/categories/R4XEGFAM3BDVG/items?filter=available=true&limit=1000&expand=itemStock`
      const response = await instance.get(endpoint)
      localApi.post('/api/inventory/sync', response.data.elements).then((res) => {
        console.log(res.data)
        setIsLoading(false)
        setIsSyncing(false)
      })
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
        <title>Pink Door Cookies - Clover API</title>
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
