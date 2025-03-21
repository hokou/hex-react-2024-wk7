import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toast as BsToast } from "bootstrap";
import { removeMessage } from "../redux/toastSlice";

const TOAST_DURATION = 2000;

export default function Toast() {
  const messages = useSelector((store) => store.toast.messages);

  const toastRefs = useRef({});

  const dispath = useDispatch();

  useEffect(() => {
    messages.forEach((message) => {
      const messageElement = toastRefs.current[message.id];

      if (messageElement) {
        const toastInstance = new BsToast(messageElement);
        toastInstance.show();

        setTimeout(() => {
          dispath(removeMessage(message.id));
        }, TOAST_DURATION);
      }
    });
  }, [dispath, messages]);

  const handleDismiss = (id) => {
    dispath(removeMessage(id));
  };
  
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
      {
        messages.map((message) => (
          <div ref={(el) => (toastRefs.current[message.id] = el)} key={message.id} className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className={`toast-header ${message.status === "success" ? "bg-success" : "bg-danger"} text-white`}>
              <strong className="me-auto">
                {message.status === "success" ? "成功" : "失敗"}
              </strong>
              <button
                onClick={() => handleDismiss(message.id)}
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">{message.text}</div>
          </div>
      ))}
    </div>
  )
}

