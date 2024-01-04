import React from "react";
import TextArea from "../ui/Text-area";
import Input from "../ui/Input";
import { useSelector } from "react-redux";

function ArticleForm(props) {
  const { isloading } = useSelector((state) => state.article);
  const {
    title,
    setTitle,
    description,
    setDescription,
    body,
    setBody,
    formSubmit,
  } = props;

  return (
    <div>
      <div>
        <form onSubmit={formSubmit}>
          <Input label={"aatitle"} state={title} setSate={setTitle} />
          <TextArea
            label={"description"}
            state={description}
            setState={setDescription}
          />
          <TextArea
            label={"body"}
            state={body}
            setState={setBody}
            height="300px"
          />
          <button
            className="w-100 btn btn-lg btn-primary mt-2"
            disabled={isloading}
            type="submit"
            onClick={formSubmit}
          >
            {isloading ? "Loading..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ArticleForm;
