import React, { useEffect } from "react";
import {
//   Button,
  Card,
//   CardHeader,
  CardBody,
  CardTitle,
//   CardSubtitle,
  CardText,
} from "reactstrap";

export default function Detail({ value, setOpenModal, whatIsDone }) {

    useEffect(() => {

    }, [id])

  return (
    <Card>
      <div>
        <CardBody>
          <CardTitle>{value.title}</CardTitle>
        </CardBody>
        <img width="100%" src={value.image_url} alt={value.title} />
        <CardBody>
          <CardText>
            Ingredients : <br />
            {value.ingredients}
          </CardText>
          <CardText>
            Instructions : <br />
            {value.instructions}
          </CardText>
        </CardBody>
      </div>
    </Card>
  );
};
