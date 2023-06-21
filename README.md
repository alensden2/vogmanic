<!--- The following README.md sample file was adapted from https://gist.github.com/PurpleBooth/109311bb0361f32d87a2#file-readme-template-md by Gabriella Mosquera for academic use ---> 

# CSCI 5709 Grp-11

Vogmanic aspires to be a niche platform that targets a smaller audience base while giving the impression that the application was handcrafted specifically to meet their needs. To make our users feel special, we aim to make fashion simple, affordable, and appealing. We would like to reduce the carbon footprint by allowing users to rent and resell their fashion wardrobe, giving them the impression that they are helping to improve the planet and environment. 

* *Date Created*: 19 Jun 2023
* *Last Modification Date*: 20 Jun 2023
* *Deployed app*: <https://vogmanic.netlify.app/>
* *Git URL (main)*: <https://git.cs.dal.ca/dhruvilp/csci-5709-grp-11>   

## Authors
* [Alen John](al283652@dal.ca) - *Developer*
* [Dhruvil Patel](dh828824@dal.ca) - *Developer*
* [Krishna Modi](kr733081@dal.ca) - *Developer*
* [Srishti Jain](sr381365@dal.ca) - *Developer*
* [Taksh Doria](tk517822@dal.ca) - *Developer*

## Deployment 

### `git clone <repo_name>`

This clones the repository from GitLab to GitHub. create a repository on GitHub/Bitbucket/GitLab (gitlab.com).
This step is essential to deploy to netlify.

### `git push <new_repo_name>`

This pushes the code to the newly created repository. Using this repository this app can be deployed to netlify. This app is currently deployed at https://vogmanic.netlify.app/.

## Local Testing 


### `git clone <repo_name>`

This clones the repository from GitLab to the local machine.

### `npm install`
After navigating to the directory of the cloned project, Run this command to install all dependencies.

### `npm start`
Run the app using this command and navigate to http://localhost:3000.

## Built With

* [Node.js](https://nodejs.org/en/docs) - The JavaScript backend
* [React.js](https://react.dev/learn) - The JavaScript frontend
* [Netlify](https://docs.netlify.com/) - The Deployment enviroment
* [NPX](https://docs.npmjs.com/cli/v7/commands/npx) - Node Package Execute, used to generate react app (npx create-react-app <app-name>)
* [Mui](https://mui.com/material-ui/getting-started/overview/) - Material UI components for all the ui components
* [React-router-dom](https://reactrouter.com/en/main) - React router for the routing between pages
* [google-fonts-api](https://developers.google.com/fonts/docs/developer_api) - Used for the logo font
* [Pexels](https://www.pexels.com/) - The copyright free stock images used for this website

## Sources Used

1) Used Google fonts for the logo - https://developers.google.com/fonts/docs/developer_api
2) Used the open source pictures from - https://www.pexels.com/

### navbar.js
*Lines 64 - 158*

```
<AppBarStyled
          position="fixed"
          open={isOpen}
          sx={{
            backgroundColor: "white",
            transform: trigger ? "translateY(-100%)" : "translateY(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              edge="start"
              sx={{ mr: 2, ...(isOpen && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: "Lobster",
                fontSize: "1.5rem",
                color: "black",
                flexGrow: 1,
                cursor: "pointer",
              }}
              onClick={() => handleNavigation("/")}
            >
              VogueManic
            </Typography>
            <Hidden mdDown>
              <Stack direction="row" spacing={2}>
                <IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/contact")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    Contact Us
                  </Typography>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/faq")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    FAQs
                  </Typography>
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={() => handleNavigation("/store")}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: 500,
                    }}
                  >
                    Store
                  </Typography>
                </IconButton>
              </Stack>
            </Hidden>
            <Hidden lgUp>
              <IconButton
                color="inherit"
                aria-label="open mobile menu"
                onClick={handleMobileMenuOpen}
                sx={{ ml: "auto", color: "black" }}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBarStyled>

```

The code above was created by adapting the code in [MUI-Navbar](https://mui.com/material-ui/react-app-bar/) as shown below: 


```
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
          fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
          aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
          cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
          at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
          Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
          numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
          asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
          assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
          soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
          ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
          soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
          Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
          delectus quo eius exercitationem tempore. Delectus sapiente, provident
          corporis dolorum quibusdam aut beatae repellendus est labore quisquam
          praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
          deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
          fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
          recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
          debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
          praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
          voluptate iure labore, repellendus beatae quia unde est aliquid dolor
          molestias libero. Reiciendis similique exercitationem consequatur, nobis
          placeat illo laudantium! Enim perferendis nulla soluta magni error,
          provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
          iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
          reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
          cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
          consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
          Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
        </Typography>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;

```

- <!---How---> The code in [MUI-Navbar](https://mui.com/material-ui/react-app-bar/) was implemented by... material UI to render responsive navbars
- <!---Why---> [MUI-Navbar](https://mui.com/material-ui/react-app-bar/)'s Code was used because... to achieve standard look and feel throughout the application. Material UI provides various readymade ui components for react. Developers can build on this for their application
- <!---How---> [MUI-Navbar](https://mui.com/material-ui/react-app-bar/)'s Code was modified by... adding 'sx' that is modifiying padding, fonts, structure according to this application. I also changed the color to my design to improve the UI for my app


### faq.jsx

*Lines 170 - 190*

```
<Paper
                        component="form"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                            borderRadius: "999px",
                            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <IconButton sx={{ p: 1 }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder="Search questions"
                            inputProps={{ "aria-label": "search questions" }}
                            sx={{ ml: 1, flex: 1 }}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Paper>
```

The code above was created by adapting the code in [MUI-Paper](https://mui.com/material-ui/react-paper/) as shown below: 

```
<Paper elevation={0} />
<Paper />
<Paper elevation={3} />
```

- <!---How---> The code in [MUI-Paper](https://mui.com/material-ui/react-paper/) was implemented by... material UI to render responsive layers
- <!---Why---> [MUI-Paper](https://mui.com/material-ui/react-paper/)'s Code was used because... to achieve standard look and feel throughout the application. Material UI provides various readymade ui components for react. Developers can build on this for their application

- <!---How---> [MUI-Paper](https://mui.com/material-ui/react-paper/)'s Code was modified by... adding 'sx' that is modifiying padding, fonts, structure according to this application. I also changed the color to my design to improve the UI for my app


### ContactPage.jsx

*Lines 76 - 93*

```
<TextField
        label="Email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        helperText={emailError ? "Invalid email" : ""}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Message"
        value={message}
        onChange={handleMessageChange}
        multiline
        fullWidth
        margin="normal"
        required
      />
```

The code above was created by adapting the code in [MUI-textfield](https://mui.com/material-ui/react-text-field/) as shown below: 

```
<TextField id="outlined-basic" label="Outlined" variant="outlined" />
<TextField id="filled-basic" label="Filled" variant="filled" />
<TextField id="standard-basic" label="Standard" variant="standard" />
```

- <!---How---> The code in [MUI-textfield](https://mui.com/material-ui/react-text-field/) was implemented by... material UI to render responsive text fields

- <!---Why---> [MUI-textfield](https://mui.com/material-ui/react-text-field/)'s Code was used because... to achieve standard look and feel throughout the application. Material UI provides various readymade ui components for react. Developers can build on this for their application

- <!---How---> [MUI-textfield](https://mui.com/material-ui/react-text-field/)'s Code was modified by... adding various event handler to handle the contact us form.


### home.jsx

*Lines 13 - 29*

```
useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const imageBottomPosition =
        imageRef.current.offsetTop + imageRef.current.offsetHeight;

      if (scrollPosition >= imageBottomPosition) {
        console.log("Reached image bottom");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

```

The code above was created by adapting the code in [codesandbox](https://codesandbox.io/s/react-scroll-navbar-z76ig?file=/src/App.js:0-745) as shown below: 

 
```
const imgMyimageexample = require('../assets/imageexample.jpg');
const divStyle = {
  width: '88%',
  height: '800px',
  backgroundImage: `url(${imgMyimageexample})`,
  backgroundSize: 'cover'   <---- This is important
};

export default class Mycomponent extends React.Component {
  render() {
    return (
      <div className="cComponent" style={divStyle} >
        <h1 align="center">Some header example</h1>
      </div>
    );
  }
}
```

- <!---How---> The code in [codesandbox](https://codesandbox.io/s/react-scroll-navbar-z76ig?file=/src/App.js:0-745) was implemented by... codesandbox to showcase how to colapse the navbar using scroll trigger 
- <!---Why---> [codesandbox](https://codesandbox.io/s/react-scroll-navbar-z76ig?file=/src/App.js:0-745)'s Code was used because... to understand how to colapse navbar using scroll.
- <!---How---> [codesandbox](https://codesandbox.io/s/react-scroll-navbar-z76ig?file=/src/App.js:0-745)'s Code was modified by... using my own implementation of the explained method, I used a use Effect trigger to trigger an event upon the scroll function.


## Acknowledgments
* Prof. Mosquera and all the TAs.
* Netlify
* CSCI5709 course material from Brightspace
* Stackoverflow
* GitHub
* Gitlab
* React
* Node
* codesandbox
* Pexels

