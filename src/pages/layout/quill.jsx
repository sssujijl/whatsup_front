import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Quill({ content, setContent }) {
    const modules = {
        toolbar: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
      };
    
      return (
        <>
          <div style={{ overflowY: "auto", height: "530px" }}>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              style={{ height: "450px" }}
            />
          </div>
        </>
      );
}