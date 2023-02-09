import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { bool } from 'prop-types'
import InventoryTable from './InventoryTable'

function Inventory({ isSyncing }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get('/api/inventory').then((data) => {
      setItems(data.data)
    })
  }, [isSyncing])

  return (
    <div className={isSyncing ? 'opacity-50' : ''}>
      {items.length > 0 && <InventoryTable items={items} />}
    </div>
  )
}

Inventory.propTypes = {
  isSyncing: bool.isRequired,
}

export default Inventory
