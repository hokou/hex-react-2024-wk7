import { useSelector } from "react-redux";

export default function Toast() {
  const message = useSelector((store) => store.toast.messages);
  
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
      {
        message.map((message, index) => (
          <div key={index} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className={`toast-header ${message.status === "success" ? "bg-success" : "bg-danger"} text-white`}>
              <strong className="me-auto">
                {message.status === "success" ? "成功" : "失敗"}
              </strong>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">已更新產品</div>
          </div>
      ))}
    </div>
  )
}

