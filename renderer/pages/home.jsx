import React from 'react'
// import PurchaseOrder from './PurchaseOrder'
// import CreateSalesOrder from './CreateSalesOrder'
import AddProduct from './AddProduct'
import Link from 'next/link'; // Use Next.js Link for routing




export default function HomePage() {
  

  return (
    <React.Fragment>
      <p className=" text-orange-300">orange to Dashboard</p>
      <Link href="/Dashboard">
                   <p className=" ">Go to Dashboard</p>
              </Link>

        {/* <PurchaseOrder/> */}
        {/* <Temp/> */}
        {/* <CreateSalesOrder/> */}
    </React.Fragment>
  )
}
