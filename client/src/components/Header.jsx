import {AppBar, Box, InputBase, Toolbar, styled} from '@mui/material';
import { AccountCircleOutlined, AppsOutlined, HelpOutlineOutlined, Menu as MenuIcon, Search, SettingsOutlined, Tune } from '@mui/icons-material';
import { gmailLogo } from '../constants/constant';


const Header = ({toggleDrawer}) =>{

    const StyledAppBar = styled(AppBar)({
        background:'#F5F5F5',
        boxShadow: 'none'
    })

    const SearchWrapper = styled(Box)({
        background: '#EAF1FB',
        marginLeft: 85,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 48,
        minWidth: 690,
        maxWidth: 720,
        height:50,
        padding: '0 10px',
        '& > div': {
            width: '100%',
            padding: '0 10px'
        }
    })

    const OptionWrapper = styled(Box)({
        width:'100%',
        display: 'flex',
        justifyContent: 'end',
        '& > svg': {
            marginLeft: 20
        }
    })

    return (
        <StyledAppBar position='static'>
            <Toolbar>
                <MenuIcon color ="action" onClick={toggleDrawer} style={{cursor: 'pointer'}} />
                <img src={gmailLogo} alt="logo" style={{ width: 110, marginLeft:15, cursor: 'pointer' }} />
                <SearchWrapper>
                    <Search color='action'  />
                    <InputBase placeholder="Search Mail" />
                    <Tune color='action' />
                </SearchWrapper>
                <OptionWrapper>
                    <HelpOutlineOutlined color='action'/>
                    <SettingsOutlined color='action'/>
                    <AppsOutlined color='action' />
                    <AccountCircleOutlined color='action' />
                </OptionWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}
export default Header;