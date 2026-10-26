import { useState } from 'react'

const MAHALLAHS = [
  'Ali',
  'Aminah',
  'Faruq',
  'Asiah',
  'Bilal',
  'Hafsa',
  'Uthman',
  'Zubair',
]

// A plain function: values in, errors object out. Empty object = valid.
function validate(values) {
  const errors = {}
  if (values.name.trim().length < 3) {
    errors.name = 'Enter your name (at least 3 characters).'
  }
  if (!MAHALLAHS.includes(values.mahallah)) {
    errors.mahallah = 'Choose your mahallah.'
  }
  // HH:mm strings sort in time order when they have the correct format.
  if (
    !/^\d{2}:\d{2}$/.test(values.pickupTime) ||
    values.pickupTime < '07:00' ||
    values.pickupTime > '22:00' ||
    Number(values.pickupTime.slice(3)) > 59
  ) {
    errors.pickupTime = 'Choose a pickup time between 07:00 and 22:00.'
  }
  return errors
}

function CheckoutForm({ onPlaceOrder }) {
  const [values, setValues] = useState({
    name: '',
    mahallah: '',
    pickupTime: '',
  })
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length === 0) {
      onPlaceOrder({ ...values, name: values.name.trim() })
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Checkout</h3>
      <label htmlFor="checkout-name">Name</label>
      <input
        id="checkout-name"
        name="name"
        type="text"
        autoComplete="name"
        value={values.name}
        onChange={handleChange}
        required
        minLength={3}
        aria-invalid={Boolean(errors.name)}
        aria-describedby={errors.name ? 'name-error' : undefined}
      />
      {errors.name && (
        <p id="name-error" className="field-error" role="alert">
          {errors.name}
        </p>
      )}

      <label htmlFor="checkout-mahallah">Mahallah</label>
      <select
        id="checkout-mahallah"
        name="mahallah"
        value={values.mahallah}
        onChange={handleChange}
        required
        aria-invalid={Boolean(errors.mahallah)}
        aria-describedby={errors.mahallah ? 'mahallah-error' : undefined}
      >
        <option value="">Select…</option>
        {MAHALLAHS.map((mahallah) => (
          <option key={mahallah} value={mahallah}>
            {mahallah}
          </option>
        ))}
      </select>
      {errors.mahallah && (
        <p id="mahallah-error" className="field-error" role="alert">
          {errors.mahallah}
        </p>
      )}

      <label htmlFor="checkout-pickup">Pickup time (07:00–22:00)</label>
      <input
        id="checkout-pickup"
        name="pickupTime"
        type="time"
        min="07:00"
        max="22:00"
        value={values.pickupTime}
        onChange={handleChange}
        required
        aria-invalid={Boolean(errors.pickupTime)}
        aria-describedby={errors.pickupTime ? 'pickup-error' : undefined}
      />
      {errors.pickupTime && (
        <p id="pickup-error" className="field-error" role="alert">
          {errors.pickupTime}
        </p>
      )}

      <p className="muted">Demo order only; no payment is collected.</p>
      <button type="submit" className="btn">
        Place order
      </button>
    </form>
  )
}

export default CheckoutForm
