// const findProducts = async (atributo,valor) => {
//                 if (!valor) throw Error("Error: Debe existir un valor = null..!");
//                 let products = null;
//                 switch (atributo) {
//                     case 'name':
//                         products = await Product.findAll({
//                             where:{
//                                 name:{
//                                     [Op.iLike]:`%${valor}%`,
//                                 }
//                             },
//                             include:arrayIncludes
//                         });
//                         break;
//                         case 'platform':
//                             products = await Product.findAll({
//                                 where:{
//                                     name:{
//                         [Op.iLike]:`%${valor}%`,
//                     }
//                 },
//                 include:arrayIncludes
//             });
//             break;
//         case 'genre':
//                 products = await Product.findAll({
//                     where:{
//                         name:{
//                             [Op.iLike]:`%${valor}%`,
//                         }
//                     },
//                     include:arrayIncludes
//                 });
//                 break;
//         default:
//             break;
//     }
//      if (products.length===0) throw Error(`Error: No se encontro ningun Producto con el nombre: ${name} !`);
//      return products;
//  };
// const findProducts = async (atributo,valor) => {
//     console.log(await getAllProducts());
// };