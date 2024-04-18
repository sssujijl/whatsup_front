import style from '../styles/foodie.module.css'
import { useEffect, useState } from 'react';
import Header from './pageHeader';
import BestList from './bestList';
import FoodieAPI from '../apis/foodie.api';

export default function Foodie() {
    const [foodies, setFoodies] = useState(null);
    const [orderBy, setOrderBy] = useState('latest');

    useEffect(() => {
        async function findAllFoodie() {
            try {
                const foodies = await FoodieAPI.findAllFoodie(orderBy);
                setFoodies(foodies);
            } catch (error) {
                console.log(error);
            }
        }

        findAllFoodie();
    }, [orderBy])

    const handleOrderByChange = (e) => {
        setOrderBy(e.target.value)
    }

    return (
        <>
            <Header 
                category={'Category'} 
                orderBy={true}
                OrderBy={orderBy}
                handleOrderByChange={handleOrderByChange}
                search={true} 
                create={true}
            />
            <BestList data={foodies}/>
        </>
    )
}
