import "./Editor.css";
import { useState, useEffect, useCallback } from "react";
import { emotionList, getFormattedDate } from "../util";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";

const Editor = ({ initData, onSubmit }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    contentName: "",
    contentNumber: "",
  });

  useEffect(() => {
    if (initData) {
      setState({
        ...initData,
        date: getFormattedDate(new Date(parseInt(initData.date))),
      });
    }
  }, [initData]);

  const handleChangeDate = (e) => {
    setState({
      ...state,
      date: e.target.value,
    });
  };

  const handleChangeContentName = (e) => {
    setState({
      ...state,
      contentName: e.target.value,
    });
  };

  const handleChangeContentNumber = (e) => {
    setState({
      ...state,
      contentNumber: e.target.value,
    });
  };

  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) => ({
      ...state,
      emotionId,
    }));
  }, []);

  const handleSubmit = () => {
    onSubmit(state);
  };

  const handleOnGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="Editor">
      <h4>회원가입일</h4>
      <div className="input_wrapper">
        <input type="date" value={state.date} onChange={handleChangeDate} />
      </div>
      <div className="editor_section">
        <h4>회원등급</h4>
        <div className="input_wrapper emotion_list_wrapper">
          {emotionList.map((it) => (
            <EmotionItem
              key={it.id}
              {...it}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId === it.id}
            />
          ))}
        </div>
      </div>
      <div className="editor_section">
        <h4>회원 이름</h4>
        <div className="input_wrapper">
          <input value={state.contentName} onChange={handleChangeContentName} />
        </div>
      </div>
      <div className="editor_section">
        <h4>회원 번호</h4>
        <div className="input_wrapper">
          <input
            value={state.contentNumber}
            onChange={handleChangeContentNumber}
          />
        </div>
      </div>

      <div className="editor_section bottom_section">
        <Button text={"취소하기"} onClick={handleOnGoBack} />
        <Button text={"수정하기"} type={"positive"} onClick={handleSubmit} />
      </div>
    </div>
  );
};
export default Editor;
