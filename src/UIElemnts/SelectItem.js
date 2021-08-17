import Styles from './SelectItem.module.css';
import {Image} from "react-bootstrap";

const SelectItem = (props) => {
    return (
        <div className={Styles.item}>
            <div className={Styles.title}>
                {props.label}
            </div>
            <div className={`${Styles.itemWrap} d-flex align-items-center`}>
                <div className="d-flex align-items-center">
                    <Image
                        className={Styles.icon}
                        src={props.iconImage}
                        fluid
                    />
                    <div className={`${Styles.optionName}`}> {props.optionName} </div>
                </div>
                <div className={"ml-auto"}>
                    <Image src={props.downArrow}/>
                </div>
            </div>
        </div>
    );
};

export default SelectItem;
