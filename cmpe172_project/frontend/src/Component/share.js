import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import Grid from "@material-ui/core/Grid";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import SaveIcon from "@material-ui/icons/SaveAlt";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import InfiniteScroll from "react-infinite-scroller";
import Button from "@material-ui/core/Button";
import imageArray from "./imageArray";


export const ITEMS_PER_SCROLL = 8;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: "wrap",
    transform: "translateZ(0)",
    width: "100%"
  },
  title: {
    color: "white"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
}));

export default function ImageGrid(props) {
  const classes = useStyles();
  const tileData = imageArray;
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [popOverOpen, setPopOverOpen] = useState(false);
  const [popOverData, setPopOverData] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [imageArr, setImageArr] = useState([]);
  const [ref, setRef] = useState(null);

  const handleModalClose = () => {
    setOpen(false);
    setSelectedImage({});
  };

  const imageClickHandler = tile => event => {
    setSelectedImage(tile);
    setOpen(true);
  };

  const handleClick = tile => event => {
    setAnchorEl(event.currentTarget);
    setPopOverOpen(true);
    const data = [
      {
        value: tile.author,
        label: "Author",
        format: ""
      }
    ];
    setPopOverData(data);
  };

  function handlePopOverClose() {
    setAnchorEl(null);
    setPopOverOpen(false);
  }

  const closeButtonStyles = {
    position: "absolute",
    // top: '0%',
    left: "100%",
    transform: `translate(-100%, 0%)`,
    color: "white",
    backgroundColor: "#0004"
  };
  const saveButtonStyles = {
    position: "absolute",
    // top: '0%',
    left: "100%",
    transform: `translate(-250%, 0%)`,
    color: "white",
    backgroundColor: "#0004"
  };

  const loader = (
    <div className="loader" key={0}>
      <LinearProgress />
    </div>
  );


  const loadItems = page => {
    const tempArr = tileData
      .slice((page - 1) * ITEMS_PER_SCROLL, page * ITEMS_PER_SCROLL)
      .map((tile, index) => (
        <GridListTile key={imageArr.length + index}>
          <img
            src={tile.download_url}
            alt={tile.id}
            onClick={imageClickHandler(tile)}
          />
          <GridListTileBar
            title={tile.id}
            classes={{
              root: classes.titleBar,
              title: classes.title
            }}
            actionIcon={
              <IconButton
                aria-label={`star ${tile.id}`}
                onClick={handleClick(tile)}
              >
                <InfoIcon className={classes.title} />
              </IconButton>
            }
          />
        </GridListTile>
      ));

    setImageArr([...imageArr, ...tempArr]);

    if (page * ITEMS_PER_SCROLL >= tileData.length) {
      setHasMoreItems(false);
    }
  };

  return tileData.length ? (
    <div className={classes.root}>
    <input type="file"/>
	
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleModalClose}
        maxWidth="lg"
        scroll={"body"}
        PaperComponent={"div"}
      >
        <div>
          <IconButton
            aria-label="close"
            onClick={handleModalClose}
            style={closeButtonStyles}
            size={"small"}
          >
            <CloseIcon />
          </IconButton>
          <a
            href={selectedImage.download_url}
            target={"_blank"}
            rel={"noreferrer"}
          >
            <IconButton
              aria-label="close"
              style={saveButtonStyles}
              size={"small"}
            >
              <SaveIcon />
            </IconButton>
          </a>
          <img
            src={selectedImage.download_url}
            alt={selectedImage.id}
            style={{ borderRadius: "10px" }}
          />
        </div>
      </Dialog>
      <Grid
        container
        style={{ overflow: "scroll", height: 400 }}
        ref={ref => {
          setRef(ref);
        }}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={loadItems}
          hasMore={hasMoreItems}
          loader={loader}
          useWindow={false}
          initialLoad={true}
          getScrollParent={() => ref}
          style={{ width: "100%" }}
        >
          <GridList className={classes.gridList} cols={4} rows={3} spacing={10}>
            {imageArr}
          </GridList>
        </InfiniteScroll>
      </Grid>
    </div>
  ) : (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={1} rows={2}>
        <Typography style={{ textAlign: "center", alignSelf: "center" }}>
          {"No Data"}
        </Typography>
      </GridList>
    </div>
  );
}

