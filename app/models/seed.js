const mongoose = require('mongoose')
const db = require('../../config/db')

const Item = require('./item')



/////////////////////// Seed Data /////////////////////




// Seed Items
const seed = [
    {
        style: 'Dresses',
        size: [ 'XS','S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'X4L', 'Customize'],      
        img: 'https://assets.burberry.com/is/image/Burberryltd/CB1B0CB8-21E7-4609-8E44-3FC32C29FE73?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
        img1: 'https://assets.burberry.com/is/image/Burberryltd/25989FDD-AF7E-4ABB-BC13-DD97A97971C5?$BBY_V2_SL_1x1$&wid=1534&hei=1534',
        img2: 'https://assets.burberry.com/is/image/Burberryltd/938E3D7C-23CF-4D56-8B51-729CF478FD91?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
        price: 50,
        title: 'Polo Dress',
        color: 'Brown'
    },
    {
        style: 'Dresses',
        size: ['Fit all'],      
        img: 'https://assets.burberry.com/is/image/Burberryltd/8F7A9E7C-8929-454C-8D91-C4A868174962?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
        img1: 'https://assets.burberry.com/is/image/Burberryltd/E098E479-0626-4A1A-B7B5-348C92E3C955?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
        img2: 'https://assets.burberry.com/is/image/Burberryltd/48D1E577-3093-42E9-A608-5C623605DF7D?$BBY_V2_SL_1x1$&wid=1534&hei=1534',
        price: 70,
        title: 'Trench dress',
        color: 'beige'
    },
    {
      style: 'Dresses',
      size: ['Fit all'],
      img: 'https://assets.burberry.com/is/image/Burberryltd/B1214CD5-AE9F-46CA-AC1B-3D16344B3ABA?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
      img1: 'https://assets.burberry.com/is/image/Burberryltd/C51A34B8-BBE6-4F6C-9553-F01053BC5D85?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
      img2: 'https://assets.burberry.com/is/image/Burberryltd/38BEEA51-34EC-441B-82BD-B4811B7B40FD?$BBY_V2_SL_1x1$&wid=1534&hei=1534',
      price: 100,
      title: 'Gold dress',
      color: 'gold'
    },
    {
      style: 'Dresses',
      size: ['Fit all'],
      img: 'https://www.rosedress.com/cdn/shop/files/celebrity-bow-tie-neck-rosette-sleeveless-a-line-crepe-party-mini-dress-Hot-Pink-1_700x.jpg?v=1725262603',
      img1: 'https://www.rosedress.com/cdn/shop/files/celebrity-bow-tie-neck-rosette-sleeveless-a-line-crepe-party-mini-dress-Hot-Pink-3_700x.jpg?v=1725262603',
      img2: 'https://www.rosedress.com/cdn/shop/files/celebrity-bow-tie-neck-rosette-sleeveless-a-line-crepe-party-mini-dress-Hot-Pink-6_700x.jpg?v=1725262603',
      price: 50,
      title: 'pink midway',
      color: 'pink'
    },
    {
      style: 'Dresses',
      size: ['Fit all'],
      img: 'https://cdn.shopify.com/s/files/1/0525/3444/4186/products/DVFDS1R003WFLIG_A6_1400x.jpg?v=1677182052',
      img1: 'https://cdn.shopify.com/s/files/1/0525/3444/4186/products/DVFDS1R003WFLIG_A2_1400x.jpg?v=1677182052',
      img2: 'https://cdn.shopify.com/s/files/1/0525/3444/4186/products/DVFDS1R003WFLIG_A3_1400x.jpg?v=1677182052',
      price: 70,
      title: 'floral day dress',
      color: 'green'
    },
    {
      style: 'Dresses',
      size: ['Fit all'],
      img: 'https://assets.burberry.com/is/image/Burberryltd/3EDCB3B4-3574-4A23-8932-3CEE9982E512?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
      img1: 'https://assets.burberry.com/is/image/Burberryltd/54DDBF0F-652C-4B20-B7D0-2D8375602EB2?$BBY_V2_ML_1x1$&wid=1534&hei=1534',
      img2: 'https://assets.burberry.com/is/image/Burberryltd/B03774BB-F458-423F-A8A4-CFDA3917E0F5?$BBY_V2_SL_1x1$&wid=1534&hei=1534',
      price: 30,
      title: 'silver party',
      color: 'silver'
    },
    {
      style: 'Bags',
      size: ['One Size'],
      img: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tilsitt--M46548_PM2_Front%20view.png?wid=824&hei=824',
      img1: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tilsitt-monogram-handbags--M46548_PM1_Worn%20view.png?wid=2048&hei=2048',
      img2: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-tilsitt-monogram-handbags--M46548_PM1_Side%20view.png?wid=2048&hei=2048',
      price: 264,
      title: 'Louis Vuitton Bag',
      color: 'brown'
    },
    {
      style: 'Bags',
      size: ['One Size'],
      img: 'https://media2.bulgari.com/f_auto,q_auto,c_pad,h_520,w_520/production/dwf579b8bc/images/images/1408477.png',
      img1: 'https://media2.bulgari.com/f_auto,q_auto,c_thumb,h_160,w_160/production/dwcb332388/images/images/1311685.png',
      img2: 'https://media2.bulgari.com/f_auto,q_auto,c_thumb,h_160,w_160/production/dw290c37a1/images/images/1407632.png',
      price: 250,
      title: 'Chained Serpanti',
      color: 'lilac'
    },
    {
      style: 'Bags',
      size: ['One Size'],
      img: 'https://cdn.shopify.com/s/files/1/0384/0161/products/197178-1_20Louis_20Vuitton_20OnTheGo_20Tote_20Limited_20Edition_20Escale_20Monogram_20Giant_20GM_2D_0002_400x400.jpg?v=1676049459',
      img1: 'https://cdn.shopify.com/s/files/1/0384/0161/products/197178-1_20Louis_20Vuitton_20OnTheGo_20Tote_20Limited_20Edition_20Escale_20Monogram_20Giant_20GM_2D_0003_480x480.jpg?v=1676049459',
      img2: 'https://cdn.shopify.com/s/files/1/0384/0161/products/197178-1_20Louis_20Vuitton_20OnTheGo_20Tote_20Limited_20Edition_20Escale_20Monogram_20Giant_20GM_2D_0006_480x480.jpg?v=1676049459',
      price: 250,
      title: 'Chained Serpanti',
      color: 'lilac'
    },
    {
      style: 'Bags',
      size: ['One Size'],
      img: 'https://media2.bulgari.com/f_auto,q_auto,c_pad,h_520,w_520/production/dw3c23e163/images/images/1361597.png',
      img1: 'https://media2.bulgari.com/f_auto,q_auto,c_thumb,h_160,w_160/production/dwdb7c8b65/images/images/1361337.png',
      img2: 'https://media2.bulgari.com/f_auto,q_auto,c_thumb,h_160,w_160/production/dwa778fca0/images/images/1426690.png',
      price: 200,
      title: 'Serpanti Bag',
      color: 'green'
    },
    {
      style: 'Bags',
      size: ['One Size'],
      img: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-onthego-mm--M46286_PM2_Front%20view.png?wid=824&hei=824',
      img1: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-onthego-mm-monogram-empreinte-leather-handbags--M46286_PM1_Side%20view.png?wid=2048&hei=2048',
      img2: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-onthego-mm-monogram-empreinte-leather-handbags--M46286_PM1_Interior2%20view.png?wid=2048&hei=2048',
      price: 376,
      title: 'Louis Vuitton Peachy',
      color: 'peach'
    },
    {
      style: 'Bags',
      size: ['One Size'],
      img: 'https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw0cdb09fb/original/90_1003016-1A02259_1X00V_20_La~Medusa~Patent~Mini~Bag-Bags-Versace-online-store_1_1.jpg?sw=850&q=85&strip=true',
      img1: 'https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw43f4df88/original/90_1003016-1A02259_1X00V_22_La~Medusa~Patent~Mini~Bag-Bags-Versace-online-store_0_1.jpg?sw=850&q=85&strip=true',
      img2: 'https://www.versace.com/dw/image/v2/BGWN_PRD/on/demandware.static/-/Sites-ver-master-catalog/default/dw1510c94a/original/90_1003016-1A02259_1X00V_24_La~Medusa~Patent~Mini~Bag-Bags-Versace-online-store_1_1.jpg?sw=850&q=85&strip=true',
      price: 100,
      title: 'Versace Gold',
      color: 'black '
    },
    {
      style: 'Jacket',
      size: [],
      img: 'https://mooyius.com/cdn/shop/files/43.jpg?v=1733823737&width=1200',
      img1: 'https://mooyius.com/cdn/shop/files/44.jpg?v=1733823737&width=1200',
      img2: 'https://mooyius.com/cdn/shop/files/45.jpg?v=1733823737&width=1200',
      price: 50,
      title: 'Leather Lover',
      color: 'purple and black'
    },
    {
      style: 'Accessory',
      size: [],
      img: 'https://www.kay.com/productimages/processed/V-350986701_0_800.jpg?pristine=true',
      img1: 'https://www.kay.com/productimages/processed/V-350986701_1_800.jpg?pristine=true',
      img2: 'https://www.kay.com/productimages/processed/V-350986701_2_800.jpg?pristine=true',
      price: 500,
      title: 'Sapphire Pearl Necklace',
      color: 'blue'
    },
    {
      style: 'Accessory',
      size: [],
      img: 'https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_620/cuff-transparent-gold-resine-metal-resine-metal-packshot-artistique-vue1-aba587b10754nn586-9521339072542.jpg',
      img1: 'https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_620/cuff-transparent-gold-resine-metal-resine-metal-packshot-artistique-vue2-aba587b10754nn586-9521364959262.jpg',
      img2: 'https://www.chanel.com/images//t_one///q_auto:good,f_auto,fl_lossy,dpr_1.2/w_620/cuff-transparent-gold-resine-metal-resine-metal-packshot-artistique-vue1-aba587b10754nn586-9521339072542.jpg',
      price: 200,
      title: 'Chanel Cuff',
      color: 'golden'
    },
    {
      style: 'Accessory',
      size: [],
      img: 'https://sothebys-md.brightspotcdn.com/dims4/default/ba04438/2147483647/strip/true/crop/3543x3543+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F02%2F47%2F779a47a0450ca802f573d154d2e7%2Fchanel-black-acrylic-and-imitation-pearl-gold-metal-cc-cuff-bracelet-2017-5a81.jpg',
      img1: 'https://sothebys-md.brightspotcdn.com/dims4/default/839ca52/2147483647/strip/true/crop/3543x3543+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F40%2Fda%2F5b40318b460f81d564e65d83f330%2Fmrkt-cltr3-t3-03.jpg',
      img2: 'https://sothebys-md.brightspotcdn.com/dims4/default/d107c75/2147483647/strip/true/crop/3543x3543+0+0/resize/800x800!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2Fee%2F3b%2Fd532c12e4ab0a6e0e3376d39eaeb%2Fmrkt-cltr3-t3-02.jpg',
      price: 100,
      title: 'Chanel Cuff',
      color: 'black'
    },
    {
      style: 'Accessory',
      size: [],
      img: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-empreinte-bangle-pink-gold-and-pave-diamonds-categories--Q95793_PM2_Front%20view.png?wid=2048&hei=2048',
      img1: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-empreinte-bangle-pink-gold-and-pave-diamonds-categories--Q95793_PM1_Worn%20view.png?wid=2048&hei=2048',
      img2: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-empreinte-bangle-pink-gold-and-pave-diamonds-categories--Q95793_PM1_Ambiance%20view.png?wid=2048&hei=2048',
      price: 100,
      title: 'Louis Vuitton bracelet',
      color: 'gold'
    }
]
  

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


