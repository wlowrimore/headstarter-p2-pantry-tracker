import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Image from "next/image";
import Hero from "../../../public/images/hero.jpg";

const HeroComponent = () => {
  return (
    <>
      <Grid
        container
        sx={{
          maxWidth: "100%",
          width: "100%",
          height: "100%",
          maxHeight: "100vh",
          margin: "1rem auto",
          display: "flex",
          justifyContent: "center",
          padding: "0 0.5rem",
        }}
      >
        <Grid
          sx={{
            width: "40%",
            color: "#D9EABE",
            padding: "0 1rem",
          }}
        >
          <Box
            sx={{
              lineHeight: "2.8rem",
              marginBottom: "1rem",
            }}
          >
            <h1 style={{ fontSize: "3rem" }}>Pantry Tracker</h1>
            <h2 style={{ fontSize: "1.7rem" }}>Pantry Management System</h2>
          </Box>
          <Box
            style={{
              width: "95%",
              color: "#E8E7C5",
              fontSize: "1.5rem",
              padding: "1rem 0 0 0",
            }}
          >
            <List
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#E8E7C5",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <TrackChangesOutlinedIcon
                    style={{ width: "2rem", height: "2rem" }}
                  />
                  <ListItemText>
                    <h3 style={{ fontWeight: "lighter", fontSize: "1.5rem" }}>
                      Track Pantry Items
                    </h3>
                  </ListItemText>
                </ListItemIcon>
                <ListItemIcon
                  sx={{
                    color: "#E8E7C5",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <AddOutlinedIcon style={{ width: "2rem", height: "2rem" }} />
                  <ListItemText>
                    <h3 style={{ fontWeight: "lighter", fontSize: "1.5rem" }}>
                      Add New Pantry Items
                    </h3>
                  </ListItemText>
                </ListItemIcon>
                <ListItemIcon
                  sx={{
                    color: "#E8E7C5",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <CloseOutlinedIcon
                    style={{ width: "2rem", height: "2rem" }}
                  />
                  <ListItemText>
                    <h3 style={{ fontWeight: "lighter", fontSize: "1.5rem" }}>
                      Remove Pantry Items
                    </h3>
                  </ListItemText>
                </ListItemIcon>
                <ListItemIcon
                  sx={{
                    color: "#E8E7C5",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <EditOutlinedIcon style={{ width: "2rem", height: "2rem" }} />
                  <ListItemText>
                    <h3 style={{ fontWeight: "lighter", fontSize: "1.5rem" }}>
                      Update Pantry List
                    </h3>
                  </ListItemText>
                </ListItemIcon>
                <ListItemIcon
                  sx={{
                    color: "#E8E7C5",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <SearchOutlinedIcon
                    style={{ width: "2rem", height: "2rem" }}
                  />
                  <ListItemText>
                    <h3 style={{ fontWeight: "lighter", fontSize: "1.5rem" }}>
                      Search For Recipes
                    </h3>
                  </ListItemText>
                </ListItemIcon>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid
          sx={{
            width: "60%",
          }}
        >
          <Image
            src={Hero}
            alt="Pantry Hero"
            width={700}
            height={500}
            style={{
              width: "100%",
              height: "100%",
              minWidth: "50%",
              minHeight: "50%",
              color: "green",
              borderRadius: "5rem",
              boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.7)",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default HeroComponent;
