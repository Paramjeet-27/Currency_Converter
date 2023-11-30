import Form from "react-bootstrap/Form";

const Dropdowns = ({ cssStyles, options, onChangeHandler, isDisabled }) => {
  const dropdownOptions = options.map((ele, index) => (
    <option
      key={index}
      value={ele.code}
    >{`${ele.code} - ${ele.currency_name}`}</option>
  ));

  return (
    <>
      <Form.Select
        style={cssStyles}
        aria-label="dropdownComponent"
        onChange={onChangeHandler}
        disabled={isDisabled}
      >
        <option value={""}>Select Currency</option>
        <optgroup label="Main Countries">
          <option value="USD">USD - US Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound Sterling</option>
        </optgroup>
        <optgroup label="All Countries">{dropdownOptions}</optgroup>
      </Form.Select>
    </>
  );
};
export default Dropdowns;
