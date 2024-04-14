import style from '../styles/foodie.module.css'
import { useState } from 'react';
import Header from './pageHeader';
import BestList from './bestList';

export default function Foodie() {
    
    return (
        <>
            <Header category={'Category'} orderBy={true}/>
            <BestList/>
            <BestList/>
        </>
    )
}