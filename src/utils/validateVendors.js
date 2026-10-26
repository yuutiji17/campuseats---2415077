// Check fetched data once, before components try to display it.
export function validateVendors(data) {
  if (!Array.isArray(data)) {
    throw new Error('Vendor data must be an array.')
  }

  const ids = new Set()
  function checkId(id) {
    if (typeof id !== 'string' || !id.trim() || ids.has(id)) {
      throw new Error(
        'Every vendor and menu item needs a unique, non-empty ID.',
      )
    }
    ids.add(id)
  }

  function hasText(value) {
    return typeof value === 'string' && value.trim().length > 0
  }

  for (const vendor of data) {
    if (
      !vendor ||
      !['name', 'location', 'openHours'].every((key) => hasText(vendor[key])) ||
      typeof vendor.isOpen !== 'boolean' ||
      !Array.isArray(vendor.menu)
    ) {
      throw new Error(
        'Each vendor needs a name, location, openHours, isOpen, and menu array.',
      )
    }
    checkId(vendor.id)

    for (const item of vendor.menu) {
      if (
        !item ||
        !hasText(item.name) ||
        !hasText(item.category) ||
        (item.description !== undefined &&
          typeof item.description !== 'string') ||
        !Number.isFinite(item.price) ||
        item.price < 0 ||
        typeof item.available !== 'boolean' ||
        (item.popular !== undefined && typeof item.popular !== 'boolean')
      ) {
        throw new Error(
          `Invalid menu item in ${vendor.name}: check its name, category, price, and availability.`,
        )
      }
      checkId(item.id)
    }
  }
}
