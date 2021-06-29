import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { get, set, find, toNumber, remove, isEmpty } from "lodash/fp";
import { useSelector, useDispatch } from "react-redux";
import { FormCheck, Button, Form, Badge } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import company from "../../assets/images/icons/company.svg";
import status from "../../assets/images/icons/status.svg";
import market from "../../assets/images/icons/market.svg";
import world from "../../assets/images/icons/world.svg";
import ic_connectwise from "../../assets/images/icons/ic_connectwise.svg";
import ic_datto from "../../assets/images/psa.png";
import ic_infutionsoft from "../../assets/images/icons/ic_infutionsoft.svg";
import ic_link from "../../assets/images/icons/ic_link.svg";
import { setSwitches } from "../../actions";
import { PhoneAssigment } from "../../components";
import {
  TittleSettings,
  BodySettings,
  Options,
  Switches,
  SingleSwitch,
} from "./style";
import { ContainerDL } from "../../styles/style";
import {
  IgeneralState,
  Iswitch,
  IswitchesConnectWise,
  Iswitches,
} from "../../TS";
import { CSVLink } from "react-csv";

export const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [ToInfusionSoft, setToInfusionSoft] = useState(false);
  const [ToConnectWise, setToConnectWise] = useState(false);
  const [selected, setSelected] = useState<Iswitch[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showSwitches, setShowSwitches] = useState("companyTypes");
  const { filters, currentUser } = useSelector(
    ({ stagesReducer, userControlReducer }: IgeneralState) => ({
      ...stagesReducer,
      ...userControlReducer,
    })
  );
  const [buttonReport, setButtonReport] = useState(false);
  const [companiesCount, setCompaniesCount] = useState<any[]>([]);
  const [contactCount, setContactCount] = useState<any[]>([]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [companiesReport, setCompanieReport] = useState<any[]>([]);
  const [contactsReport, setContactReport] = useState<any[]>([]);

  //data report
  const headersCompany = [{ label: "Names", key: "name" }];

  const headersContacts = [
    { label: "FirstName", key: "firstName" },
    { label: "LastName", key: "lastName" },
  ];
  useEffect(() => {
    setSelected(get(`ApiResponse.${showSwitches}`, filters) || []);
    if (filters && currentUser) {
      if (currentUser.connectWise) {
        axios
          .get(`connectWise/${currentUser.connectWise}/to_infusionSoft`)
          .then(({ data }) => {
            setToInfusionSoft(data.opportunities);
          })
          .catch(() => {});

        axios
          .get(`connectWise/${currentUser.PSA}/sync/count`)
          .then(({ data }) => {
            setCompaniesCount(data.companies);
            setContactCount(data.contacts);
          })
          .catch(() => {});

        axios
          .get(`connectWise/${currentUser.PSA}/sync/list`)
          .then(({ data }) => {
            setCompanieReport(data.companies);
            setContactReport(data.contacts);
            setReportData(data);
          })
          .catch(() => {});
      }
      if (currentUser.dattoAutotask) {
        axios
          .get(`autotasks/${currentUser.dattoAutotask}/to_infusionSoft`)
          .then(({ data }) => {
            setToInfusionSoft(data.opportunities);
          })
          .catch(() => {});
      }
    }
  }, [currentUser, filters, showSwitches]);

  const sendSwitches = (userSelection: Iswitches) => {
    if (currentUser.connectWise) {
      axios
        .put(`companies/${currentUser.id}/psa/filters`, {
          ...userSelection,
          connectWiseId: currentUser.connectWise,
        }) // companies/{id}/psa/filters
        .then(({ data }: { data: IswitchesConnectWise }) => {
          dispatch(setSwitches(data));
          Swal.close();
        })
        .catch(() => {
          Swal.close();
          Swal.fire({
            text: "it was not possible to add option, try again later",
            confirmButtonColor: "#212754",
            confirmButtonText: "Close",
          });
        })
        .then(() => setLoading(false));

      axios
        .get(`connectWise/${currentUser.PSA}/sync/count`)
        .then(({ data }) => {
          setCompaniesCount(data.companies);
          setContactCount(data.contacts);
        })
        .catch(() => {});
    }
    if (currentUser.dattoAutotask) {
      axios
        .put(`companies/${currentUser.id}/psa/filters`, {
          ...userSelection,
          dattoAutotaskId: currentUser.dattoAutotask,
        }) // companies/{id}/psa/filters
        .then(({ data }: { data: IswitchesConnectWise }) => {
          dispatch(setSwitches(data));
          Swal.close();
        })
        .catch(() => {
          Swal.close();
          Swal.fire({
            text: "it was not possible to add option, try again later",
            confirmButtonColor: "#212754",
            confirmButtonText: "Close",
          });
        })
        .then(() => setLoading(false));
    }
  };

  const activeCategory = (current: string): string =>
    current === showSwitches ? "active" : "";
  const activateSwitch = (ev: React.FormEvent<HTMLInputElement>) => {
    if (!loading) {
      setLoading(true);
      const switchState = ev.currentTarget.checked;
      Swal.fire({
        text: switchState ? "adding option..." : "removing option...",
        confirmButtonColor: "#FFFFFF",
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
      let userSelection = filters.userSelection;

      const userSelectionCategory: Iswitch[] =
        get(showSwitches, userSelection) || [];

      const id = toNumber(ev.currentTarget.id.replace(`${showSwitches}-`, ""));
      const findSwitch = find({ id }, selected);

      if (id === 0) {
        userSelection.SyncAllContacts = switchState;
      } else if (id === -1) {
        userSelection.CompaniesWithoutMarkets = switchState;
      } else if (id === -2) {
        userSelection.AccountsWithoutClassification = switchState;
      } else if (id === -3) {
        userSelection.ContactWithoutCustomers = switchState;
      } else if (id === -4) {
        userSelection.AccountsWithoutTerritories = switchState;
      } else if (id === -5) {
        userSelection.CompaniesWithoutTypes = switchState;
      } 
      else if (switchState) {
        if (findSwitch && !find({ id }, userSelectionCategory)) {
          userSelectionCategory.push(findSwitch);
          userSelection = set(
            showSwitches,
            userSelectionCategory,
            userSelection
          );
        }
      } else {
        userSelection = set(
          showSwitches,
          remove({ id }, userSelectionCategory),
          userSelection
        );
      }
      sendSwitches(userSelection);
    }
  };
  const activateSwitchOpportunity = (ev: React.FormEvent<HTMLInputElement>) => {
    const switchState = ev.currentTarget.checked;
    Swal.fire({
      text: switchState ? "activating..." : "Deactivating...",
      confirmButtonColor: "#FFFFFF",
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const { id } = ev.currentTarget;

    if (currentUser.connectWise) {
      const url =
        id === "Opportunity_C_In"
          ? `connectWise/${currentUser.connectWise}/to_infusionSoft`
          : `infusionSoft/${currentUser.infusionSoft}/to_connectWise`;

      axios
        .put(url, { opportunities: switchState })
        .then(({ data }: { data: IswitchesConnectWise }) => {
          dispatch(setSwitches(data));
          if (id === "Opportunity_C_In") {
            setToInfusionSoft(switchState);
          } else {
            setToConnectWise(switchState);
          }
          Swal.close();
        })
        .catch(() => {
          Swal.close();
          Swal.fire({
            text: "it was not possible to update option",
            confirmButtonColor: "#212754",
            confirmButtonText: "Close",
          });
        })
        .then(() => setLoading(false));
    }

    if (currentUser.dattoAutotask) {
      const { id } = ev.currentTarget;
      const url =
        id === "Opportunity_C_In"
          ? `autotasks/${currentUser.dattoAutotask}/to_infusionSoft`
          : `infusionSoft/${currentUser.infusionSoft}/to_connectWise`;

      axios
        .put(url, { opportunities: switchState })
        .then(({ data }: { data: IswitchesConnectWise }) => {
          dispatch(setSwitches(data));
          if (id === "Opportunity_C_In") {
            setToInfusionSoft(switchState);
          } else {
            setToConnectWise(switchState);
          }
          Swal.close();
        })
        .catch(() => {
          Swal.close();
          Swal.fire({
            text: "it was not possible to update option",
            confirmButtonColor: "#212754",
            confirmButtonText: "Close",
          });
        })
        .then(() => setLoading(false));
    }
  };
  const isSelected = (id: number) => {
    let userSelection = filters.userSelection;
    if (id === 0) {
      return userSelection.SyncAllContacts;
    } else if (id === -1) {
      return userSelection.CompaniesWithoutMarkets;
    } else if (id === -2) {
      return userSelection.AccountsWithoutClassification;
    } else if (id === -3) {
      return userSelection.ContactWithoutCustomers;
    } else if (id === -4) {
      return userSelection.AccountsWithoutTerritories;
    } else if (id === -5) {
      return userSelection.CompaniesWithoutTypes
    } 
    else {
      const userSelectionCategory: Iswitch[] =
        get(showSwitches, filters.userSelection) || [];
      const exist = find({ id }, userSelectionCategory);
      return !isEmpty(exist);
    }
  };

  const toggleAll = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (!loading) {
      setLoading(true);
      const switches = selected.filter((el) => el.id !== -1); // without static switch 'company without markets'
      let userSelection = filters.userSelection;
      const userSelectionCategory: Iswitch[] =
        get(showSwitches, userSelection) || [];

      Swal.fire({
        text:
          userSelectionCategory.length >= switches.length
            ? "removing options..."
            : "adding options...",
        confirmButtonColor: "#FFFFFF",
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });

      if (userSelectionCategory.length >= switches.length) {
        userSelection = set(showSwitches, [], userSelection);
      } else {
        userSelection = set(showSwitches, switches, userSelection);
      }
      sendSwitches(userSelection);
    }
  };

  if (isEmpty(filters)) {
    return <></>;
  }
  return (
    <ContainerDL
      className={`transition rounded-dl shadow-dl my-4 overflow-hidden ${
        showSettings ? "open-setting" : "close-setting"
      }`}
      as="section"
    >
      <TittleSettings>
        <div className="d-flex align-items-center pl-2">
          <h3 className="tc-lgreen fwb fz-15">My connections</h3>
          {currentUser.dattoAutotask ? (
            <img src={ic_datto} alt="datto" width="40" />
          ) : (
            <img src={ic_connectwise} alt="connectwise" />
          )}
          <img src={ic_link} alt="<->" />
          <img src={ic_infutionsoft} alt="infutionsoft" />
        </div>
        <div className="d-flex align-items-center justify-content-end">
          {buttonReport && Object.entries(reportData).length > 0 ? (
            <>
              { companiesReport && (
                <CSVLink
                    className="btn mr-3"
                    style={{ backgroundColor: "#212754" }}
                    data={companiesReport}
                    headers={headersCompany}
                    filename={"companies-filter-report.csv"}
                  >
                    Companies Filter Report
                  </CSVLink>
              ) }
                  {  
                    contactsReport && (
                      <CSVLink
                    className="btn mr-3"
                    style={{ backgroundColor: "#212754" }}
                    data={contactsReport}
                    headers={headersContacts}
                    filename={"contact-filter-report.csv"}
                  >
                    Contacts Filter Report
                  </CSVLink>
                    )
                  }
                  
        
            </>
          ) : (
            ""
          )}
          <button
            className="bg-blue tc-tpurple text-white fz-13 css-19fqhri-control mr-2"
            onClick={() => {
              setShowSettings(!showSettings);
              setButtonReport(!buttonReport);
            }}
          >
            {showSettings ? "" : "Settings "}
            <AiOutlineSetting size={16} />
          </button>
        </div>
      </TittleSettings>
      <BodySettings>
        {currentUser.connectWise && (
          <Options className="tc-white">
            <div className="options-section">
              <div className="d-flex justify-content-between align-items-center mt-3">
                <h5 className="tc-lgreen">Company</h5>

                <Badge pill> {companiesCount} pass filters</Badge>
              </div>
              <span
                onClick={() => setShowSwitches("companyTypes")}
                className={activeCategory("companyTypes")}
              >
                <img src={company} alt="Types" /> Types
              </span>
              <span
                onClick={() => setShowSwitches("companyStatuses")}
                className={activeCategory("companyStatuses")}
              >
                <img src={status} alt="Statuses" /> Statuses
              </span>
              <span
                onClick={() => setShowSwitches("companyMarkets")}
                className={activeCategory("companyMarkets")}
              >
                <img src={market} alt="Markets" /> Markets
              </span>
              <span
                onClick={() => setShowSwitches("companyTerritories")}
                className={activeCategory("companyTerritories")}
              >
                <img src={world} alt="Territories" /> Territories
              </span>
            </div>
            <div className="options-section">
              <div className="d-flex justify-content-between align-items-center mt-3">
                <h5 className="tc-lgreen">Contact</h5>

                <Badge pill>{contactCount} pass filters</Badge>
              </div>

              <span
                onClick={() => setShowSwitches("contactTypes")}
                className={activeCategory("contactTypes")}
              >
                <img src={company} alt="Types" /> Types
              </span>
              <span
                onClick={() => setShowSwitches("contactStatuses")}
                className={activeCategory("contactStatuses")}
              >
                <img src={company} alt="Types" /> Statuses
              </span>
              <span
                onClick={() => setShowSwitches("Synccontacts")}
                className={activeCategory("Synccontacts")}
              >
                <img src={company} alt="Types" /> Sync all contacts
              </span>
            </div>
            <div className="options-section">
              <div className="mt-3">
                <h5 className="tc-lgreen">Opportunity</h5>
              </div>

              <span
                onClick={() => setShowSwitches("Opportunity")}
                className={activeCategory("Opportunity")}
              >
                <img src={status} alt="Types" /> Statuses
              </span>
            </div>
          </Options>
        )}
        {currentUser.dattoAutotask && (
          <Options className="tc-white">
            <div className="options-section">
              <p className="tc-lgreen">Account</p>
              <span
                onClick={() => setShowSwitches("companyTypes")}
                className={activeCategory("companyTypes")}
              >
                <img src={company} alt="Types" /> Account Types
              </span>
              <span
                onClick={() => setShowSwitches("companyStatuses")}
                className={activeCategory("companyStatuses")}
              >
                <img src={status} alt="Statuses" /> Statuses
              </span>
              <span
                onClick={() => setShowSwitches("companyClasifications")}
                className={activeCategory("companyClasifications")}
              >
                <img src={status} alt="Statuses" /> Classification
              </span>
              <span
                onClick={() => setShowSwitches("companyTerritories")}
                className={activeCategory("companyTerritories")}
              >
                <img src={world} alt="Territories" /> Territory Name
              </span>
              <span
                onClick={() => setShowSwitches("companyMarkets")}
                className={activeCategory("companyMarkets")}
              >
                <img src={market} alt="Markets" /> Market Segment
              </span>
            </div>
            <div className="options-section">
              <p className="tc-lgreen">Contact</p>
              <span
                onClick={() => setShowSwitches("contactStatuses")}
                className={activeCategory("contactStatuses")}
              >
                <img src={company} alt="Types" /> Status
              </span>

              {filters.ApiResponse.contactTypes.length > 1 && (
                <span
                  onClick={() => setShowSwitches("contactTypes")}
                  className={activeCategory("contactTypes")}
                >
                  <img src={company} alt="Types" /> Contact Types
                </span>
              )}
              <span
                onClick={() => setShowSwitches("PhoneAssigment")}
                className={activeCategory("PhoneAssigment")}
              >
                <img src={status} alt="Types" />
                Phone Assigment
              </span>
            </div>
            <div className="options-section">
              <p className="tc-lgreen">Opportunity</p>
              <span
                onClick={() => setShowSwitches("Opportunity")}
                className={activeCategory("Opportunity")}
              >
                <img src={status} alt="Types" /> Statuses
              </span>
            </div>
          </Options>
        )}

        <Switches
          className="p-1"
          style={{ height: "350px", overflowY: "auto", display: "block" }}
        >
          {showSwitches === "PhoneAssigment" && <PhoneAssigment />}
          {showSwitches === "Opportunity" ? (
            <div>
              {get("connectWise", currentUser) && (
                <FormCheck
                  style={{ width: "250px" }}
                  type="switch"
                  checked={ToInfusionSoft}
                  onChange={activateSwitchOpportunity}
                  label="Opportunity Sync"
                  id="Opportunity_C_In"
                  title="Opportunity CW -> IFS"
                />
              )}

              {get("dattoAutotask", currentUser) && (
                <FormCheck
                  style={{ width: "250px" }}
                  type="switch"
                  checked={ToInfusionSoft}
                  onChange={activateSwitchOpportunity}
                  label="Opportunity Sync"
                  id="Opportunity_C_In"
                  title="Opportunity CW -> IFS"
                />
              )}
              {/* {get('infusionSoft', currentUser) && (<FormCheck
              style={{ width: '250px' }}
              type="switch"
              checked={ToConnectWise}
              onChange={activateSwitchOpportunity}
              label="Opportunity IFS → CW"
              id="Opportunity_In_C"
              title="Opportunity IFS -> CW" />)}     */}
            </div>
          ) : (
            <>
              <div>
                {selected.map((el, idx) => {
                  let className = "";
                  if (el.danger === true) {
                    className = "danger-switch";
                  } else if (el.info === true) {
                    className = "info-switch";
                  }

                  if (currentUser.connectWise) {
                    if (el.id !== 0 && el.id !== -1 && el.id !== -3 &&
                      el.id !== -4 && el.id !== -5) {
                      return (
                        <FormCheck
                          type="switch"
                          className={className}
                          label={el.name}
                          id={`${showSwitches}-${el.id}`}
                          title={`${
                            el.danger === true
                              ? "We don't recommend this option"
                              : el.name
                          }`}
                          key={`${idx}_${el.name}`}
                          checked={isSelected(el.id)}
                          onChange={activateSwitch}
                        />
                      );
                    }
                  }
                  if (currentUser.dattoAutotask) {
                    if (
                      el.id !== -1 &&
                      el.id !== -2 &&
                      el.id !== -3 &&
                      el.id !== -4 &&
                      el.id !== -5
                    ) {
                      return (
                        <FormCheck
                          type="switch"
                          className={className}
                          label={el.name}
                          id={`${showSwitches}-${el.id}`}
                          title={`${
                            el.danger === true
                              ? "We don't recommend this option"
                              : el.name
                          }`}
                          key={`${idx}_${el.name}`}
                          checked={isSelected(el.id)}
                          onChange={activateSwitch}
                        />
                      );
                    }
                  }

                  return (
                    <SingleSwitch key={`${idx}_${el.name}`}>
                      <FormCheck
                        style={{ width: "260px" }}
                        type="switch"
                        className={className}
                        label={el.name}
                        id={`${showSwitches}-${el.id}`}
                        title={`${
                          el.danger === true
                            ? "We don't recommend this option"
                            : el.name
                        }`}
                        checked={isSelected(el.id)}
                        onChange={activateSwitch}
                      />
                    </SingleSwitch>
                  );
                })}
              </div>
              {showSwitches !== "Synccontacts" &&
                showSwitches !== "PhoneAssigment" && (
                  <div className="w-100 justify-content-end">
                    <Button
                      onClick={toggleAll}
                      variant="primary"
                      className="fwsb"
                    >
                      Toggle All
                    </Button>
                  </div>
                )}
            </>
          )}
        </Switches>
      </BodySettings>
    </ContainerDL>
  );
};
