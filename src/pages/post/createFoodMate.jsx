import CreatePost from "./createPost";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie';
import FoodMateAPI from '../../apis/foodMate.api'

export default function CreateFoodMate () {
    const [title, setTitle] = useState("");
    const [foodCategoryId, setCategory] = useState("");
    const [region, setRegion] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [capacity, setCapacity] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [content, setContent] = useState("");
    let navigate = useNavigate();
    const cookies = new Cookies();

    const handleCreateFoodMate = async () => {
        try {
            const accessToken = cookies.get("accessToken");
            const data = {
                title,
                foodCategoryId: +foodCategoryId,
                region,
                gender,
                age,
                capacity,
                dateTime,
                content
            }
            console.log(data);
            const foodMate = await FoodMateAPI.createFoodMate(data, accessToken);
            console.log(foodMate)
            if (!foodMate.message) {
                navigate('/foodMate');
            } else {
                alert(foodMate.message)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <CreatePost 
                foodMate={true}
                title={title}
                setTitle={setTitle}
                setCategory={setCategory}
                setRegion={setRegion}
                setGender={setGender}
                setAge={setAge}
                setCapacity={setCapacity}
                setDateTime={setDateTime}
                content={content}
                setContent={setContent}
                handleCreate={handleCreateFoodMate}
            />
        </>
    )
}