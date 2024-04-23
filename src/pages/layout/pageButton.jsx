import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const PageBtnContainer = styled.div`
    display: flex;

    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
`

const PageBtn = styled.div`
    border: transparent;
    background-color: transparent;
    font-size: 25px;
    position: relative;
    top: 10px;
`

export default function PageButton(props) {
  return (
    <>
      <PageBtnContainer>
        {props.data.length > props.itemsPerPage && (
          <PageBtn
            style={{right: '25px'}}
            onClick={() => props.setCurrentPage(props.currentPage - 1)}
            disabled={props.currentPage === 1}
          >
            <FontAwesomeIcon icon={faCircleArrowLeft} />
          </PageBtn>
        )}
        <p>
          {props.currentPage} / {props.totalPages}
        </p>
        {props.data.length > props.itemsPerPage && (
          <PageBtn
            style={{left: '25px'}}
            onClick={() => props.setCurrentPage(props.currentPage + 1)}
            disabled={props.currentPage === props.totalPages}
          >
            <FontAwesomeIcon icon={faCircleArrowRight} />
          </PageBtn>
        )}
      </PageBtnContainer>
    </>
  );
}
