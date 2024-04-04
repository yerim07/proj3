import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { DiaryDispatchContext } from "../App";
import { useContext, useEffect } from "react";
import { setPageTitle } from "../util";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("신규회원등록");
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit = (data) => {
    const { date, contentNumber, contentName, emotionId } = data;
    onCreate(date, contentNumber, contentName, emotionId);
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"신규회원등록"}
        leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};
export default New;
