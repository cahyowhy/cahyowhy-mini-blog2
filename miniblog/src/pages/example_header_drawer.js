import React, {Component} from 'react';
import {
    Header,
    Left,
    Body,
    Button,
    List,
    Icon,
    Title,
    Content,
    ListItem,
    Text,
    Right
} from 'native-base';
import {View, Animated, Transform, TouchableWithoutFeedback} from 'react-native';
import Style from '../style/style';
import Dimensions from 'Dimensions';
const fullwidth = Dimensions.get('window').width;
const fullheight = Dimensions.get('window').height;

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transform: [{translateX: new Animated.Value(0)}],
            listMenu: [
                {
                    title: 'Category', icon: 'md-book', child: [
                    {title: "uncategorized", icon: "md-book"},
                    {title: "sains", icon: "md-book"},
                    {title: "komedi", icon: "md-book"},
                    {title: "sejarah", icon: "md-book"},
                    {title: "gosip", icon: "md-book"},
                    {title: "puisi", icon: "md-book"},
                    {title: "pribadi", icon: "md-book"},
                    {title: "mistis", icon: "md-book"},
                    {title: "berita", icon: "md-book"},
                    {title: "teknologi", icon: "md-book"},
                ]
                },
                {
                    title: 'Profile', icon: 'md-person', child: [
                    {title: "Status", icon: "md-paper"},
                    {title: "Post", icon: "md-book"},
                    {title: "Images", icon: "md-albums"},
                    {title: "Setting", icon: "md-build"},
                ]
                },
                {title: 'LogOut', icon: 'md-log-out', child: []}
            ],
            isItemOpened: []
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.toggleCategoryItem = this.toggleCategoryItem.bind(this);
    }

    componentWillMount() {
        this.isDrawerOpened = false;
        this.animatedDrawerValue = new Animated.Value(-fullwidth * 0.8);
        let categoryItemOpened = [];
        let animatedItemValue = [];
        this.state.listMenu.forEach(function () {
            categoryItemOpened.push(false)
            animatedItemValue.push(new Animated.Value(0))
        });

        this.setState({isItemOpened: categoryItemOpened})
        this.animatedCategoryDrawerValue = animatedItemValue;
    }

    toggleCategoryItem(param) {
        let isItemOpened = [];
        this.state.isItemOpened.forEach(function(item, index){
            parseInt(index)===parseInt(param) ? isItemOpened.push(!item) : isItemOpened.push(item)
        });
        this.setState({
            isItemOpened: isItemOpened
        });
        console.log(this.state.isItemOpened)

        if (this.state.isItemOpened[param]) {
            Animated.spring(this.animatedCategoryDrawerValue[param], {
                toValue: 0
            }).start();
        } else {
            Animated.spring(this.animatedCategoryDrawerValue[param], {
                toValue: 1
            }).start();
        }
    }

    toggleDrawer() {
        this.isDrawerOpened = !this.isDrawerOpened;

        if (this.isDrawerOpened) {
            Animated.spring(this.animatedDrawerValue, {
                toValue: -fullwidth * 0.8
            }).start();
        } else {
            Animated.spring(this.animatedDrawerValue, {
                toValue: 0
            }).start();
        }
    }

    render() {
        const AnimatedStyle = {
            transform: [
                {translateX: this.animatedDrawerValue}
            ]
        };

        let AnimatedItemDrawerStyle = [];
        const context = this
        this.animatedCategoryDrawerValue.forEach(function (item, index) {
            AnimatedItemDrawerStyle.push([{transform: [{scale: item}]}])
            if(!context.state.isItemOpened) AnimatedItemDrawerStyle[index].push({display: 'none'})
        });

        return (
            <View style={{flex: 1}}>
                <Animated.View style={[Style.DrawerMain, AnimatedStyle]}>
                    <Content style={Style.DrawerContent}>
                        <List>
                            <List dataArray={this.state.listMenu}
                                  renderRow={
                                      (item, sectionId, index) =>
                                          <List>
                                              <ListItem icon style={Style.borderBottomDefault}>
                                                  <Left>
                                                      <Icon name={item.icon}/>
                                                  </Left>
                                                  <Body style={Style.noBorderBottom}><Text>{item.title}</Text></Body>
                                                  {item.child.length > 0 &&
                                                  <Right>
                                                      <Button transparent onPress={() => this.toggleCategoryItem(index)}
                                                              style={[Style.noPadding, Style.noMargin]}>
                                                          <View><Icon name="md-add"/></View>
                                                      </Button>
                                                  </Right>
                                                  }
                                              </ListItem>
                                              {item.child.length > 0 &&
                                              <View style={this.state.isItemOpened[index] ? {display: 'none'} : {}}>
                                                  <Text>{this.state.isItemOpened[0] ? "dawdd":"iiii"}</Text>
                                                  <Animated.View style={AnimatedItemDrawerStyle[index]}>
                                                      <List dataArray={item.child}
                                                            renderRow={(item) =>
                                                                <ListItem style={Style.listItemNavSub}>
                                                                    <Body>
                                                                    <Text style={Style.childListTextNav}>{item.title}</Text>
                                                                    </Body>
                                                                    <Right>
                                                                        <Icon name={item.icon}/>
                                                                    </Right>
                                                                </ListItem>
                                                            }>
                                                      </List>
                                                  </Animated.View>
                                              </View>
                                              }
                                          </List>
                                  }>
                            </List>
                        </List>
                    </Content>
                </Animated.View>
                <Header>
                    <Left>
                        <Button transparent onPress={this.toggleDrawer}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>miniBlog</Title>
                    </Body>
                </Header>
            </View>
        )
    }
}