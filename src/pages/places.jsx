import Header from './pageHeader';
import PlaceList from './placeList';

export default function Places() {
    return (
        <>
            <Header category={'Category'}/>
            <PlaceList/>
            <PlaceList/>
        </>
    )
}