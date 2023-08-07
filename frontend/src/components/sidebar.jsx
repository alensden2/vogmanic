import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import React from 'react';

const Sidebar = ({ categories, selectedCategory, handleCategorySelect, isDrawerOpen, handleDrawerToggle }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isDrawerOpen}
      sx={{
        width: '250px',
        flexShrink: 0,
      }}
    >
      <List>
        {categories.map((category) => (
          <ListItem
            key={category}
            button
            selected={selectedCategory === category}
            onClick={() => handleCategorySelect(category)}
          >
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          right: '0',
        }}
      >
        {isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Drawer>
  );
};

export default Sidebar;
