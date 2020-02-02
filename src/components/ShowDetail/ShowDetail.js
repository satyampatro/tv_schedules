import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowDetail.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import MobileStepper from '@material-ui/core/MobileStepper';
import { Link } from "react-router-dom";
import { tConvert } from "../../mixins/common"


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    maxHeight: 1000
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ShowDetail(props) {
  const [state, setState] = useState({
    metadata: null
  });

  // prep variables
  const showId = props.match.params.id;
  const showMetadataDetailApi = `http://api.tvmaze.com/shows/${showId}`;
  const classes = useStyles(); // Fetch classess

  // Fetch show metadata
  useEffect(() => {
    axios.get(showMetadataDetailApi)
      .then((result) => {
        setState({ metadata: result.data })
      }).catch((e) => console.error(e));
  }, [showMetadataDetailApi])

  // Render views
  if (!state.metadata)
    return <div>Loading...</div>;
  else {
    return (
      <Card className={classes.card}>
        <CardHeader
          title={state.metadata.name}
          subheader={'Duration: ' + state.metadata.runtime + ' minutes'}
        />
        <CardMedia
          className={classes.media}
          image={state.metadata.image ? state.metadata.image.original : null}
        />
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="p">
            {state.metadata.schedule.time ? 'Airtime - ' + tConvert(state.metadata.schedule.time) : null}<br />
            {state.metadata.rating.average ? 'Rating - ' + state.metadata.rating.average + ` / 10` : null}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {state.metadata.summary}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <MobileStepper
            steps={0}
            backButton={
              <Link to="/" className="navbar-brand">
                <Button size="small"  >
                  {<KeyboardArrowLeft />}
                  Back
                </Button>
              </Link>
            }
          />
        </CardActions>
      </Card>
    );
  }
};