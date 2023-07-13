import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { GET_BADGES } from "../../queries/BadgesQueries";
import { useQuery } from "@apollo/client";
import { Button, Avatar, Alert, Snackbar } from "@mui/material";
import "./badgesStyle.css";
import { Delete, Edit } from "@mui/icons-material";

const BadgeDisplay = () => {
  const { data } = useQuery(GET_BADGES);
  const [badgeRequirements, setBadgeRequirements] = useState({});
  const [open, setOpen] = useState(false);
  const horizontal = "center";
  const vertical = "top";

  console.log(data);
  const [image, setImage] = useState([
    {
      url: "https://i.pinimg.com/736x/02/00/81/02008106afa50b933c8824616d39b3af.jpg"
    },
    {
      url: "https://www.pngkey.com/png/detail/94-943600_vinilos-paredes-star-wars-vinilo-casco-dark-vader.png"
    },
    {
      url: "https://lumiere-a.akamaihd.net/v1/images/image_09ccd4d8.jpeg"
    }
  ]);

  const handleOpen = (badge) => {
    setBadgeRequirements(badge.badges_definitions_requirements_definitions);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="badges-container-display">
      {data &&
        data.badges_definitions.map((badge, index) => {
          return (
            <Card sx={{ maxWidth: 345, margin: "auto" }} key={index}>
              <CardHeader title={badge.title} />
              <Avatar sx={{ width: 150, height: 150, margin: "auto" }}>
                <CardMedia
                  component="img"
                  image={image[index].url}
                  alt="Badges"
                />
              </Avatar>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {badge.description}
                </Typography>

                {badgeRequirements.length > 0 && (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    key={vertical + horizontal}
                    anchorOrigin={{ vertical, horizontal }}
                  >
                    <Alert
                      severity="info"
                      sx={{ width: "100%" }}
                      onClose={handleClose}
                    >
                      <Typography variant="h6">
                        <ol>
                          {badgeRequirements.map((requirement, index) => (
                            <li key={index}>{requirement.description}</li>
                          ))}
                        </ol>
                      </Typography>
                    </Alert>
                  </Snackbar>
                )}

                <center>
                  <Button onClick={() => handleOpen(badge)}>
                    Requirements
                  </Button>
                </center>
                <span
                  style={{
                    width: "300px",
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  <Button color="error" variant="outlined">
                    <Delete /> &nbsp; DELETE
                  </Button>
                  <Button variant="outlined">
                    <Edit />
                    &nbsp; EDIT
                  </Button>
                </span>
              </CardContent>
            </Card>
          );
        })}
    </div>
  );
};

export default BadgeDisplay;
