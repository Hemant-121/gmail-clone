import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
import { Box, List, Checkbox } from '@mui/material';
import Email from './Email';
import { DeleteOutline } from '@mui/icons-material';
import NoMails from './common/NoMails';
import { EMPTY_TABS } from '../constants/constant';

const Emails = () => {
    const [starredEmail, setStarredEmail] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);

    const { openDrawer } = useOutletContext();
    const { type } = useParams();

    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const deleteEmailsService = useApi(API_URLS.deleteEmails);
    const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);

    useEffect(() => {
        getEmailsService.call({}, type);
        return () => setSelectAllChecked(false);
    }, [type, starredEmail]);

    const selectAllEmails = (e) => {
        setSelectAllChecked(e.target.checked);
        if (e.target.checked) {
            const emails = getEmailsService?.response?.map(email => email._id);
            setSelectedEmails(emails);
        } else {
            setSelectedEmails([]);
        }
    };

    const deleteSelectedEmails = () => {
        if (type === 'bin') {
            deleteEmailsService.call(selectedEmails);
        } else {
            moveEmailsToBin.call(selectedEmails);
        }
        setSelectedEmails([]);
        setStarredEmail(prevState => !prevState);
        setSelectAllChecked(false); 
    };

    return (
        <Box style={openDrawer ? { marginLeft: 250, width: '100%' } : { width: '100%' } }>
            <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox
                    size="small"
                    onChange={(e) => selectAllEmails(e)}
                    checked={selectAllChecked}
                />
                <DeleteOutline onClick={() => deleteSelectedEmails()} />
            </Box>
            <List>
                {
                    getEmailsService?.response?.map(email => (
                        <Email 
                            email={email} 
                            key={email._id}
                            setStarredEmail={setStarredEmail} 
                            selectedEmails={selectedEmails}
                            setSelectedEmails={setSelectedEmails}
                        />
                    ))
                }
            </List> 
            {
                getEmailsService?.response?.length === 0 &&
                    <NoMails message={EMPTY_TABS[type]} />
            }
        </Box>
    );
};

export default Emails;
