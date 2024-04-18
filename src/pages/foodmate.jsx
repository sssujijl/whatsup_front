import style from '../styles/foodie.module.css'
import { useState, useEffect } from 'react';
import Header from './pageHeader';
import BestList from './bestList';
import FoodMateAPI from '../apis/foodMate.api';

export default function FoodMate() {
    const [foodMates, setFoodMates] = useState(null);

    useEffect(() => {
        async function findAllFoodMates() {
            try {
                const foodMates = await FoodMateAPI.findAllFoodMates();
                setFoodMates(foodMates);
            } catch (error) {
                console.log(error);
            }
        }

        findAllFoodMates();
    }, [])
    
    return (
        <>
            <Header category={'Category'} orderBy={true} search={true}/>
            <BestList data={foodMates}/>
        </>
    )
}
