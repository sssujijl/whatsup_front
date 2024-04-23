import CreatePost from './createPost'
import { useEffect, useState } from 'react';
import FoodieAPI from '../../apis/foodie.api';
import { Cookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export default function CreateFoodie () {
    const [title, setTitle] = useState("");
    const [foodCategoryId, setCategory] = useState("");
    const [level, setLevel] = useState("");
    const [content, setContent] = useState("");
    const cookies = new Cookies();
    let navigate = useNavigate();

    const handleCreateFoodie = async () => {
        try {
            const accessToken = cookies.get("accessToken");
            const data = {
                title,
                foodCategoryId,
                level,
                content
            }
            const foodie = await FoodieAPI.createFoodie(data, accessToken);
            if (!foodie.message) {
                navigate('/foodie');
            } else {
                alert(foodie.message)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <CreatePost 
                foodie={true}
                title={title}
                setTitle={setTitle}
                setCategory={setCategory}
                setLevel={setLevel}
                content={content}
                setContent={setContent}
                handleCreate={handleCreateFoodie}
            />
        </>
    )
}