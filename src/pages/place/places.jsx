import Header from '../layout/pageHeader';
import PlaceList from './placeList_row';

export default function Places() {
    return (
        <>
            <Header category={'Category'} search={true}/>
            <PlaceList/>
            <PlaceList/>
        </>
    )
}