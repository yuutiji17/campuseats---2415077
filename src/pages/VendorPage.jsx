import { Link, useNavigate, useParams } from 'react-router'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'
import { useVendors } from '../hooks/useVendors.js'

function VendorPage() {
  // /vendor/2415077-kenny-hills gives { id: '2415077-kenny-hills' }.
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const navigate = useNavigate()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((entry) => entry.id === id)
  if (!vendor) {
    return (
      <section className="card">
        <h2>Vendor not found</h2>
        <p className="muted">No vendor has the ID “{id}”.</p>
        <Link to="/">Back to all vendors</Link>
      </section>
    )
  }

  return (
    <section>
      <button
        type="button"
        className="btn btn-small"
        onClick={() => navigate('/')}
      >
        ← All vendors
      </button>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <p className="muted">
        {vendor.location} · Open: {vendor.openHours}
      </p>
      <span className={vendor.isOpen ? 'status open' : 'status closed'}>
        {vendor.isOpen ? 'Open now' : 'Closed'}
      </span>
      <MenuList items={vendor.menu} isVendorOpen={vendor.isOpen} />
    </section>
  )
}

export default VendorPage
