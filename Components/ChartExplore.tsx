import React, { useState } from "react";
import { ChartExploreProps } from "./chartTypes";
import { Divider, Transition, Button } from "semantic-ui-react";
import ModalRender from "./ModalRender";
import Modal from "react-modal";
import "./styles.css";
import { CSSTransition } from "react-transition-group";
Modal.setAppElement("span");

function ChartExplorePlugin({
  trailerTextBody,
  columnsData,
}: ChartExploreProps) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div>
      {columnsData != null ? (
        <div>
          <button
            onClick={toggleModal}
            style={{ display: isOpen ? "none" : "block" }}
          >
            {trailerTextBody}
          </button>
          <CSSTransition in={isOpen} timeout={300} classNames="dialog">
            <Modal
              isOpen={isOpen}
              onRequestClose={toggleModal}
              contentLabel="My dialog"
              className="mymodal"
              overlayClassName="myoverlay"
              closeTimeoutMS={500}
            >
              <button onClick={toggleModal}>Close modal</button>
              <table style={{ border: "1px solid " }}>
                <thead>
                  <tr>
                    {Object.keys(columnsData[0]).map((id: any) => (
                      <th
                        style={{
                          padding: "4px",
                          margin: "2px",
                          border: "1px solid ",
                        }}
                      >
                        {id}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {columnsData.map((data: any, index: any) => (
                    <tr
                      key={Math.floor(Math.random(1, 100))}
                      style={{ border: "1px solid " }}
                    >
                      {Object.keys(data).map((element) => (
                        <td style={{ border: "1px solid " }}>
                          {data[element]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Modal>
          </CSSTransition>
          <span></span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ChartExplorePlugin;
