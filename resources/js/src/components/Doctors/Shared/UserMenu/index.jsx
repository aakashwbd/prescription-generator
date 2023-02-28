import {
    Avatar,
    Button,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography,
} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState} from "react";
import {AiFillCaretDown} from "react-icons/ai";
import {BiLogOutCircle} from "react-icons/bi";
import {MdNotificationAdd, MdPassword,} from "react-icons/md";
import {SlSizeFullscreen} from "react-icons/sl";
import Images from "../../../../constants/Images";
import {useStyles} from "./styled";
import {BsFullscreenExit, GiManualMeatGrinder, SiAboutdotme} from "react-icons/all";
import useStore from "../../../../stores";
import {useNavigate} from "react-router-dom";
import {LandingUrls} from "../../../../routes/siteUrls";
import CrudDialog from "../../../Shared/CrudDialog";
import ChangePasswordForm from "../../../Landings/Auth/ChangePasswordForm";

const UserMenu = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const setToggleDialog = useStore(state => state.setToggleDialog)

    const toggleDialog = useStore(state => state.toggleDialog)
    const currentUser = useStore(state => state.currentUser)
    const logout = useStore(state => state.logout)

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const logoutHandler = () => {
        logout(()=>{navigate(LandingUrls.AUTH.LOGIN)})
    }

    const [fullScreenIcon, setFullScreenIcon] = useState(false);
    const fullScreenHandler = () => {
        if (!document.fullscreenElement) {
            setFullScreenIcon(true)
            document.documentElement.requestFullscreen();
        } else {
            setFullScreenIcon(false)
            document.exitFullscreen();
        }
    };

    return (
        <Box className={classes.wrapper}>
            <Hidden mdDown>
                <IconButton color="primary" onClick={fullScreenHandler}>
                    {!fullScreenIcon ? <SlSizeFullscreen size={20} /> : <BsFullscreenExit size={20}/>}
                </IconButton>
                <IconButton color="primary">
                    <MdNotificationAdd size={25} />
                </IconButton>
            </Hidden>
            <Button
                variant="text"
                startIcon={<Avatar src={Images.UserAvatar} alt="Avatar" />}
                endIcon={<AiFillCaretDown size={15} />}
                onClick={handleClick}
                className={classes.userBtn}
            >
                <Box className={classes.nameBox}>
                    <Typography variant="h6">{currentUser?.name}</Typography>
                    <Typography variant="body2">Active</Typography>
                </Box>
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <List className={classes.list}>
                    <ListItem button onClick={setToggleDialog}>
                        <ListItemIcon>
                            <MdPassword size={18} />
                        </ListItemIcon>
                        <ListItemText>Change Password</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <GiManualMeatGrinder size={18} />
                        </ListItemIcon>
                        <ListItemText>Watch Tutorial</ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <SiAboutdotme size={18} />
                        </ListItemIcon>
                        <ListItemText>About</ListItemText>
                    </ListItem>
                    <ListItem button onClick={logoutHandler}>
                        <ListItemIcon className="danger">
                            <BiLogOutCircle size={18} />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>
            </Popover>
            <CrudDialog
                open={toggleDialog}
                close={setToggleDialog}
                title='Change password'
            >
                <ChangePasswordForm/>
            </CrudDialog>
        </Box>
    );
};

export default UserMenu;
