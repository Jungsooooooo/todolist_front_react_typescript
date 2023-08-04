import { Modal } from "antd";

const ModalTemplate = (props:any) =>{

    return(
    <>
        <Modal title={props.title} open={props.open} centered={true} onCancel={props.onCancel()}>
            <p> {props.info} </p>
        </Modal>
    </> 
    )
}

export default ModalTemplate;