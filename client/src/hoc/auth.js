import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { auth } from '../_actions/userAction'


export default function (SpecificComponent, option, adminRoute = null) {

    //option
    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    const dispatch = useDispatch()

    function AuthenticationCheck(props) {
        useEffect(() => {

            dispatch(auth())
                .then(res => {
                    //로그인 하지 않은 상태
                    if (!res.payload.isAuth) {
                        if (option) {
                            props.history.push('/login')
                        }
                        //로그인한 상태
                    } else {
                        if (adminRoute && !res.payload.isAdmin) {
                            props.history.push('/')
                        } else {
                            if (option === false) {
                                props.history.push('/')
                            }
                        }
                    }
                })

        }, [])
        return (
            <SpecificComponent />
        )
    }

    return AuthenticationCheck
}