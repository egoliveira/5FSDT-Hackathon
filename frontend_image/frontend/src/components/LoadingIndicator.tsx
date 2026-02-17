import {Box, CircularProgress} from "@mui/material";

export default function LoadingIndicator() {
    return (<Box display="flex" flexDirection="row" justifyContent="center">
        <CircularProgress/>
    </Box>);
}