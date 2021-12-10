import { ButtonProps } from "../../interfaces";
import { Button } from "react-bootstrap";

const GenericButton = ({ onClick, className, label }: ButtonProps) => {
  return <Button onClick={() => onClick()} className={className}> { label }</Button>
}

export default GenericButton;
