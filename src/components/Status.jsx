// Small components for the loading and error states of fetched data.
export function Loading() {
  return (
    <p className="muted" role="status">
      Loading vendors…
    </p>
  )
}
export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card error" role="alert">
      <p>Could not load vendors: {message}</p>
      <button type="button" className="btn" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}
