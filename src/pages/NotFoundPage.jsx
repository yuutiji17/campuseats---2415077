import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="card">
      <h2>404: Page not found</h2>
      <p className="muted">There is no page at this address.</p>
      <Link to="/">Go to the vendor list</Link>
    </section>
  )
}

export default NotFoundPage
