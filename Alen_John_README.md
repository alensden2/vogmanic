<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 

# CSCI 5709 - Assignment 3

Vogue Manic focuses on providing trendy and aesthetically appealing fashion options for
enthusiasts. It caters to a wide variety of individuals, from those on a tight budget to those
seeking the best in fashion. Additionally, Vogue Manic believes in climate change and strives
to reduce its carbon footprint by offering rent and resale options through the web platform.
This ensures that we contribute to the betterment of our planet and environment.
This project involves building a brand and the website from scratch. By utilizing modern web
development frameworks and principles, we ensure the delivery of a superior online shopping
experience. We will incorporate design principles tailored to all users for the best user
experience. The aim is to disrupt the fashion industry by providing the best fashion at
affordable rates while contributing to the planet and the environment.

* *Date Created*: 26 July 2023
* *Last Modification Date*: 26 July 2023


* *Deployed Netlify Application URL*: https://voguemaniac.netlify.app/
* *Gitlab group 11 (My Branch)*: https://git.cs.dal.ca/dhruvilp/csci-5709-grp-11/-/tree/alen-john?ref_type=heads

* *Gitlab group 11 (Main Branch)*: https://git.cs.dal.ca/dhruvilp/csci-5709-grp-11/-/tree/main?ref_type=heads


## Authors

* Alen John (al283652@dal.ca) (B00930528) - Developer

## Testing
* *Navigate to https://alen-john-assignment-web.netlify.app/*
* *The inventory page loads up, using the side panel the other pages of the admin module can be accessed* 

## Deployment
1) Clone the repository from GitLab (git.dal.cs), create a repository on GitHub/Bitbucket/GitLab (gitlab.com)
2) Push the code to the newly created repository 
3) Create a Netlify account
4) Go to the "Deploy Project" tab
5) Select the option to import from GitHub, Bitbucket, or GitLab (whichever is applicable)
6) Grant permission to Netlify for the appropriate repository
7) Click on "Deploy Site" to start the deployment process, which will deploy the app
8) Use the Netlify dashboard to change the domain name
9) Visit the deployed site at https://voguemaniac.netlify.app/

## Built With

* [Node.js](https://nodejs.org/en/docs) - The JavaScript backend
* [React.js](https://react.dev/learn) - The JavaScript frontend
* [Netlify](https://docs.netlify.com/) - The Deployment enviroment
* [NPX](https://docs.npmjs.com/cli/v7/commands/npx) - Node Package Execute, used to generate react app (npx create-react-app <app-name>)
* [Mui](https://mui.com/material-ui/getting-started/overview/) - Material UI components for all the ui components
* [React-router-dom](https://reactrouter.com/en/main) - React router for the routing between pages
## Sources Used

1) All the photos used in this app were from Adobe Stock (https://reactrouter.com/en/main)
2) The font used for the navbar organization name 'voguemanic' was from google font api (https://fonts.googleapis.com/css2?family=Lobster&display=swap)
3) Components like the navbar, side bar and the MUI cards were refered from the mui documentations, a detailed explaination of the code is below (https://mui.com/material-ui/getting-started/overview/)
4) Learnt how to iterate through a array and render that as mui cards from (https://forum.freecodecamp.org/t/iterate-a-card-component-with-properties-from-an-array-of-objects/445211/2)

### inventory.jsx
*Lines 174 - 276*

```
              <Card
                key={product.id}
                sx={{
                  maxWidth: 300,
                  marginBottom: 3,
                  height: "100%",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 200, width: 300, borderRadius: "8px" }}
                  image={product.image}
                  title={product.name}
                ></CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", marginBottom: "8px" }}
                  >
                    {product.name}
                  </Typography>
                  <List sx={{ paddingTop: 2 }}>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText primary={`Reference: ${product.ref}`} />
                    </ListItem>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText primary={`SKU: ${product.sku}`} />
                    </ListItem>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText
                        primary={`Units: ${product.remainingItems}`}
                      />
                    </ListItem>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText
                        primary={`Total Remaining items: ${product.remainingItems}`}
                      />
                    </ListItem>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText
                        primary={`Sizes Available: ${product.sizesAvailable.join(
                          ", "
                        )}`}
                      />
                    </ListItem>
                  </List>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ marginTop: 2 }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                        backgroundColor: "#f9f9f9",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "#333",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {product.price}
                    </Box>
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                    paddingTop: 1,
                  }}
                >
                  <Button
                    variant="text"
                    startIcon={<InfoIcon />}
                    onClick={onInfoClick}
                    sx={{ color: "#2196f3" }}
                  >
                    Info
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<QueryStatsIcon />}
                    onClick={onQueryStatsClick}
                    sx={{ color: "#f44336" }}
                  >
                    Query Stats
                  </Button>
                </CardActions>
              </Card>

```

The code above was created by adapting the code in [mui-card](https://mui.com/material-ui/react-card/) as shown below: 

```
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

```

- The code in [mui-card](https://mui.com/material-ui/react-card/) was implemented by... material ui to render items as a card
- [mui-card](https://mui.com/material-ui/react-card/)'s Code was used because... to achieve standard look and feel throughout the application. Material UI provides various readymade ui components for react. Developers can build on this for their application
- [mui-card](https://mui.com/material-ui/react-card/)'s Code was modified by... adding 'sx' that is modifiying padding, fonts, structure according to this application.

### inventory.jsx
*Lines 173 - 277*

```
            {products.map((product) => (
              <Card
                key={product.id}
                sx={{
                  maxWidth: 300,
                  marginBottom: 3,
                  height: "100%",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardMedia
                  sx={{ height: 200, width: 300, borderRadius: "8px" }}
                  image={product.image}
                  title={product.name}
                ></CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", marginBottom: "8px" }}
                  >
                    {product.name}
                  </Typography>
                  <List sx={{ paddingTop: 2 }}>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText primary={`Reference: ${product.ref}`} />
                    </ListItem>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText primary={`SKU: ${product.sku}`} />
                    </ListItem>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText
                        primary={`Units: ${product.remainingItems}`}
                      />
                    </ListItem>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText
                        primary={`Total Remaining items: ${product.remainingItems}`}
                      />
                    </ListItem>
                    <ListItem sx={{ paddingTop: 0, paddingBottom: 1 }}>
                      <ListItemText
                        primary={`Sizes Available: ${product.sizesAvailable.join(
                          ", "
                        )}`}
                      />
                    </ListItem>
                  </List>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ marginTop: 2 }}
                  >
                    <Box
                      sx={{
                        display: "inline-block",
                        backgroundColor: "#f9f9f9",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "#333",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {product.price}
                    </Box>
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                    paddingTop: 1,
                  }}
                >
                  <Button
                    variant="text"
                    startIcon={<InfoIcon />}
                    onClick={onInfoClick}
                    sx={{ color: "#2196f3" }}
                  >
                    Info
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<QueryStatsIcon />}
                    onClick={onQueryStatsClick}
                    sx={{ color: "#f44336" }}
                  >
                    Query Stats
                  </Button>
                </CardActions>
              </Card>
            ))}

```

The code above was created by adapting the code in [freecodecamp](https://forum.freecodecamp.org/t/iterate-a-card-component-with-properties-from-an-array-of-objects/445211/2) as shown below: 

```
<GridList
  className="team"
  key="Subheader"
  cellHeight={360}
  cols={3}
  spacing={2}
>
  { schoolList.map((school) => (
    <Grid item xs={6} sm={4}>
      <MyCard
        name={school.diveSchoolName}
        location={school.diveSchoolLovation}
      />
    </Grid>
  )}
</GridList>
 
```

- The code in [freecodecamp](https://forum.freecodecamp.org/t/iterate-a-card-component-with-properties-from-an-array-of-objects/445211/2) was implemented by... free code camp the have iterated through array and used the contents
- [freecodecamp](https://forum.freecodecamp.org/t/iterate-a-card-component-with-properties-from-an-array-of-objects/445211/2)'s Code was used because... I referred this as i did not want to render multiple mui cards for the same data.
- [freecodecamp](https://forum.freecodecamp.org/t/iterate-a-card-component-with-properties-from-an-array-of-objects/445211/2)'s Code was modified by... I stored all the mock data in a array, I then created a skeleton mui card, then i iterated through all the items in the array and displayed them.

### navbar.jsx

*Lines 82 - 108*

```
<Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{ mr: 2, ...(isOpen && { display: "none" }) }}
          >
            <MenuIcon
              sx={{
                color: "black",
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontFamily: "Lobster",
              fontSize: "1.5rem",
              color: "black",
            }}
          >
            VogueManic
          </Typography>
        </Toolbar>

```

The code above was created by adapting the code in [mui-navbar](https://mui.com/material-ui/react-app-bar/) as shown below: 

```
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}


```

- The code in [mui-navbar](https://mui.com/material-ui/react-app-bar/) was implemented by... material ui to render navbar
- [mui-navbar](https://mui.com/material-ui/react-app-bar/)'s Code was used because... to achieve standard look and feel throughout the application. Material UI provides various readymade ui components for react. Developers can build on this for their application
- [mui-navbar](https://mui.com/material-ui/react-app-bar/)'s Code was modified by... adding 'sx' that is modifiying padding, fonts, structure according to this application. I also changed the look and feel according to a fashion ecommerce website. I also used my own logo for the nav bar.



## Acknowledgments
* Prof. Mosquera and all the TAs.
* Netlify
* CSCI5709 course material from Brightspace
* GitHub
* Gitlab
* React
* Node