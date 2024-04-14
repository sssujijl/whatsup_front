import { createGlobalStyle } from "styled-components";
import WAGURI from './WAGURI_TTF.ttf';
import Freesentation from './Freesentation.ttf';
import 감탄로드 from './감탄로드감탄체.ttf'
import Pretendard_Regular from './Pretendard.ttf';


const GlobalFonts = createGlobalStyle`
@font-face {
    font-family: 'WAGURI';
    src: url(${WAGURI}) format('truetype');
}

@font-face {
    font-family: 'Freesentation';
    src: url(${Freesentation}) format('truetype');
}

@font-face {
    font-family: '감탄로드';
    src: url(${감탄로드}) format('truetype');
}

@font-face {
    font-family: 'Pretendard';
    src: url(${Pretendard_Regular}) format('truetype');
}
`

export default GlobalFonts;