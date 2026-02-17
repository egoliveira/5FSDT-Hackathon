import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export default function AlertDialog({showDialog, onClose, title, message, closeButtonText}: {
    showDialog: boolean,
    onClose: () => void,
    title: string,
    message: string,
    closeButtonText?: string | undefined
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
            <Button onClick={onClose}>
                {closeButtonText == undefined ? "Fechar" : closeButtonText}
            </Button>
        </DialogActions>
    </Dialog>);
}