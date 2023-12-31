import styled from "@emotion/styled";
import { Close, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { API_URLS } from "../services/api.urls";
import useApi from '../hooks/useApi';

const dialogStyle = {
  height: "88%",
  width: "78%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0 0",
};

const Header = styled(Box)({
  padding: "10px 15px",
  display: "flex",
  justifyContent: "space-between",
  background: "#f2f6fc",
  "& > p": {
    fontSize: 14,
    fontWeight: 500,
  },
});

const RecipientsWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "0 15px",
  "& > div": {
    fontSize: 14,
    borderBottom: "1px solid #f5f5f5",
    marginTop: 10,
  },
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
});

const SendButton = styled(Button)({
  background: "#0B57D0",
  color: "#fff",
  fontWeight: 500,
  textTransform: "none",
  borderRadius: 18,
  width: 100,
});

const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmail);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  const config = {
    Host: "smtp.elasticemail.com",
    Username: "mycodehome@yopmail.com",
    Password: "8F4CB87DEFF9EF96F50DD918A0BB7ED31BD3",
    SecureToken: "8282da0a-29d5-4b38-8b17-1c8aeb324b5a",
    Port: 2525,
  };


  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };



  const sendMail = (e) => {
    e.preventDefault();

    if (window.Email) {
      window.Email.send({
        ...config,
        To: data.to,
        From: "hemant121222@gmail.com",
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert(message));
    }

    const payload = {
      to: data.to,
      from: 'hemant121222@gmail.com',
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: '',
      name: "My Code Home",
      starred: false,
      type: 'sent'
    }

    sentEmailService.call(payload);

    if (!sentEmailService.error) {
      setOpenDialog(false);
      setData({});
    } else {
      
    }

    setOpenDialog(false);
  };

  const closeComposeMail = (e) => {
    e.preventDefault();
    const payload = {
      to: data.to,
      from: 'hemant121222@gmail.com',
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: '',
      name: "My Code Home",
      starred: false,
      type: 'drafts'
    }

    saveDraftService.call(payload);

    if (!saveDraftService.error) {
      setOpenDialog(false);
      setData({});
    } else {
      
    }
  };

  const deleteMail = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close
          style={{ cursor: "pointer" }}
          fontSize="small"
          onClick={closeComposeMail}
        />
      </Header>
      <RecipientsWrapper>
        <InputBase
          placeholder="Recipients"
          name="to"
          onChange={(e) => onValueChange(e)}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
        />
      </RecipientsWrapper>

      <TextField
        multiline
        rows={15}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        name="body"
        onChange={(e) => onValueChange(e)}
      />
      <Footer>
        <SendButton onClick={(e) => sendMail(e)}>Send</SendButton>
        <DeleteOutline onClick={deleteMail} style={{ cursor: "pointer" }} />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
