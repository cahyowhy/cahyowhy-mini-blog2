import React, {Component} from 'react';
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
    Button,
    Thumbnail,
    List,
    ListItem
} from 'native-base';
import Style from '../style/style';
import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import PostService from '../services/PostService';
import PostItem from  '../component/PostItem';
import {StackNavigator} from "react-navigation";
import Dimensions from 'Dimensions';

const fullwidth = Dimensions.get('window').width;
const fullheight = Dimensions.get('window').height;
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postCategories: [],
            isDrawerOpened: false
        };
        this.onMovePostDetail = this.onMovePostDetail.bind(this);
        this.toggleNavDrawer = this.toggleNavDrawer.bind(this);
        this.animatedDrawer = new Animated.Value(-fullwidth * 0.8);
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

    onMovePostDetail(item) {
        this.props.navigation.navigate('PostDetail', item);
    }

    async componentWillMount() {
        const {data} = await new PostService(null).get("/categories/all")
        if (data) {
            this.setState({
                postCategories: data
            })
        }
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
                    {translateX: this.animatedDrawer}
                ],
            }
        ];

        return (
            <Container>
                <Header hasTabs style={{backgroundColor: 'white'}}>
                    <Left>
                        <Button transparent onPress={()=> this.toggleNavDrawer()}><Icon style={{color: '#000'}} name="md-menu"/></Button>
                    </Left>
                    <Body>
                    <Text style={[Style.textHeader, {color: '#000'}]}>Mini Blog</Text>
                    </Body>
                    <Right/>
                </Header>
                <Tabs renderTabBar={() => <ScrollableTab />}>
                    {this.state.postCategories.map((item, index) => {
                        return <Tab key={index} style={Style.TabItemTop} heading={item.name}>
                            <PostItem category={item.value} onMovePostDetail={this.onMovePostDetail}/>
                        </Tab>
                    })}
                </Tabs>
                <Animated.View style={DrawerStyle}>
                    <ScrollView>
                        <List>
                            <ListItem>
                                <Left><Thumbnail source={require('../assets/user.png')}/></Left>
                                <Body stle={{margin: -20}}><Text>Cahyo Wibowo</Text></Body>
                                <Right/>
                            </ListItem>
                            <ListItem style={{borderBottomColor: 'transparent', borderBottomWidth: 0}}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={{color: '#000'}} name="md-settings"/>
                                    </Button>
                                </Left>
                                <Body><Text>Setting</Text></Body>
                                <Right></Right>
                            </ListItem>
                            <ListItem style={{borderBottomColor: 'transparent', borderBottomWidth: 0}}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={{color: '#000'}} name="md-information-circle"/>
                                    </Button>
                                </Left>
                                <Body><Text>Notifications</Text></Body>
                                <Right></Right>
                            </ListItem>
                            <ListItem style={{borderBottomColor: 'transparent', borderBottomWidth: 0}}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={{color: '#000'}} name="md-list-box"/>
                                    </Button>
                                </Left>
                                <Body><Text>Posts</Text></Body>
                                <Right></Right>
                            </ListItem>
                            <ListItem style={{borderBottomColor: 'transparent', borderBottomWidth: 0}}>
                                <Left>
                                    <Button transparent>
                                        <Icon style={{color: '#000'}} name="md-images"/>
                                    </Button>
                                </Left>
                                <Body><Text>Images</Text></Body>
                                <Right></Right>
                            </ListItem>
                        </List>
                    </ScrollView>
                </Animated.View>
            </Container>
        );
    }
}

Index.navigationOptions = ({navigation}) => ({
    header: null
});