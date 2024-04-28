import { useEffect, useState } from "react";
import style from "../../../styles/user.module.css";
import { Cookies } from "react-cookie";
import UserAPI from "../../../apis/user.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import PageButton from "../../layout/pageButton";

export default function MyTitles() {
  const cookies = new Cookies();
  const levels = ["입문", "초보", "중수", "고수", "전문가", "신", "음식"];
  const counts = [1, 10, 30, 50, 80, 120, 200];

  const [titles, setTitles] = useState([]);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(titles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPages = titles.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetechDate = async () => {
      try {
        const res = await UserAPI.findAllTitles(cookies.get("accessToken"));

        if (res.statusCode === 200) {
          setTitles(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetechDate();
  }, []);

  const upgradeTitleMessage = (title, count) => {
    const currentLevelIndex = levels.findIndex((level) => level === title);
    const nextLevelIndex = currentLevelIndex + 1;
    const nextLevel = levels[nextLevelIndex];
    const nextLevelCount = counts[nextLevelIndex];

    if (!nextLevel) {
      return "최고 레벨에 도달했습니다!";
    } else {
      return `${nextLevel} 까지 ${
        nextLevelCount - count
      } 번의 참여 시 레벨 업 가능 !!`;
    }
  };

  return (
    <>
      <div className={style.mainContainer}>
        <p className={style.mainTitle}>Titles</p>
        {currentPages.map((title, index) => (
          <div key={index} className={style.contents}>
            <h2 style={{ margin: "50px 0 30px 0" }}>
              {title.foodCategory.category} {title.level}
            </h2>
            <p className={style.levelUP}>
              {upgradeTitleMessage(title.level, title.count)}
            </p>
            <div style={{ display: "flex" }}>
              {levels.map((level, index) => (
                <>
                  {title.level === level ? (
                    <div key={index} className={style.mytitle}>
                      {index === 6 ? title.foodCategory.category : level}
                    </div>
                  ) : (
                    <div key={index} className={style.titleLevel}>
                      {level}
                    </div>
                  )}

                  {index !== 6 && (
                    <FontAwesomeIcon
                      icon={faArrowRightLong}
                      style={{ margin: "auto" }}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        ))}
        <PageButton
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          data={titles}
        />
      </div>
    </>
  );
}
