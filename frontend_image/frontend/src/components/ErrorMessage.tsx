import {Box, Theme, Typography} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {SxProps} from "@mui/system/styleFunctionSx";

export default function ErrorMessage({errorMessage, sx}: { errorMessage: string, sx?: SxProps<Theme> }) {
    return (<Box display="flex" flexDirection="row" justifyContent="center" sx={sx}>
        <ErrorOutlineIcon fontSize="large"/>
        <Typography variant="h6" sx={{marginLeft: 2}}>{errorMessage}</Typography>
    </Box>);
}