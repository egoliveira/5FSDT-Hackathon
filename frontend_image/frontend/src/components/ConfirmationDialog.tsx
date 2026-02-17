import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default function ConfirmationDialog({
                                               showDialog,
                                               payload,
                                               onConfirm,
                                               onClose,
                                               title,
                                               message,
                                               confirmButtonText,
                                               cancelButtonText
                                           }: {
    showDialog: boolean,
    payload: object,
    onConfirm: (payload: object) => void,
    onClose: () => void,
    title: string,
    message: string,
    confirmButtonText?: string | undefined
    cancelButtonText?: string | undefined
}) {
    return (<Dialog open={showDialog}
                    onClose={onClose}>
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => {
                onConfirm(payload);
                onClose();
            }}>
                {confirmButtonText == undefined ? "Confirmar" : confirmButtonText}
            </Button>
            <Button onClick={onClose}>
                {cancelButtonText == undefined ? "Cancelar" : cancelButtonText}
            </Button>
        </DialogActions>
    </Dialog>);
}