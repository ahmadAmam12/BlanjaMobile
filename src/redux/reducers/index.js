import {combineReducers} from 'redux'

import register from './register'
import auth from './auth'
import product from './product'
import detailProduct from './detailProduct'
import category from './category'
import profile from './profile'
import editUser from './editProfile'
import search from './search'
import address from './getAddress'
import addAddress from './makeAddress'
import addCart from './addToCart'

export default combineReducers({
    register,
    auth,
    product,
    detailProduct,
    category,
    profile,
    editUser,
    search,
    address,
    addAddress,
    addCart
})