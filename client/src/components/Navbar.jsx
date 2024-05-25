import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { IsLogin, IsSeller } from '../actions/userActions'
import { toast } from 'react-toastify'
import axios from 'axios'


export const Navbar = () => {


    const [toggle, setToggle] = useState(false);
    
    const { isLogin, isSeller } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

   
    

  const logOut = () => {
    localStorage.removeItem('accesstoken');
    navigate('/');
    dispatch(IsLogin());
    dispatch(IsSeller());
  checkSellerStatus()
    setToggle(!toggle)
    toast.success("LogOut Successful !")
}



    return (
        <>


            <nav>
                <div className='bg-gray-800 py-3 px-8 fixed min-w-full'>

                    <ul className='flex justify-between'>
                        <div>
                            <Link className='text-gray-300 text-lg font-bold' to="/">Test</Link>
                        </div>

                        <button onClick={()=>setToggle(!toggle)} className='md:hidden flex text-gray-300 text-lg font-bold'>

                            {
                                toggle? 
                                <RxCross2 size={25} /> :
                                <FaBars size={25} /> 
                            }

                        </button>

                        <div className=' gap-8 md:flex hidden'>
                            <Link className='text-gray-300 text-lg font-bold' to="/" >Home</Link>
                            <Link className='text-gray-300 text-lg font-bold' to="/properties" >Properties</Link>
                       {isSeller && <Link className='text-gray-300 text-lg font-bold' to="/seller" >Seller</Link>}
                            {
                                isLogin?
                                <button onClick={logOut} className='text-gray-300 text-lg font-bold' >Logout</button>
                                :
                                <Link className='text-gray-300 text-lg font-bold' to="/login" >Login</Link>

                            }
                        </div>
                    </ul>


                    {
                        toggle?
                        <div className=' gap-2  flex md:hidden pt-4 flex-col pb-3'>
                            <Link className='text-gray-300 text-lg font-bold' to="/" >Home</Link>
                            <Link className='text-gray-300 text-lg font-bold' to="/properties" >Properties</Link>
                          {isSeller && <Link className='text-gray-300 text-lg font-bold' to="/seller" >Seller</Link>}
                            {
                                !isLogin?
                                <Link onClick={logOut} className='text-gray-300 text-lg font-bold' >Logout</Link>
                                :
                                <Link className='text-gray-300 text-lg font-bold' to="/login" >Login</Link>

                            }
                        </div> : null

                    }

                </div>
            </nav>


        </>
    )
}