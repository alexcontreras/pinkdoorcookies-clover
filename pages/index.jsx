import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Inventory from '../components/inventory/Inventory'
export default function Home() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const AUTH_TOKEN = process.env.NEXT_PUBLIC_CLOVER_AUTH_TOKEN
  const instance = axios.create({
    baseURL: 'https://api.clover.com',
    headers: { 'Authorization': `Bearer ${AUTH_TOKEN}`}
  })

  const localApi = axios.create({
    baseURL: 'http://localhost:3000',
  })

  const syncInventory = () => {
    setIsLoading(true)
    setIsSyncing(true)
    instance.get('/v3/merchants/4FKKZT8Q4YAF1/categories/R4XEGFAM3BDVG/items?filter=available=true&limit=1000').then((res) => {
      localApi.post('/api/inventory/sync', res.data.elements).then((res) => {
        console.log(res.data)
        setIsLoading(false)
        setIsSyncing(false)
      })
		})
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
                <div class="spinner-grow" role="status">
                  <span class="visually-hidden">Loading...</span>
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