import { DiaryDispatchContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useContext, useEffect } from "react";
import { setPageTitle } from "../util";

const Edit = () => {
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const { id } = useParams();
  const data = useDiary(id);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle(`회원정보수정`);
  });

  const goBack = () => {
    navigate(-1);
  };

  const onClickDelete = () => {
    if (window.confirm("회원정보를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      onDelete(id);
      navigate("/", { replace: true });
    }
  };

  const onSubmit = (data) => {
    if (window.confirm("회원정보를 수정할까요?")) {
      const { date, contentNumber, contentName, emotionId } = data;
      onUpdate(id, date, contentNumber, contentName, emotionId);
      navigate("/", { replace: true });
    }
  };

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>;
  } else {
    return (
      <div>
        <Header
          title={"회원정보수정"}
          leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
          rightChild={
            <Button
              type={"negative"}
              text={"회원삭제"}
              onClick={onClickDelete}
            />
          }
        />
        <Editor initData={data} onSubmit={onSubmit} />
      </div>
    );
  }
};
export default Edit;
