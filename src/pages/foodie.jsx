import style from '../styles/foodie.module.css'
import { useEffect, useState } from 'react';
import Header from './pageHeader';
import BestList from './bestList';
import FoodieAPI from '../apis/foodie.api';

export default function Foodie() {
    const [foodies, setFoodies] = useState(null);

    useEffect(() => {
        async function findAllFoodie() {
            try {
                const foodies = await FoodieAPI.findAllFoodie();
                setFoodies(foodies);
            } catch (error) {
                console.log(error);
            }
        }

        findAllFoodie();
    }, [])
    
    return (
        <>
            <Header category={'Category'} orderBy={true} search={true}/>
            <BestList data={foodies}/>
        </>
    )
}
