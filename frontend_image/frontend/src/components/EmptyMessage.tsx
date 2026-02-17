import {Box, Theme, Typography} from "@mui/material";
import {Block} from "@mui/icons-material";
import {SxProps} from "@mui/system/styleFunctionSx";

export default function EmptyMessage({emptyMessage, sx}: { emptyMessage: string, sx?: SxProps<Theme> }) {
    return (<Box display="flex" flexDirection="row" justifyContent="center" sx={sx}>
        <Block fontSize="large"/>
        <Typography variant="h6" sx={{marginLeft: 2}}>{emptyMessage}</Typography>
    </Box>);
}