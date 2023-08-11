/**
 * Sidebar Component
 *
 * This component represents the sidebar with category filters.
 * Users can select categories to filter products.
 *
 * @param {Array} categories - List of available categories.
 * @param {string} selectedCategory - Currently selected category.
 * @param {Function} handleCategorySelect - Function to handle category selection.
 * @param {boolean} isDrawerOpen - Indicates whether the sidebar is open.
 * @param {Function} handleDrawerToggle - Function to toggle the sidebar.
 * @returns {React Component} - The rendered sidebar component.
 */

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