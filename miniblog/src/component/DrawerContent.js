import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Animated} from 'react-native';
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
import Dimensions from 'Dimensions';

const fullwidth = Dimensions.get('window').width;
const fullheight = Dimensions.get('window').height;
export default class DrawerContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const DrawerStyle = [
            {
                ...StyleSheet.absoluteFillObject,
                width: fullwidth * 0.8,
                backgroundColor: 'white',
                height: fullheight - 50,
                marginTop: 50,
                zIndex: 0,
                paddingTop: 8,
                paddingBottom: 8,
            }, {
                transform: [
                    {translateX: this.props.animatedDrawer}
                ],
            }
        ];

        const formLogIn = (<Content>
            <Form>
                <Item style={{borderBottomWidth: 0}}>
                    <Text style={{fontSize: 30, color: '#111', borderBottomWidth: 4, borderBottomColor: '#111'}}>Log
                        In</Text>
                </Item>
                <Item style={{marginTop: 16}}>
                    <Input placeholder="Username"/>
                </Item>
                <Item>
                    <Input placeholder="Password"/>
                </Item>
                <Item style={{borderBottomWidth: 0, marginTop: 16, paddingRight: 8}}>
                    <Button full style={{flex: 1}}><Text>Log In</Text></Button>
                </Item>
            </Form>
        </Content>);

        const Drawer = (<List>
            <ListItem>
                <Left><Thumbnail source={require('../assets/user.png')}/></Left>
                <Body stle={{margin: -20}}><Text>Cahyo</Text></Body>
                <Right/>
            </ListItem>
            <ListItem style={{borderBottomColor: 'transparent', borderBottomWidth: 0}}>
                <Left>
                    <Button transparent>
                        <Icon style={{color: '#000'}} name="md-text"/>
                    </Button>
                </Left>
                <Body><Text>Timeline</Text></Body>
                <Right/>
            </ListItem>
            <ListItem style={{borderBottomColor: 'transparent', borderBottomWidth: 0}}>
                <Left>
                    <Button transparent>
                        <Icon style={{color: '#000'}} name="md-settings"/>
                    </Button>
                </Left>
                <Body><Text>Setting</Text></Body>
                <Right/>
            </ListItem>
            <ListItem style={{borderBottomColor: 'transparent', borderBottomWidth: 0}}>
                <Left>
                    <Button transparent>
                        <Icon style={{color: '#000'}} name="md-information-circle"/>
                    </Button>
                </Left>
                <Body><Text>Notifications</Text></Body>
                <Right/>
            </ListItem>
            <ListItem style={{borderBottomColor: 'transparent', borderBottomWidth: 0}}>
                <Left>
                    <Button transparent>
                        <Icon style={{color: '#000'}} name="md-list-box"/>
                    </Button>
                </Left>
                <Body><Text>Posts</Text></Body>
                <Right/>
            </ListItem>
            <ListItem style={{borderBottomColor: 'transparent', borderBottomWidth: 0}}>
                <Left>
                    <Button transparent>
                        <Icon style={{color: '#000'}} name="md-images"/>
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
