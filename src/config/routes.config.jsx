import {createBrowserRouter} from 'react-router-dom'
import { Orders } from '../pages/orders/Orders'
import { NewOrder } from '../pages/new-order/NewOrder'

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Orders></Orders>,
        errorElement:<h1>Error</h1>
    },
    {
        path:"/new-order",
        element: <NewOrder></NewOrder>,
        errorElement:<h1>Error</h1>
    }
])