import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import QuestionResponse from "@/model/question/QuestionResponse";
import QuestionStatement from "@/components/QuestionStatement";

export default function QuestionDetailsDialog({showDialog, onClose, question}:
                                              {
                                                  showDialog: boolean,
                                                  onClose: () => void,
                                                  question: QuestionResponse
                                              }) {
    return (<Dialog open={showDialog}
                    onClose={onClose}>
        <DialogTitle>
            Detalhes da Questão
        </DialogTitle>
        <DialogContent>
            <QuestionStatement question={question}
                               showAnswer={true}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>
                Fechar
            </Button>
        </DialogActions>
    </Dialog>);
}

