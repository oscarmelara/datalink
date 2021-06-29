import React, { useState } from "react";
import Tour, { Close } from "reactour";
import user from "../../assets/images/user.png";
import "../../styles/logs.sass";

export type Props = {
  onSubmitInfu: (showInfusionSoft: boolean) => void;
};

export const TourInfusion = ({ onSubmitInfu }: Props) => {
  const [isTourOpen, setOpen] = useState(true);
  const [index, setIndex] = useState(0);
  const onClose = () => {
    setOpen(false);
    onSubmitInfu(false);
  };
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  return (
    <div>
      <Tour
        goToStep={index}
        nextStep={async () => {
          if (index === 0) {
            onSubmitInfu(true);
            await delay(250);
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
              <div className="tour-right">
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
                    Click here to connect InfusionSoft, we highly recommend
                    login in to InfusionSoft first before clicking here.
                  </h6>
                </div>
              </div>
            ),
            selector: ".infu"
          },
          {
            content: ({ close }) => (
              <div>
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
                    Click here to connect Infusionsoft, we highly recommend
                    login in to Infusionsoft first before clicking here.
                  </h6>{" "}
                </div>
              </div>
            ),
            selector: ".b-infu"
          }
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
        prevButton="Prev"
        rounded={5}
        scrollDuration={100}
        scrollOffset={1}
        updateDelay={2}
      ></Tour>
    </div>
  );
};
