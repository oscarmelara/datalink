import React, { useState, useEffect } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import Select, { OptionsType, OptionTypeBase, ValueType } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { ButtonGroup, Button } from "react-bootstrap";
import {
  setUser,
  setUsers,
  setEndDate,
  setStartDate,
  setLoading,
} from "../../actions";
import {
  Option,
  SingleValue,
  customStylesReactSelect,
} from "../../components/ReactSelectCustom";
import { IgeneralState, IgenericObject } from "../../TS";
import { ContainerDL } from "../../styles/style";
import CalendarIcon from "../../assets/images/icons/calendar.svg";
import "../../styles/datepicker.sass";
import "../../styles/filters.sass";

export const Filters: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector(
    ({ userControlReducer, filtersReducer }: IgeneralState) => ({
      ...userControlReducer,
      ...filtersReducer,
    })
  );
  const { selectedUser, userList, startDate, endDate, loadedList } = data;
  const [quick, setQuick] = useState("today");

  useEffect(() => {
    localStorage.setItem("mes_seleccionado", "kha");
    // this confition is because when I tried to check 'userList' in the dependecies array this component was rendered infinitely
    if (!loadedList) {
      dispatch(setUsers());
    }
  }, [dispatch, loadedList]);

  const handleButtonGroup = (ev: React.MouseEvent<HTMLButtonElement>): void => {
    ev.preventDefault();
    const currentValue = ev.currentTarget.name;

    if (quick === currentValue) {
      setQuick("");
    } else {
      setQuick(currentValue);
      const now = moment();
      dispatch(setLoading(true));
      dispatch(setEndDate(now.endOf("day").toDate()));

      switch (currentValue) {
        case "today":
          dispatch(setStartDate(now.startOf("month").toDate()));
          localStorage.setItem("mes_seleccionado", currentValue);
          dispatch(setEndDate(moment().endOf('month').toDate()))
          break;
        case "lmonth":
          dispatch(
            setStartDate(moment().subtract(1,'months').startOf('month').startOf('day').toDate())
          );
          dispatch(setEndDate(moment().subtract(1,'month').endOf('month').toDate()))
          localStorage.setItem("mes_seleccionado", currentValue);

          break;
        case "nmonth":
          dispatch(setEndDate(now.add(1, "months").endOf("month").toDate()));
          dispatch(setStartDate(moment().add(1,'months').startOf('month').startOf('day').toDate()));
          localStorage.setItem("mes_seleccionado", currentValue);

          break;
        case "l3month":
          dispatch(
            setStartDate(moment().subtract(3, "months").startOf("month").toDate())
          );
          dispatch(setEndDate(moment().subtract(1,'month').endOf('month').toDate()))
          localStorage.setItem("mes_seleccionado", currentValue);

          break;
        case "n3month":
          dispatch(setEndDate(now.add(3, "months").endOf("month").toDate()));
          dispatch(setStartDate(moment().add(1,'months').startOf('month').startOf('day').toDate()));
          localStorage.setItem("mes_seleccionado", currentValue);

          break;
        case "lyear":
          dispatch(
            setStartDate(moment().subtract(1, "year").startOf("month").toDate())
          );
          dispatch(setEndDate(moment().subtract(1,'month').endOf('month').toDate()))
          localStorage.setItem("mes_seleccionado", currentValue);

          break;
        default:
          dispatch(
            setStartDate(now.subtract(6, "months").startOf("day").toDate())
          );
          dispatch(setEndDate(moment().endOf('month').toDate()))
          localStorage.setItem("mes_seleccionado", "today");

          break;
      }
    }
  };
  return (
    <ContainerDL className="filters-container o-unset">
      <div className="datepickers">
        <img src={CalendarIcon} alt="Calendar" className="mr-4 ico-calendar" />
        <div>
          <span className="tc-tpurple fwb fz-15">From</span>
          <DatePicker
            placeholderText="MM/DD/YYYY"
            className="mx-3"
            selected={startDate}
            onChange={(date) => {
              dispatch(setLoading(true));
              dispatch(setStartDate(date));
              setQuick("");
            }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <span className="aux" />
          <span className="tc-tpurple fwb fz-15">to</span>
          <DatePicker
            placeholderText="MM/DD/YYYY"
            className="ml-3"
            selected={endDate}
            onChange={(date) => {
              dispatch(setLoading(true));
              dispatch(setEndDate(date));
              setQuick("");
            }}
            selectsEnd
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </div>
      <ButtonGroup
        as="section"
        aria-label="Quick filter"
        className="quick-filter"
      >
        <Button
          onClick={handleButtonGroup}
          active={quick === "lyear"}
          name="lyear"
        >
          Last Year
        </Button>
        <Button
          onClick={handleButtonGroup}
          active={quick === "l3month"}
          
          name="l3month"
        >
          Last 3 months
        </Button>
        <Button
          onClick={handleButtonGroup}
          active={quick === "lmonth"}
          name="lmonth"
        >
          Last Month
        </Button>
        <Button
          onClick={handleButtonGroup}
          active={quick === "today"}
         
          name="today"
        >
          This Month
        </Button>
        <Button
          onClick={handleButtonGroup}
          active={quick === "nmonth"}
          name="nmonth"
        >
          Next Month
        </Button>
        <Button
          onClick={handleButtonGroup}
          active={quick === "n3month"}
          name="n3month"
        >
          Next 3 months
        </Button>
      </ButtonGroup>
      <Select
        className="select-user-global"
        defaultValue={selectedUser as ValueType<OptionTypeBase>}
        onChange={(selected) => {
          dispatch(setUser(selected as IgenericObject));
        }}
        components={{ IndicatorSeparator: () => null, Option, SingleValue }}
        styles={customStylesReactSelect}
        options={userList as OptionsType<OptionTypeBase>}
      />
    </ContainerDL>
  );
};
