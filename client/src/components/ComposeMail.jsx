import React, { useState } from "react";
import {
  Dialog,
  styled,
  Typography,
  Box,
  InputBase,
  Button,
} from "@mui/material";
import { Close, DeleteOutline } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
import { toast } from 'react-hot-toast';

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: "10px 10px 0 0",
};

const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: #f2f6fc;
  & > p {
    font-size: 14px;
    font-weight: 500;
  }
`;

const RecipientWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  & > div {
    font-size: 14px;
    border-bottom: 1px solid #f5f5f5;
    margin-top: 10px;
  }
`;

const Footer = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
`;

const SendButton = styled(Button)`
  background: #0b57d0;
  color: #fff;
  font-weight: 500;
  text-transform: none;
  border-radius: 18px;
  width: 100px;
`;

const StyledTextField = styled('textarea')`
  outline: none;
  border: none;
  overflow-y: auto;
  padding: 15px;
  flex-grow: 1;
  word-wrap: break-word;
  white-space: pre-wrap;
  min-height: 0;
  max-height: calc(100% - 150px); /* Adjust this value as needed */
`;

const ComposeMail = ({ open, setOpenDrawer }) => {
  const [data, setData] = useState({});
  const sentEmailService = useApi(API_URLS.saveSentEmails);
  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  const config = {
    Username: "mycodehome@yopmail.com",
    Password: "8F4CB87DEFF9EF96F50DD918A0BB7ED31BD3",
    Host: "smtp.elasticemail.com",
    Port: 2525,
  };

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (window.Email) {
      window.Email.send({
        ...config,
        To: data.to,
        From: "hemant121222@gmail.com",
        Subject: data.subject,
        Body: data.body,
      }).then((message) => toast.success("Email sent successfully!"));
    }

    const payload = {
      to: data.to,
      from: "hemant121222@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "MyCodeHome",
      starred: false,
      type: "sent",
    };

    sentEmailService.call(payload);

    if (!sentEmailService.error) {
      setOpenDrawer(false);
      setData({});
    } else {
      toast.error("Failed to send email. Please try again.");
    }
  };

  const closeComposeMail = (e) => {
    e.preventDefault();

    const payload = {
      to: data.to,
      from: "hemant121222@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "MyCodeHome",
      starred: false,
      type: "drafts",
    };

    saveDraftService.call(payload);

    if (!saveDraftService.error) {
      setOpenDrawer(false);
      setData({});
    } else {
      toast.error("Failed to save draft. Please try again.");
    }
  };

  return (
    <Dialog open={open} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
      </Header>
      <RecipientWrapper>
        <InputBase
          placeholder="Recipients"
          name="to"
          onChange={(e) => onValueChange(e)}
          value={data.to || ""}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
          value={data.subject || ""}
        />
      </RecipientWrapper>

      <StyledTextField
        placeholder="Type your message here..."
        name="body"
        onChange={(e) => onValueChange(e)}
        value={data.body || ""}
      />
      <Footer>
        <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>
        <DeleteOutline onClick={() => setOpenDrawer(false)} />
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
