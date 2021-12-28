import React, {useEffect, useState} from 'react';
import {ItemColor, ShopItem} from "./ShopItem";
import {Col, Container, Form, Row} from "react-bootstrap";
import {ListItemComponent} from "./ListItemComponent";
import {DataServiceInstance} from "./DataService";
import "./MainComponent.scss";
import {CategoryItem} from "./CategoryItem";
import "./SingleItemComponent.scss";
import {useParams} from "react-router-dom";

/**
 * Состояние компоненты главная страница
 */
interface SingleCategoryState {
    items: ShopItem[];
    color: string | null;
}

/**
 * Страниуа категории
 */
export function SingleCategoryComponent() {
    let {categoryId} = useParams();
    let [state, changeState] = useState<SingleCategoryState>({
        items: [],
        color: null
    })
    if (categoryId) {
        DataServiceInstance.getItemData(categoryId).then(value => {
            changeState({
                items: value,
                color: state.color
            });
        });
    }
    useEffect(() => {
        // Один раз загружаем все товары
        if (categoryId) {
            DataServiceInstance.getItemData(categoryId).then(value => {
                changeState({
                    items: value,
                    color: state.color
                });
            });
        }
    }, [state.color]);


    let items = state.items

    return (
        <Container>
            <Row>
                {
                    items.map((item: ShopItem) => {
                        return (
                            <Col xs={3} key={item.id}>
                                <ListItemComponent item={item}/>
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    );
}
