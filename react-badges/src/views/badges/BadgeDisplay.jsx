import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GET_BADGES } from "../../queries/BadgesQueries";
import { useQuery } from "@apollo/client";
import { Button } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

const BadgeDisplay = () => {
  const { data } = useQuery(GET_BADGES);

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

  console.log(image);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="badges-container-display">
      {data &&
        data.badges_definitions.map((badge, index) => {
          return (
            <Card sx={{ maxWidth: 345, margin: "auto" }} key={index}>
              <CardHeader title={badge.title} />
              <CardMedia
                component="img"
                image={image[index].url}
                alt="Badges"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {badge.description}
                </Typography>
                <center>
                  <Button>EDIT</Button>
                </center>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    Created At: {badge.created_at}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
    </div>
  );
};

export default BadgeDisplay;
