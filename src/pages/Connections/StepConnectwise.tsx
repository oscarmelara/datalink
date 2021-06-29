import React, { useState } from "react";
import Tour, { Close } from "reactour";
import user from "../../assets/images/user.png";
import info from "../../assets/images/icons/pdf.png";
import pdf from "../../assets/images/icons/pdf.png";
import "../../styles/logs.sass";

export type Props = {
  onSubmit: (showConnectWise: boolean) => void;
};

export const TourConnect = ({ onSubmit }: Props) => {
  const [isTourOpen, setOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const onClose = () => {
    setOpen(false);
    onSubmit(false);

  };
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  return (
    <div>
      <Tour
        goToStep={index}
        nextStep={async () => {
          if (index === 0) {
            onSubmit(true);
            await delay(300);
          }

          setIndex(index + 1);
        }}
        prevStep={() => {
          setIndex(index - 1);
        }}
        isOpen={isTourOpen}
        steps={[

          {
            content: ({ close }) => (
              <div className="tour-left">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-start align-items-center">
                    <img
                      className="rounded-circle mr-2"
                      style={{ width: "15%" }}
                      src={user}
                      alt=""
                    />
                    <h6 className="text-dark m-0">
                      <span className=" font-weight-bold">Walter</span> from
                      Datalink
                    </h6>
                  </div>
                  <Close
                    onClick={() => {
                      onClose();
                    }}
                    className="something"
                  />
                </div>
                <div className="text-primary mt-4">
                  <h6 className="text-primary font-weight-bold text-center">
                    Click this button to connect to ConnectWise
                  </h6>
                </div>
                <a
                  className="p-1 position-absolute block rounded-lg bg-blue-light"
                  href="https://storage.googleapis.com/dl-usr-data/DataLink_CW_API_Keys.pdf"
                  target="_blank"
                  style={{ right: '-10%', top: '50%', marginTop: '-50px' }}
                >
                  <img
                    className="mx-auto block"
                    style={{ display: "block" }}
                    src={info}
                    alt=""
                  />
                  <p className=" m-0 tc-white">Guide</p>
                </a>
              </div>
            ),
            selector: ".connect",
            stepInteraction: false,


          },
          {
            content: ({ close }) => (
              <div className="tour-left">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-start align-items-center">
                    <img
                      className="rounded-circle mr-2"
                      style={{ width: "15%" }}
                      src={user}
                      alt=""
                    />
                    <h6 className="text-dark m-0">
                      <span className=" font-weight-bold">Walter</span> from
                      Datalink
                    </h6>
                  </div>
                  <Close
                    onClick={() => {
                      onClose();
                    }}
                    className="something"
                  />
                </div>
                <div className="text-primary mt-4">
                  <h6 className="text-primary font-weight-bold text-center">
                    Company Name (this is your company name NO SPACES) from your
                    Connectwise Login Page{" "}
                  </h6>
                </div>
                <a
                  className="p-3 position-absolute"
                  href="https://storage.googleapis.com/dl-usr-data/DataLink_CW_API_Keys.pdf"
                  target="_blank"
                  style={{ bottom: '0', right: '0' }}
                >
                  <img
                    className="mx-auto block"
                    style={{ display: "block" }}
                    src={info}
                    alt=""
                  />
                </a>
              </div>
            ),
            selector: ".one",
            stepInteraction: true,
            action: node => {
              node.focus();
            }
          },
          {
            content: ({ close }) => (
              <div className="tour-left">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-start align-items-center">
                    <img
                      className="rounded-circle mr-2"
                      style={{ width: "15%" }}
                      src={user}
                      alt=""
                    />
                    <h6 className="text-dark m-0">
                      <span className=" font-weight-bold">Walter</span> from
                      Datalink
                    </h6>
                  </div>
                  <Close
                    onClick={() => {
                      onClose();
                    }}
                    className="something"
                  />
                </div>
                <div className="text-primary mt-4">
                  <h6 className="text-primary font-weight-bold text-center">
                    Connectwise URL (this depends on your country zone or if you
                    are an on premise hosted) Please use appropiate URL on the
                    dropdown or manually type it EXACTLY as it appears on your
                    connectwise Login Page
                  </h6>
                </div>
                <a
                  className="p-3 position-absolute"
                  href="https://storage.googleapis.com/dl-usr-data/DataLink_CW_API_Keys.pdf"
                  target="_blank"
                  style={{ bottom: '0', right: '0' }}
                >
                  <img
                    className="mx-auto block"
                    style={{ display: "block" }}
                    src={pdf}
                    alt=""
                  />
                </a>
              </div>
            ),
            selector: ".two",
            stepInteraction: true,
            action: node => {
              node.focus();
            }
          },
          {
            content: ({ close }) => (
              <div className="tour-left">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-start align-items-center">
                    <img
                      className="rounded-circle mr-2"
                      style={{ width: "15%" }}
                      src={user}
                      alt=""
                    />
                    <h6 className="text-dark m-0">
                      <span className=" font-weight-bold">Walter</span> from
                      Datalink
                    </h6>
                  </div>
                  <Close
                    onClick={() => {
                      onClose();
                    }}
                    className="something"
                  />
                </div>

                <div className="text-primary mt-4">
                  <h6 className="text-primary font-weight-bold text-center">
                    Public Key. These keys are obtain from the PSA's interface,
                    please use these steps on{" "}
                    <a
                      href="https://storage.googleapis.com/dl-usr-data/DataLink_CW_API_Keys.pdf"
                      target="_blank"
                    >
                      this document
                    </a>{" "}
                    to get new keys. If you have any issues with this please
                    contact your Connectwise Administrator and ask for the
                    proper API Keys access rights, Perhaps they can provide
                    these for you.{" "}
                  </h6>{" "}
                </div>
                <a
                  className="p-3 position-absolute"
                  href="https://storage.googleapis.com/dl-usr-data/DataLink_CW_API_Keys.pdf"
                  target="_blank"
                  style={{ bottom: '0', right: '0' }}
                >
                  <img
                    className="mx-auto block"
                    style={{ display: "block" }}
                    src={info}
                    alt=""
                  />
                </a>
              </div>
            ),
            selector: ".three",
            stepInteraction: true,
            action: node => {
              node.focus();
            }
          },
          {
            content: ({ close }) => (
              <div className="tour-left">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-start align-items-center">
                    <img
                      className="rounded-circle mr-2"
                      style={{ width: "15%" }}
                      src={user}
                      alt=""
                    />
                    <h6 className="text-dark m-0">
                      <span className=" font-weight-bold">Walter</span> from
                      Datalink
                    </h6>
                  </div>
                  <Close
                    onClick={() => {
                      onClose();
                    }}
                    className="something"
                  />
                </div>
                <div className="text-primary mt-4">
                  <h6 className="text-primary font-weight-bold text-center">
                    Private Key. These keys are obtain from the PSA's interface,
                    please use these steps on this document to get new keys. If
                    you have any issues with this please contact your
                    Connectwise Administrator and ask for the proper API Keys
                    access rights, Perhaps they can provide these for you.{" "}
                  </h6>
                </div>
                <a
                  className="p-3 position-absolute"
                  href="https://storage.googleapis.com/dl-usr-data/DataLink_CW_API_Keys.pdf"
                  target="_blank"
                  style={{ bottom: '0', right: '0' }}
                >
                  <img
                    className="mx-auto block"
                    style={{ display: "block" }}
                    src={info}
                    alt=""
                  />
                </a>
              </div>
            ),
            selector: ".four",
            stepInteraction: true,
            action: node => {
              node.focus();
            }
          },
          {
            content: ({ close }) => (
              <div className="tour-left">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-start align-items-center">
                    <img
                      className="rounded-circle mr-2"
                      style={{ width: "15%" }}
                      src={user}
                      alt=""
                    />
                    <h6 className="text-dark m-0">
                      <span className=" font-weight-bold">Walter</span> from
                      Datalink
                    </h6>
                  </div>
                  <Close
                    onClick={() => {
                      onClose();
                    }}
                    className="something"
                  />
                </div>
                <div className="text-primary mt-4">
                  <h6 className="text-primary font-weight-bold text-center">
                    Click here to Connect{" "}
                  </h6>
                </div>
                <a
                  className="p-3 position-absolute"
                  href="https://storage.googleapis.com/dl-usr-data/DataLink_CW_API_Keys.pdf"
                  target="_blank"
                  style={{ bottom: '0', right: '0' }}
                >
                  <img
                    className="mx-auto block"
                    style={{ display: "block" }}
                    src={info}
                    alt=""
                  />
                </a>
              </div>
            ),
            selector: ".dl-button"
          },

        ]}
        onRequestClose={() => {
          setIndex(0);
          onClose();
        }}
        maskClassName="mask"
        accentColor="#007AFF"
        closeWithMask={false}
        disableDotsNavigation={false}
        inViewThreshold={10}
        maskSpace={10}
        nextButton="Next"
        prevButton="Prev "
        rounded={5}
        scrollDuration={100}
        scrollOffset={1}
        updateDelay={2}
      ></Tour>
    </div>
  );
};
