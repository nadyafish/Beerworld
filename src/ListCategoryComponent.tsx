import React from 'react';
import {CategoryItem} from "./CategoryItem";
import {Button, Card} from "react-bootstrap";
import "./ListCategoryComponent.scss";
import {Link} from "react-router-dom";

/**
 * Входные параметры компоненты "элемент списка на главной странице"
 */
interface ListCategoryComponentProps {
    // Товар
    item: CategoryItem;
}

/**
 * Элемент списка категорий на главной странице
 * @param props Входные параметры.
 */
export function ListCategoryComponent(props: ListCategoryComponentProps) {
    let item = props.item;

    return (
        <Card className={"block"} style={{ width: 200 }}>
            <Card.Img style={{height: 150}} variant="top" src={item.imageSrc} />
            <Card.Body>
                <Card.Title>
                    <Link to={"/category/" + item.id}>
                        {item.title}
                    </Link>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}