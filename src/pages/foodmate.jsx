import style from '../styles/foodie.module.css'
import { useState, useEffect } from 'react';
import Header from './pageHeader';
import BestList from './bestList';
import FoodMateAPI from '../apis/foodMate.api';

export default function FoodMate() {
    const [foodMates, setFoodMates] = useState(null);
    const [orderBy, setOrderBy] = useState('createdAt');
    const [selectCategory, setSelectCategory] = useState(null);

    useEffect(() => {
        async function findAllFoodMates(orderBy) {
            try {
                const foodMates = await FoodMateAPI.findAllFoodMates({orderBy, selectCategory});
                if (!foodMates.message) {
                    setFoodMates(foodMates);
                } else {
                    alert(foodMates.message)
                }
            } catch (error) {
                console.log(error);
            }
        }

        findAllFoodMates();
    }, [orderBy])

    const handleOrderByChange = (e) => {
        setOrderBy(e.target.value)
    }
    
    return (
        <>
            <Header 
                category={'Category'} 
                setSelectCategory={setSelectCategory}
                orderBy={true} 
                OrderBy={orderBy}
                handleOrderByChange={handleOrderByChange}
                search={true} 
                create={true}
                region={true}
            />
            <BestList data={foodMates}/>
        </>
    )
}
