import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import { ArrowRight, ExclamationDiamond } from "react-bootstrap-icons";
import Buttons from "../components/Buttons/Buttons";
import Dropdowns from "../components/Dropdowns/Dropdowns";
import currencyList from "../assets/currecyList.json";
import styles from "./HomePage.module.css";
import { useContext, useEffect, useState } from "react";
import { getConversionrates } from "../services/currencyConversion";
import Navigation from "../components/Navigation/Navigation";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const HomePage = () => {
  // api key has to be in the .env file and accessed as below
  //   const api_key = process.env.REACT_APP_API_KEY;
  // For the time being using api key as a string below
  const api_key = "8b2c296ebfaf784a01b3f341";
  const currecyCodeList = currencyList;
  const [dropdownCount, setDropdownCount] = useState(0);
  const [amount, setAmount] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrencyList, setTargetCurrencyList] = useState([]);
  const [conversionRates, setConversionrates] = useState({});

  useEffect(() => {
    getConversionrates(api_key, baseCurrency).then((data) =>
      setConversionrates(data.conversion_rates)
    );
  }, [baseCurrency]);

  const { currentUser } = useContext(CurrentUserContext);

  const currencyValueChangeHandler = (e) => {
    setAmount(e.target.value);
  };

  const baseCurrencyChangeHandler = (e) => {
    setBaseCurrency(e.target.value);
  };

  const targetCurrencyChangeHandler = (e, index) => {
    if (targetCurrencyList[index]) {
      const tempArray = [...targetCurrencyList];
      tempArray[index] = e.target.value;
      setTargetCurrencyList(tempArray);
    } else {
      const tempArray = [...targetCurrencyList];
      tempArray.push(e.target.value);
      setTargetCurrencyList(tempArray);
    }
  };

  const onAddTargetHandler = () => {
    if (baseCurrency !== "") {
      setDropdownCount((prevCount) => prevCount + 1);
    } else {
      alert(
        "Base Currency cannot be empty!!\n\nPlease Select the base currency before adding any target currencies."
      );
    }
  };

  const onRemoveTargetHandler = () =>
    setDropdownCount((prevCount) => prevCount - 1);

  const targetDropdowns = Array.from({ length: dropdownCount }).map(
    (ele, index) => (
      <div key={index} className={styles.targetFields}>
        <Dropdowns
          options={currecyCodeList}
          onChangeHandler={(e) => targetCurrencyChangeHandler(e, index)}
          cssStyles={{ width: "40%", margin: "0px 50px" }}
        />
        <span>
          <b>{baseCurrency} :</b> {`${amount}     `}
          {<ArrowRight color="green" size={30} />}
          <b>{`        ${targetCurrencyList[index]}`} : </b>
          {targetCurrencyList[index]
            ? amount *
              (Math.floor(conversionRates[targetCurrencyList[index]] * 1000) /
                1000)
            : ""}
        </span>
      </div>
    )
  );

  const onSignOutHandler = () => {
    setDropdownCount(0);
  };

  return (
    <>
      <Navigation signOutHandler={onSignOutHandler} />
      <div className={styles.amountSection}>
        <h4>Amount</h4>
        {currentUser.user_name && (
          <>
            <Form.Control
              value={amount}
              type="number"
              id="currencyValue"
              style={{ width: "20%", margin: "0px 50px" }}
              onChange={currencyValueChangeHandler}
            />
          </>
        )}
        {!currentUser.user_name && (
          <>
            <Form.Control
              value={amount}
              type="number"
              id="currencyValue"
              style={{ width: "20%", margin: "0px 50px" }}
              onChange={currencyValueChangeHandler}
              disabled
            />
          </>
        )}
      </div>
      <div className={styles.baseCurrencySection}>
        <h4>Base Currency</h4>
        {currentUser.user_name && (
          <>
            <Dropdowns
              dropdownHeading="Base Currency"
              options={currecyCodeList}
              onChangeHandler={baseCurrencyChangeHandler}
              cssStyles={{ width: "20%", margin: "0px 50px" }}
              isDisabled={false}
            />
          </>
        )}
        {!currentUser.user_name && (
          <>
            <Dropdowns
              dropdownHeading="Base Currency"
              options={currecyCodeList}
              onChangeHandler={baseCurrencyChangeHandler}
              cssStyles={{ width: "20%", margin: "0px 50px" }}
              isDisabled={true}
            />
          </>
        )}
      </div>
      <div className={styles.targetCurrencySection}>
        <h4>Target Currencies</h4>
        {targetDropdowns}
        {currentUser.user_name && (
          <>
            <Buttons
              btnName="Add New Target Currency"
              variant="success"
              onClickHandler={onAddTargetHandler}
              isDisabled={false}
              cssStyles={{ margin: "0rem 1rem" }}
            />
            <Buttons
              btnName="Remove Last Target Currency"
              variant="danger"
              onClickHandler={onRemoveTargetHandler}
              isDisabled={false}
              cssStyles={{ margin: "0rem 1rem" }}
            />
          </>
        )}
        {!currentUser.user_name && (
          <>
            <Buttons
              btnName="Add New Target Currency"
              variant="success"
              onClickHandler={onAddTargetHandler}
              isDisabled={true}
              cssStyles={{ margin: "0rem 1rem" }}
            />
            <Buttons
              btnName="Remove Last Target Currency"
              variant="danger"
              onClickHandler={onRemoveTargetHandler}
              isDisabled={true}
              cssStyles={{ margin: "0rem 1rem" }}
            />
          </>
        )}
      </div>
      {currentUser.user_name && (
        <div className={styles.footerNote} style={{ color: "green" }}>
          Thanks, You are Logged in.
        </div>
      )}
      {!currentUser.user_name && (
        <div className={styles.footerNote} style={{ color: "red" }}>
          <ExclamationDiamond />
          {`        Please Sign In To Interact with the Dashbaord       `}
          <ExclamationDiamond />
        </div>
      )}
    </>
  );
};
export default HomePage;
