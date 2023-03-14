
// Usuario.findByPk(1).then(usuario => {
//     Producto.findByPk(2).then(producto => {
//       usuario.addProducto(producto, {
//         through: {
//           cantidad: 1
//         },
//         // especificar la tabla intermedia a utilizar
//         joinTableName: 'Carrito'
//       }).then(() => {
//         console.log('Producto agregado al carrito');
//       }).catch(error => {
//         console.log(error);
//       });
//     });
//   }).catch(error => {
//     console.log(error);
//   });
  

// User.findAll({
//     include: [{
//       model: Product,
//       through: { model: ShoppingCart }
//     }]
//   })