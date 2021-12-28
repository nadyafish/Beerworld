import React from 'react';
import {ShopItem} from "./ShopItem";
import {Button, Card} from "react-bootstrap";
import "./ListItemComponent.scss";
import {Link} from "react-router-dom";
import {cartService} from "./CartService";
import {cartItemFromShopItem} from "./CartItem";

/**
 * Входные параметры компоненты "элемент списка на главной странице"
 */
interface ListItemComponentProps {
    // Товар
    item: ShopItem;
}

/**
 * Элемент списка товаров на главной странице
 * @param props Входные параметры.
 */
export function ListItemComponent(props: ListItemComponentProps) {
    let item = props.item;

    // Функция для обработки нажатия на кнопку "добавить в корзину"
    function addToCart(item: ShopItem) {
        cartService.addCartItem(cartItemFromShopItem(item));
    }

    return (
        <Card className={"price block"} style={{ width: 200, height: 600 }}>
            <Card.Img className={'image'}  variant="top" src={item.imageSrc} />
            <Card.Body>
                <Card.Title className={"list-item"} style={{ height: 50 }}>
                    <Link to={"/item/" + item.id}>
                        {item.title}
                    </Link>
                </Card.Title>
                <span className={"price"}><b>РУБ. {item.price}</b></span>
                <h5>  </h5>
                <div className="add-to-cart"><Button onClick={() => addToCart(item)} variant="success">В корзину</Button></div>
            </Card.Body>
        </Card>
    );
}
