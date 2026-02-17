import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DescriptionIcon from "@mui/icons-material/Description";
import ShortTextIcon from "@mui/icons-material/ShortText";
import React, {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import appIcon from '../../public/app-icon-160x160.png';

export default function MainToolbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [drawerOpened, setDrawerOpened] = useState(false);

    const needsToolbar = !pathname.startsWith('/exam') &&
        !pathname.startsWith('/question/');

    const DrawerHeader = styled('div')(({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const getPageTitle = () => {
        let title = "Question";

        switch (pathname) {
            case '/':
                title = "Avaliações";
                break;
            case '/questions':
                title = 'Questões';
                break;
            default:
                break;
        }

        return title;
    }

    return needsToolbar && (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" sx={{mr: 2}}>
                        <MenuIcon onClick={() => setDrawerOpened(!drawerOpened)}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {getPageTitle()}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpened}
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                        },
                    }}
                    onClose={() => setDrawerOpened(false)}>
                <DrawerHeader>
                    <Box sx={{
                        display: 'flex',
                        width: '100%'
                    }}
                         justifyContent="center"
                         alignItems="center">
                        <Image src={appIcon} alt="Ícone da aplicação" width={160} height={160}/>
                    </Box>

                    <IconButton onClick={() => setDrawerOpened(false)}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    <ListItem onClick={() => {
                        router.push('/');
                        setDrawerOpened(false);
                    }}>
                        <ListItemButton selected={pathname == '/'}>
                            <ListItemIcon>
                                <DescriptionIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Avaliações
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={() => {
                        router.push('/questions');
                        setDrawerOpened(false);
                    }}>
                        <ListItemButton selected={pathname == '/questions'}>
                            <ListItemIcon>
                                <ShortTextIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                Questões
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>);
}