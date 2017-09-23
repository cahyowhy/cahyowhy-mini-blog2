import React, {Component} from 'react';
import {View, ScrollView, Animated} from 'react-native';
import ThumbAvatar from './ThumbAvatar';
import {
    ListItem,
    Left,
    Thumbnail,
    Body,
    Right,
    Input,
    Icon,
    Text,
    List,
    Button,
    Content,
    Form,
    Item
} from 'native-base';
import Style from '../style/style';

export default class DrawerContent extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }

    render() {
        const DrawerStyle = [
            Style.DrawerContent, {
                transform: [
                    {translateX: this.props.animatedDrawer}
                ],
            }
        ];
        const isLoginEmpty = this.state.username.length === 0 || this.state.password.length === 0;
        const formLogIn = (<Content>
            <Form>
                <Item style={Style.formLogin.item1}>
                    <Text style={Style.formLogin.item1Text}>Log
                        In</Text>
                </Item>
                <Item style={Style.formLogin.item2}>
                    <Input placeholder="Username" onChangeText={(text) => {
                        this.setState({username: text})
                    }}/>
                </Item>
                <Item>
                    <Input secureTextEntry={true} placeholder="Password" onChangeText={(text) => {
                        this.setState({password: text})
                    }}/>
                </Item>
                <Item style={Style.formLogin.item4}>
                    <Button full style={Style.formLogin.item4Button} disabled={isLoginEmpty}
                            onPress={() => this.props.onLogin(this.state.username, this.state.password)}>
                        <Text>Log In</Text>
                    </Button>
                </Item>
            </Form>
        </Content>);
        const Drawer = (<List>
            <ListItem thumbnail>
                <Left><ThumbAvatar source={this.props.data.user.imageurl}/></Left>
                <Body>
                <Text>{this.props.data.user.name}</Text>
                <Text style={Style.fontCreatedAt}>{this.props.data.user.username}</Text>
                </Body>
                <Right/>
            </ListItem>
            <ListItem style={Style.LiDrawCont}>
                <Left>
                    <Button transparent>
                        <Icon style={Style.blackColor} name="md-text"/>
                    </Button>
                </Left>
                <Body><Text>Timeline</Text></Body>
                <Right/>
            </ListItem>
            <ListItem style={Style.LiDrawCont}>
                <Left>
                    <Button transparent>
                        <Icon style={Style.blackColor} name="md-settings"/>
                    </Button>
                </Left>
                <Body><Text>Setting</Text></Body>
                <Right/>
            </ListItem>
            <ListItem style={Style.LiDrawCont}>
                <Left>
                    <Button transparent>
                        <Icon style={Style.blackColor} name="md-information-circle"/>
                    </Button>
                </Left>
                <Body><Text>Notifications</Text></Body>
                <Right/>
            </ListItem>
            <ListItem style={Style.LiDrawCont}>
                <Left>
                    <Button transparent>
                        <Icon style={Style.blackColor} name="md-list-box"/>
                    </Button>
                </Left>
                <Body><Text>Posts</Text></Body>
                <Right/>
            </ListItem>
            <ListItem style={Style.LiDrawCont}>
                <Left>
                    <Button transparent>
                        <Icon style={Style.blackColor} name="md-images"/>
                    </Button>
                </Left>
                <Body><Text>Images</Text></Body>
                <Right/>
            </ListItem>
        </List>);

        return (
            <Animated.View style={DrawerStyle}>
                <ScrollView>
                    {this.props.isLoggedIn ? Drawer : formLogIn}
                </ScrollView>
            </Animated.View>
        );
    }
}
