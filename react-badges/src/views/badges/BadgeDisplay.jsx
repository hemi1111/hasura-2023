import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { DELETE_BADGE, GET_BADGES } from "../../queries/BadgesQueries";
import { useQuery, useMutation } from "@apollo/client";
import { Button, Avatar, Alert, Snackbar } from "@mui/material";
import "./badgesStyle.css";
import { Delete, Edit } from "@mui/icons-material";

const BadgeDisplay = () => {
  const { data } = useQuery(GET_BADGES);
  const [deleteBadge] = useMutation(DELETE_BADGE, {
    refetchQueries: [{ query: GET_BADGES }]
  });
  const [badgeRequirements, setBadgeRequirements] = useState({});
  const [open, setOpen] = useState(false);
  const horizontal = "center";
  const vertical = "top";

  useEffect(() => {});

  const handleDeleteBadge = (id) => {
    console.log(id);
    try {
      deleteBadge({
        variables: { id }
      });
    } catch (error) {
      console.error("Error deleting badge:", error);
    }
  };
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
              <span>
                <CardHeader title={badge.title} />
                <Button onClick={() => handleOpen(badge)}>Requirements</Button>
              </span>
              <Avatar sx={{ width: 150, height: 150, margin: "auto" }}>
                <CardMedia
                  component="img"
                  image={image[index]?.url}
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
                        <center>REQUIREMENTS</center>
                        <ol>
                          {badgeRequirements.map((requirement, index) => (
                            <li key={index}>{requirement.description}</li>
                          ))}
                        </ol>
                      </Typography>
                    </Alert>
                  </Snackbar>
                )}

                <center></center>
                <span
                  style={{
                    width: "300px",
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  <Button
                    color="error"
                    onClick={() => handleDeleteBadge(badge.id)}
                  >
                    <Delete /> &nbsp; DELETE
                  </Button>
                  <Button>
                    <Edit />
                    &nbsp; UPDATE
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
