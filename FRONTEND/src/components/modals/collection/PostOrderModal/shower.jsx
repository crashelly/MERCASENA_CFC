import {Loader} from "@components/Loaders/shop/shopLoader";
import { useSelector,useDispatch } from "react-redux";
import {resetShoppingCart} from "@slices/Auth/UserSlice";
export const shower = () => {
    const dispatch = useDispatch();
    let time = 4000;
    let targetModal = document.getElementById('postOrderNotification')
    let shoppingCartModal = document.getElementById('modal_carrito')
    targetModal.showModal()
    
    setTimeout(() => {
        targetModal.close()
        
        dispatch(resetShoppingCart())
        // Loader.show()
    },time)
}
// export default  shower