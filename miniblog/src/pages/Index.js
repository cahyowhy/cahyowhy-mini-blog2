import React from 'react';
import {
    Container,
    Header,
    Tab,
    Tabs,
    ScrollableTab,
    Text,
    Body,
    Left,
    Right,
    Icon,
    Button
} from 'native-base';
import Style from '../style/style';
import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import PostService from '../services/PostService';
import LoginService from '../services/LoginService';
import PostItem from  '../component/PostItem';
import {StackNavigator} from "react-navigation";
import DrawerContent from '../component/DrawerContent';
import Dimensions from 'Dimensions';
import Auth from '../storage/Auth';
import BaseMethod from './concern/BaseMethod';

const fullwidth = Dimensions.get('window').width;
export default class Index extends BaseMethod {
    constructor(props) {
        super(props);
        this.state = {
            postCategories: [],
            isDrawerOpened: false,
            isLoggedIn: false,
            data: {
                user: {
                    id: '',
                    name: '',
                    username: '',
                    imageurl: ''
                }
            }
        };
        this.onLogin = this.onLogin.bind(this);
        this.toggleNavDrawer = this.toggleNavDrawer.bind(this);
        this.animatedDrawer = new Animated.Value(-fullwidth * 0.8);
    }

    async onLogin(username, password) {
        const {data} = await new LoginService(null).store({username, password});
        if (data) {
            if (data.httpstatus === 204) {
                data.isLoggedIn = true;
                const context = this;
                Auth.setUser(data).then(() => context.setState({isLoggedIn: true}));
            }
        }
    }

    toggleNavDrawer() {
        if (this.state.isDrawerOpened) {
            Animated.spring(this.animatedDrawer, {
                toValue: -fullwidth * 0.8
            }).start();
        } else {
            Animated.spring(this.animatedDrawer, {
                toValue: 0
            }).start();
        }

        this.setState({
            isDrawerOpened: !this.state.isDrawerOpened
        });
    }

    async componentWillMount() {
        const {data} = await new PostService(null).get("/categories/all");
        const context = this;
        Auth.isUserLoggedIn().then((result) => context.setState({isLoggedIn: result}));
        Auth.getUser().then((result) => context.setState({data: result}));
        if (data) {
            this.setState({
                postCategories: data
            })
        }
    }

    render() {
        return (
            <Container>
                <Header hasTabs style={{backgroundColor: 'white'}}>
                    <Left>
                        <Button transparent onPress={() => this.toggleNavDrawer()}>
                            <Icon style={Style.blackColor} name="md-menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text style={[Style.textHeader, Style.blackColor]}>Mini Blog</Text>
                    </Body>
                    <Right/>
                </Header>
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    {this.state.postCategories.map((item, index) => {
                        return <Tab key={index} style={Style.TabItemTop} heading={item.name}>
                            <PostItem
                                onMoveProfile={this.onMoveProfile}
                                category={item.value}
                                onMovePostDetail={this.onMovePostDetail}/>
                        </Tab>
                    })}
                </Tabs>
                <DrawerContent onLogin={this.onLogin}
                               animatedDrawer={this.animatedDrawer}
                               data={this.state.data}
                               onMoveProfile={this.onMoveProfile}
                               isLoggedIn={this.state.isLoggedIn}/>
            </Container>
        );
    }
}

Index.navigationOptions = ({navigation}) => ({
    header: null
});