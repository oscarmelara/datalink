import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IgeneralState } from "../../TS";
import { simpleAlert } from "../../utils";

interface phoneMap {
  name: string;
  mapping: string;
}

export const PhoneAssigment: React.FC = () => {
  const [phoneData, setPhoneData] = useState<any[]>([]);
  const { currentUser } = useSelector(
    ({ userControlReducer }: IgeneralState) => ({
      ...userControlReducer,
    })
  );

  useEffect(() => {
    axios
      .get(`autotasks/${currentUser.dattoAutotask}/to_infusionSoft`)
      .then(({ data }) => {
        setPhoneData(data.phoneMap);
      })
      .catch(() => {});
  }, [currentUser]);

  const sendData = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    axios
      .put(`autotasks/${currentUser.dattoAutotask}/to_infusionSoft`, {  
          phoneMap: phoneData
       })
      .then((response) => {
        simpleAlert({
          icon: 'success',
          html: 'Phones assigned correctly',
        })
      })
  }
  return (
    <div>

      <Form onSubmit={sendData} className=" d-flex col-12 flex-wrap">
        <div className=" col-6">
          <p className="tc-lgreen font-weight-bolder mb-0">InfusionSoft</p>
        </div>
        <div className="col-6">
          <p className="tc-lgreen font-weight-bolder mb-0">Autotask</p>
        </div>
        {phoneData.map((item, index) => (
          <div className="col-12 d-flex flex-wrap" key={index}>
            <div className="col-6">
              <Form.Group
                controlId="exampleForm.ControlSelect1"
                className="  h-100 d-flex flex-column justify-content-end"
              >
                <Form.Label>Phone {index + 1}</Form.Label>
                <Form.Control
                  as="select"
                  className=" font-weight-bolder"
                  defaultValue={item.name}
                  onChange={(e) => {
                    let currentPhoneData = phoneData[index];
                    currentPhoneData.name = e.currentTarget.value;
                    phoneData[index] = currentPhoneData;
                    setPhoneData([...phoneData]);
                  }}
                >
                  <option value="Work">Work</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Other">Other</option>
                  <option value="Home">Home</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className=" col-6">
              <Form.Group
                controlId="exampleForm.ControlSelect1"
                className="  h-100 d-flex align-items-end"
              >
                <Form.Control
                  as="select"
                  className=" font-weight-bolder"
                  defaultValue={item.mapping}
                  onChange={(e) => {
                    let currentPhoneData = phoneData[index];
                    currentPhoneData.mapping = e.currentTarget.value;
                    phoneData[index] = currentPhoneData;
                    setPhoneData([...phoneData]);
                  }}
                >
                  <option value="Phone">Phone</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Alternate Phone">Alternate Phone</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>
        ))}

        <div className=" col-12 d-flex justify-content-end mt-4">
          <Button type="submit" variant="primary" className="fwsb">
            Assign
          </Button>
        </div>
      </Form>
    </div>
  );
};
