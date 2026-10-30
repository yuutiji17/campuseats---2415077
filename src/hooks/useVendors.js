import { useEffect, useState } from 'react'
import { validateVendors } from '../utils/validateVendors.js'

// Fetches the vendor list and tracks its loading and error states.
export function useVendors() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchVendors() {
      try {
        const res = await fetch('/api/vendors.json', {
          signal: controller.signal,
        })
        if (!res.ok) {
          throw new Error(`Server returned HTTP ${res.status}.`)
        }

        const data = await res.json()
        // Ignore results if this effect has already been cleaned up.
        if (controller.signal.aborted) return

        validateVendors(data)
        setVendors(data)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Could not load vendors. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchVendors()
    return () => controller.abort()
  }, [reloadKey])

  // Changing reloadKey makes the effect above run again.
  function reload() {
    setLoading(true)
    setError(null)
    setReloadKey((previousKey) => previousKey + 1)
  }

  return { vendors, loading, error, reload }
}
