import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

export default function MaterialDemo() {
  return (
    <div>
      <canvas style={{ backgroundColor: "black", width: 400, position: 'absolute' }} />
      <canvas style={{ backgroundColor: "yellow" }} />
      <canvas style={{ backgroundColor: "green" }} />
      <canvas style={{ backgroundColor: "blue" }} />
      <canvas style={{ backgroundColor: "orange" }} />
      <canvas style={{ backgroundColor: "grey" }} />
    </div>
  );
}
