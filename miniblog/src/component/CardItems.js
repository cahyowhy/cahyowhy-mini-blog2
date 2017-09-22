import React, {Component} from 'react';
import {CardItem, Button,Card, Right, Body, Left, Icon, Text} from 'native-base';
import ThumbAvatar from './ThumbAvatar';
import Style from '../style/style';

export class UserDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardItem>
                <Left>
                    <ThumbAvatar source={this.props.imageurl}/>
                </Left>
                <Body>
                <Text style={Style.cardUser[0]}>{this.props.username}</Text>
                <Text style={Style.cardUser[1]}>{this.props.created_at.split(' ')[0]}</Text>
                </Body>
                <Right/>
            </CardItem>
        );
    }
}

export class FavWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CardItem>
                <Left>
                    <Button style={Style.FavWrapper[0]} iconLeft>
                        <Icon name="md-heart-outline"></Icon>
                        <Text>Favourite</Text>
                    </Button>
                </Left>
                <Right>
                    <Text style={Style.FavWrapper[1]}>{this.props.created_at.split(' ')[0]}
                    </Text>
                </Right>
            </CardItem>
        );
    }
}

export default {
    UserDetail,
    FavWrapper
}