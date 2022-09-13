import React, { useEffect, useState } from "react";
import {
  Card,
  CardTitle,
  // CardSubtitle,
  CardBody,
  CardText,
  Modal,
  // ModalHeader,
  ModalBody,
  Button,
  Row,
} from "reactstrap";
import "../scss/stylesheet.scss";

import Header from "../header";
import Detail from "../catalog";

export default function Catalog() {
  const [recipeList, setRecipeList] = useState([]);
  const [recipe, setRecipe] = useState({});
  const [openRecipeModal, setOpenRecipeModal] = useState(false);

  const handleDetail = (id) => {
    setRecipe(id)
    setOpenRecipeModal(true);
  }

  useEffect(() => {
    const recipeList = [
      {
        id: 1,
        title: "Soft Boiled Egg",
        sumarry: "Beautiful and soft boiled egg with yellow yolk",
        ingredients: "egg, water",
        instructions:
          "put water into a pot, boil an egg in the water for about 20 minutes, pick the egg",
        source_url: "https://cookieandkate.com/thai-green-curry-with-spring-vegetables/",
        image_url: "https://cookieandkate.com/images/2015/03/thai-green-curry-recipe-2-550x757.jpg",
      },
      {
        id: 2,
        title: "Soft Boiled Egg",        
        sumarry: "Beautiful and soft boiled egg with yellow yolk",
        ingredients: "egg, water",
        instructions:
          "put water into a pot, boil an egg in the water for about 20 minutes, pick the egg",
        source_url: "https://www.bakerita.com/no-bake-raspberry-chocolate-tart-paleo-vegan-gf/",
        image_url: "https://www.bakerita.com/wp-content/uploads/2015/06/Chocolate-Raspberry-Tart.jpg",
      },
    ];
    setRecipeList(recipeList);
  }, []);

  return (
    <body className="body">
      <Header />
      <div style={{ margin: "100px 100px" }}>
        <h3>The Recipes</h3>
      </div>
      <div style={{ margin: "120px 120px" }}>
        <Row>
          {recipeList.map((value, index) => (
            <Card className="recipe-card"
              style={{
                width: "18rem"
              }}
            >
              <img alt={value.title} src={value.image_url} />
              <CardBody className="recipe-card">
                <CardTitle tag="h5">{value.title}</CardTitle>
                {/* <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle> */}
                <CardText>
                  {value.summary}
                </CardText>
                <Button color="success" onClick={() => handleDetail(value.id)}>View Recipe</Button>
              </CardBody>
            </Card>
          ))}
        </Row>
        {/* recipe detail modal */}
        <Modal isOpen={openRecipeModal} toggle={() => setOpenRecipeModal(!openRecipeModal)}>
          <ModalBody>
            <Detail recipe={recipe} setOpenModal={setOpenRecipeModal} />
          </ModalBody>
        </Modal>
      </div>
    </body>
  );
}
