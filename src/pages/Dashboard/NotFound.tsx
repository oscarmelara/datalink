import React from 'react'
import search from '../../assets/images/search.png'
import { NavBar } from '../../components'

export const NotFound: React.FC = () => {
    
    return (<>
    <NavBar />
    <section className="d-flex align-items-center py-5">
        <div className="container d-flex flex-wrap justify-content-center align-items-center flex-column">
            <img className=" w-75 mx-auto block" src={search} alt=""/>
            <h1 className="text-white font-weight-bold text-center">Opportunities Module not found</h1>
            <p className="text-white font-weight-normal text-center">Dashboard require infusionSoft's opportunities module in order to display</p>
        </div>
    </section>

    </>)
}