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
      url: "https://w7.pngwing.com/pngs/825/431/png-transparent-black-wings-logo-star-wars-jedi-knight-jedi-academy-the-new-jedi-order-logo-war-emblem-monochrome-sticker-thumbnail.png"
    },
    {
      url: "https://toppng.com/uploads/preview/star-wars-logos-icons-vector-star-wars-felirat-keszites-11563023902amptothkqh.png"
    },
    {
      url: "https://e7.pngegg.com/pngimages/787/901/png-clipart-computer-icons-scalable-graphics-rebel-alliance-logo-rim-star-wars-icon.png"
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
