import React from "react";
import { ListItem, Checkbox, Typography, Box, styled } from "@mui/material";
import { StarBorder, Star } from "@mui/icons-material";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
import { useNavigate } from "react-router-dom";
import routes from "../routes/route";

const Wrapper = styled(ListItem)`
  padding: 0 0 0 10px;
  background: #f2f6fc;
  cursor: pointer;
  & > div {
    display: flex;
    width: 100%;
  }
  & > div > p {
    font-size: 14px;
  }
`;

const ScrollableContent = styled(Box)`
  overflow: auto;
  max-height: 150px; // Set your desired max height here
`;

const Date = styled(Typography)`
  marginLeft: auto;
  marginRight: 20;
  fontSize: 12;
  color: #5f6368;
`;

const Email = ({
  email,
  setStarredEmail,
  selectedEmails,
  setSelectedEmails,
}) => {
  const toggleStarredEmailService = useApi(API_URLS.toggleStarredMails);
  const navigate = useNavigate();

  const toggleStarredEmail = () => {
    toggleStarredEmailService.call({ id: email._id, value: !email.starred });
    setStarredEmail((prevState) => !prevState);
  };

  const handleChange = () => {
    if (selectedEmails.includes(email._id)) {
      setSelectedEmails((prevState) =>
        prevState.filter((id) => id !== email._id)
      );
    } else {
      setSelectedEmails((prevState) => [...prevState, email._id]);
    }
  };

  const truncatedSubject = email.subject.slice(0, 100);

  return (
    <Wrapper>
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={() => handleChange()}
      />
      {email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: 10, color: "#E5BF4C" }}
          onClick={() => toggleStarredEmail()}
        />
      ) : (
        <StarBorder
          fontSize="small"
          style={{ marginRight: 10 }}
          onClick={() => toggleStarredEmail()}
        />
      )}
      <ScrollableContent
        onClick={() =>
          navigate(routes.view.path, { state: { email: email } })
        }
      >
        <Typography style={{ overflow: "hidden", width: 200, height: 20 }}>
          To: {email.to.split("@")[0]}
        </Typography>
        <Typography style={{ overflow: "hidden", height: 20 }}>
          {truncatedSubject.length < email.subject.length
            ? `${truncatedSubject}...`
            : truncatedSubject}
        </Typography>
        <Date>
          {new window.Date(email.date).getDate()}&nbsp;
          {new window.Date(email.date).toLocaleString("default", {
            month: "long",
          })}
        </Date>
      </ScrollableContent>
    </Wrapper>
  );
};

export default Email;
