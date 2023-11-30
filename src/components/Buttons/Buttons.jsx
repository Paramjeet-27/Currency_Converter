import Button from "react-bootstrap/Button";

const Buttons = ({
  btnName,
  variant,
  onClickHandler,
  cssStyles,
  isDisabled,
}) => {
  return (
    <>
      <Button
        variant={variant}
        style={cssStyles}
        onClick={onClickHandler}
        disabled={isDisabled}
      >
        {btnName}
      </Button>
    </>
  );
};
export default Buttons;
