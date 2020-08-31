import React from "react";
import "./AppFooter.scss";
import { Steps } from "antd";

const { Step } = Steps;
function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="app-footer__full d-flex justify-content-between align-items-center">
        <div className="app-footer__steps">
          <Steps current={1} size="small">
            <Step title="Finished" />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
          </Steps>
        </div>
        <div className="app-footer__actions d-flex justify-content-end">
          <button className="btn component__btn-primary mr-4">Gửi</button>
          <button className="btn component__btn-save-template mr-4">Lưu mẫu</button>
          <button className="btn component__btn-save-draft mr-4"><span>Lưu nháp</span></button>
          <button className="btn component__btn-cancel mr-5">Hủy</button>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
