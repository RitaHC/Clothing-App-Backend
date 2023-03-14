const mongoose = require('mongoose')
const db = require('../../config/db')

const Item = require('./item')



/////////////////////// Seed Data /////////////////////




// Seed Items
const seed = [
    {
        style: 'dresses',
        size: [ 'XS','S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'X4L', 'Customize'],      
        img: 'https://assets.burberry.com/is/image/Burberryltd/CB1B0CB8-21E7-4609-8E44-3FC32C29FE73?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
        img1: 'https://assets.burberry.com/is/image/Burberryltd/25989FDD-AF7E-4ABB-BC13-DD97A97971C5?$BBY_V2_SL_1x1$&wid=1534&hei=1534',
        img2: 'https://assets.burberry.com/is/image/Burberryltd/938E3D7C-23CF-4D56-8B51-729CF478FD91?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
        price: 50,
        title: 'Polo Dress',
        color: 'Brown'
    },
    {
        style: 'dresses',
        size: ['Fit all'],      
        img: 'https://assets.burberry.com/is/image/Burberryltd/8F7A9E7C-8929-454C-8D91-C4A868174962?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
        img1: 'https://assets.burberry.com/is/image/Burberryltd/E098E479-0626-4A1A-B7B5-348C92E3C955?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
        img2: 'https://assets.burberry.com/is/image/Burberryltd/48D1E577-3093-42E9-A608-5C623605DF7D?$BBY_V2_SL_1x1$&wid=1534&hei=1534',
        price: 70,
        title: 'Trench dress',
        color: 'beige'
    },
    {
      style: 'dresses',
      size: ['Fit all'],
      img: 'https://assets.burberry.com/is/image/Burberryltd/B1214CD5-AE9F-46CA-AC1B-3D16344B3ABA?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
      img1: 'https://assets.burberry.com/is/image/Burberryltd/C51A34B8-BBE6-4F6C-9553-F01053BC5D85?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
      img2: 'https://assets.burberry.com/is/image/Burberryltd/38BEEA51-34EC-441B-82BD-B4811B7B40FD?$BBY_V2_SL_1x1$&wid=1534&hei=1534',
      price: 100,
      title: 'Gold dress',
      color: 'golden'
    },
    {
      style: 'dresses',
      size: ['Fit all'],
      img: 'https://media.tedbaker.com/t_pdp_dt_xlg_3-5m,f_auto/Product/Womens/266260_LILAC_1',
      img1: 'https://media.tedbaker.com/t_pdp_dt_xlg_3-5m,f_auto/Product/Womens/266260_LILAC_2',
      img2: 'https://media.tedbaker.com/t_pdp_dt_xlg_3-5m,f_auto/Product/Womens/266260_LILAC_4',
      price: 50,
      title: 'pink midway',
      color: 'pink'
    },
    {
      style: 'dresses',
      size: ['Fit all'],
      img: 'https://assets.burberry.com/is/image/Burberryltd/3EDCB3B4-3574-4A23-8932-3CEE9982E512?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
      img1: 'https://assets.burberry.com/is/image/Burberryltd/54DDBF0F-652C-4B20-B7D0-2D8375602EB2?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
      img2: 'https://assets.burberry.com/is/image/Burberryltd/B03774BB-F458-423F-A8A4-CFDA3917E0F5?$BBY_V2_SL_1x1$&wid=1534&hei=1534',
      price: 30,
      title: 'silver party',
      color: 'silver'
    },
    
]
// {
//   style: '',
//   size: [],
//   img: '',
//   img1: '',
//   img2: '',
//   price: 0,
//   title: '',
//   color: ''
// },
  

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    Item.deleteMany().then(deletedItems => {
      console.log('the deleted items:', deletedItems);
      Item.create(seed).then(newItems => {
        console.log('the new items', newItems)
        mongoose.connection.close()
      }).catch(error => {
        console.log(error)
        mongoose.connection.close()
      })
    }).catch(error => {
      console.log(error)
      mongoose.connection.close()
    })
  }).catch(error => {
    console.log(error)
    mongoose.connection.close()
  })
