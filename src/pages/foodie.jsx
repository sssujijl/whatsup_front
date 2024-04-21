import style from '../styles/foodie.module.css'
import { useEffect, useState } from 'react';
import Header from './pageHeader';
import BestList from './bestList';
import FoodieAPI from '../apis/foodie.api';

export default function Foodie() {
    const [foodies, setFoodies] = useState(null);
    const [orderBy, setOrderBy] = useState('latest');
    const [selectCategory, setSelectCategory] = useState(null);

    useEffect(() => {
        async function findAllFoodie() {
            try {
                const foodies = await FoodieAPI.findAllFoodie({orderBy, selectCategory});
                if (!foodies.message) {
                    setFoodies(foodies);
                } else {
                    alert(foodies.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        findAllFoodie();
    }, [orderBy, selectCategory])

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
            />
            <BestList data={foodies}/>
        </>
    )
}
