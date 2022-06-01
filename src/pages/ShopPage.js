import { ShopModule } from "../components/ShopModule";
import { AuthorisedPage } from "./AuthorisedPage";
import { Backdrop, Divider, IconButton, styled } from "@mui/material";
import { Navbar } from "../components/NavBar";
import { setBasketOpened } from "../store/slice/shop";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const StyledListItemButton = styled(ListItemButton)`
  width: 221px;

  &:hover {
    background: #1976d2;
  }

  ${({ active }) =>
    active && {
      background: "#1976D2",
      color: "white",
    }}
`;

const CategoryList = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <>
      <List
        sx={{
          paddingRight: "12px",
          paddingTop: 0,
          maxHeight: "100%",
          overflow: "auto",
        }}
        component="div"
        disablePadding
      >
        {categories.map((category) => (
          <>
            <StyledListItemButton
              sx={{ pl: 4 }}
              key={category.id}
              onMouseEnter={() => {
                setSelectedCategory(category);
              }}
              active={category === selectedCategory}
            >
              <ListItemText primary={category.name} />
            </StyledListItemButton>
            <Divider />
          </>
        ))}
      </List>
      {selectedCategory && selectedCategory.childCategories && (
        <CategoryList
          key={selectedCategory.id}
          categories={selectedCategory.childCategories}
        />
      )}
    </>
  );
};

export const ShopPage = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.shop);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <AuthorisedPage>
      <Navbar
        title="E-stroi.kz"
        sx={{ mb: 2 }}
        rightContent={
          <IconButton
            color="inherit"
            size="large"
            onClick={() => dispatch(setBasketOpened(true))}
          >
            <ShoppingBasketIcon />
          </IconButton>
        }
        leftContent={
          <div>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Каталог" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Backdrop open={open} onClick={() => setOpen(false)} />
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{
                position: "absolute",
                background: "white",
                color: "black",
                border: "1px solid #1976D2",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <div>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <div
                      style={{
                        display: "flex",
                        maxHeight: "500px",
                        overflowY: "auto",
                      }}
                    >
                      <CategoryList categories={categories} />
                    </div>
                  </Collapse>
                </div>
              </div>
            </Collapse>
          </div>
        }
      />
      <div>
        <ShopModule />
      </div>
    </AuthorisedPage>
  );
};
