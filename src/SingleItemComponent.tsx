import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {ShopItem} from "./ShopItem";
import "./SingleItemComponent.scss";
import {DataServiceInstance} from "./DataService";
import {useParams} from "react-router-dom";
import {cartService} from "./CartService";
import {cartItemFromShopItem} from "./CartItem";
import {CheckboxDescription, Description, ImageDescription, TextDescription} from "./Descriptions";
import {CommentItem} from "./CommentItem";
import {faAlignCenter} from "@fortawesome/free-solid-svg-icons";

// Состояние компоненты "Страница товара"
interface SingleItemComponentState {
    item: ShopItem | null;
    comments: CommentItem[];
    today: string;
}

/**
 * Страница товара
 */
export function SingleItemComponent() {
    // itemId из URL-адреса. Пример /item/1, itemId == 1
    let {itemId} = useParams();

    let textAreaRef = useRef<HTMLTextAreaElement>(null);

    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();

    let [state, changeState] = useState<SingleItemComponentState>({
        item: null,
        comments: [],
        today: datetime
    });

    useEffect(() => {
        // Один раз загружаем информацию о товаре
        if (itemId) {
            let itemPromise = DataServiceInstance.getItem(+itemId);

            let commentsPromise = DataServiceInstance.getAllComments(+itemId);

            Promise.all([itemPromise, commentsPromise]).then(([item, comments]) => {
                changeState({
                    item: item,
                    comments: comments,
                    today: state.today
                })
            });
        }
    }, []);

    let item = state.item;

    /**
     * Функция обработки добавления в корзину
     */
    function addToCart() {
        if (item != null) {
            cartService.addCartItem(cartItemFromShopItem(item));
        }
    }

    function renderText(desc: TextDescription) {
        return (
          <p>{desc.text}</p>
        );
    }

    function renderImage(desc: ImageDescription) {
        return (
          <img className="description-image" src={desc.imageSrc}/>
        );
    }

    function renderDescriptions(descriptions: Description[]) {
        if (!descriptions) {
            return (<div></div>);
        }

        return descriptions.map((description: Description) => {
            if (description.type === "text") {
                return renderText(description as TextDescription);
            } else if (description.type === "image") {
                return renderImage(description as ImageDescription);
            }
        });
    }

    async function submitComment() {
        let current: HTMLTextAreaElement | null = textAreaRef.current;

        if (!current) {
            return;
        }

        let textContent = current.value;

        if (!textContent) {
            return;
        }

        let itemId = state.item?.id;

        if (!itemId) {
            return;
        }

        await DataServiceInstance.submitComment(itemId, textContent, state.today);

        current.value = "";

        state.comments.push({
            text: textContent,
            shopItemId: 0,
            today: state.today
        });

        changeState({
            ...state,
            comments: state.comments
        });
    }

    /**
     * Отрисовка элемента
     * @param item
     */
    function renderItem(item: ShopItem | null) {
        if (!item) {
            return (<div></div>);
        }

        return (
            <Container>
                <Row>
                    <Col>
                        <img className={"item-image"} style={{height: 400}} src={item.imageSrc}/>
                    </Col>
                    <Col>
                        <h1>{item.title}</h1>
                        <p>{item.brief}</p>
                        <h5>Описание</h5>
                        {renderDescriptions(item.description)}
                        <span><b>РУБ. {item.price}</b></span>
                        <h5>  </h5>
                        <div className="w-100">
                            <div className="tar">
                                <Button onClick={() => addToCart()} variant={"success"}>В корзину</Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <div className="comment-block ">
                    {
                        state.comments.map(comment => {
                            return (
                                <Row>
                                    <Col className="comment-box">
                                        <Col>
                                            <p className="comment">{comment.text}</p>
                                        </Col>
                                        <Col>
                                            <p className="date">{comment.today}</p>
                                        </Col>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </div>

                <Row>
                    <Col>
                        <textarea className="comment-input" ref={textAreaRef}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={() => submitComment()}>Отправить комментарий</Button>
                    </Col>
                </Row>
            </Container>
        );
    }

    return renderItem(item);
}
