import { CreateOutlined } from "@mui/icons-material";
import { Box, Button, List, ListItem } from "@mui/material";
import React, { useState } from "react";
import { SIDEBAR_DATA } from "../config/sidebar.config";
import styled from "@emotion/styled";
import ComposeMail from "./ComposeMail";
import {useParams, NavLink} from 'react-router-dom';
import routes from "../routes/route";




const ComposeButton = styled(Button)({
  background: "#c2e7ff",
  color: "#001d35",
  padding: "16px 23px 16px 16px",
  borderRadius: 16,
  minWidth: 142,
  height: 56,
  textTransform: "none",
  display: "flex",
  justifyContent: "space-between",
});

const Container = styled(Box)({
  padding: 8,
  "& > ul": {
    padding: "10px 0 0 5px",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    '& > a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  },
  "& > ul > li > svg": {
    marginRight: 20,
  },
});

const SideBarContent = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const {type} = useParams();

  const onComposeClick = () => {
    setOpenDialog(true);
  };

  return (
    <Container>
      <Box>
        <ComposeButton onClick={() => onComposeClick()}>
          <CreateOutlined />
          Compose
        </ComposeButton>
      </Box>
      <List>
        {SIDEBAR_DATA.map((data) => (
          <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
          <ListItem style={type === data.name.toLocaleLowerCase() ? {
            backgroundColor: '#d3e3fd',
            borderRadius: '0 16px 16px 0'
          }: {}}>
            <data.icon fontSize="small" /> {data.title}
          </ListItem>
          </NavLink>
        ))}
      </List>
      <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Container>
  );
};

export default SideBarContent;
