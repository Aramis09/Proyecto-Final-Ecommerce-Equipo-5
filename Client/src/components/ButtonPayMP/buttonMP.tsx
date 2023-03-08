import { useEffect, useContext, useState } from 'react'
import axios from 'axios'
// In this example i'm using React
// Other way to use this is using the script tag in the html file
// and then use the global variable window.MercadoPago

// Then some document.querySelector('.cho-container') to get the element
// and then use the mp.checkout() method

export default function MPButton() {
 const [count,setCount] = useState(1);
  const item = {
    tittle:'titulo que se tiene que mandar',
    currency_id:'USD',
    picture_url:'https://scontent.fsde1-1.fna.fbcdn.net/v/t1.6435-9/51251634_1091926097654910_1994993840632627200_n.jpg?stp=dst-jpg_p180x540&_nc_cat=101&ccb=1-7&_nc_sid=730e14&_nc_ohc=yRS82-vF9hYAX_TX5hU&_nc_ht=scontent.fsde1-1.fna&oh=00_AfAT626vpUc_ja5iZ96JPG9I66S946LDY_j5YhBxYakACw&oe=64304AD2',
    description:'ahmm me comi un sapito',
    category_id:'art',
    quantity: 1, //esto en el caso de que se compre uno solo, pero el dato viene po body si son mas.
    unit_price:1900
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  useEffect(() => {//http://localhost:3001/paymant
    // The async function is needed since we can't do async stuff in the top level of our useEffect
    const fetchCheckout = async () => {
      const res = await axios.post('http://localhost:3001/paymant', item);
      const data = await res.data;
      console.log(data)
      // data.global is the ID that MP returns from the API, it comes from our backend route
      if(data.global) {
        const script = document.createElement('script') // Here we create the empty script tag
        script.type = 'text/javascript' // The type of the script
        script.src = 'https://sdk.mercadopago.com/js/v2' // The link where the script is hosted
        script.setAttribute('data-preference-id', data.global) // Here we set its data-preference-id to the ID that the Mercado Pago API gives us
        document.body.appendChild(script) // Here we append it to the body of our page

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        
        // Here we create the button, setting the container, our public key and the ID of the preference that Mercado Pago API returns in its response
        const mp = new window.MercadoPago('TEST-75923ebd-9e40-42c2-8ab3-cf9799279917', {
          locale: 'es-AR'
        })
        // console.log(process.env.REACT_APP_MP_PUBLIC_KEY)
        // The ".checkout" is the function that creates the connection between the button and the platform
        mp.checkout({
          preference: {
            id: data.global
          },
          render: {
            container: '.cho-container',
            label: 'Pagar',
          }
        });
      };
    };

    // Here we just execute the function
    fetchCheckout()
    //eslint-disable-next-line
  }, [count])

  return (
    <div>
      <p className="cho-container" ></p>
    </div>
  )
}
