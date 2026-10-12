const vendors = [
 {
   id: 'my-restaurant',
   name: 'Kenny Hills Bakers',
   location: 'IIUM Gombak Campus',
   openHours: '10:00 am - 10:00 pm',
   isOpen: true,
   menu: [
    { id: 'my-1', name: 'Tiramisu Cake', description: 'traditionally made with espresso-soaked ladyfingers and mascarpone cream', price: 19.5, category: 'Dessert',
      available: true },
    { id: 'my-2', name: 'Peach Struddle', description: 'a sweet, fruit-filled pastry featuring a contrast of crisp, buttery layers and a tender, juicy peach center', price: 16.9, category:
      'Dessert', available: true },
    { id: 'my-3', name: 'Watermelon Strawberry', description: 'popular dual-fruit flavor combination ', price: 10.5, category:
    'Drinks', available: false },
          ],
 },
     {
       id: 'kafe-aminah',
       name: 'Kafe Mahallah Aminah',
       location: 'Mahallah Aminah, Ground Floor',
        openHours: '8:00 am - 9:00 pm',
        isOpen: true,
    menu: [
        { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
        { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:
          3, category: 'Drinks', available: true },
 ],
 },
]
export default vendors