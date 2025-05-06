import App from "../App"
import Home from "../pages/Home"
import Shop from "../pages/Shop"
import ProductDetail from "../components/productDetails/ProductDetail"
export const routes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {index:true, element: <Home/> },
            {path:"shop", element: <Shop/>},
            {path:"shop/:id", element: <ProductDetail/>}
        ]
    },
]