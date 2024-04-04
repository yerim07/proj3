import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import useDiary from "../hooks/useDiary";
import Viewer from "../components/Viewer";
import { useEffect } from "react";
import { setPageTitle } from "../util";

const Diary = () => {
  const { id } = useParams();
  const data = useDiary(id);

  useEffect(() => {
    setPageTitle(`회원정보`);
  }, []);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>;
  } else {
    const { contentName, emotionId, content } = data;
    const title = `${contentName}의 정보`;
    return (
      <div>
        <Header
          title={title}
          leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
          rightChild={<Button text={"수정하기"} onClick={goEdit} />}
        />
        <Viewer content={content} emotionId={emotionId} />
      </div>
    );
  }
};
export default Diary;
