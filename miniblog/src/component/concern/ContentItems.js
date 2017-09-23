import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Text, List, Card, Icon, CardItem, Left, Body, Right, Button, Content} from 'native-base';
import Style from '../../style/style';
import {UserDetail, FavWrapper} from '../CardItems';

export default class ContentItems extends Component {
    constructor(props) {
        super(props);
        this.onScroll = this.onScroll.bind(this);
    }

    onScroll(event) {
        const nativeEvent = event.nativeEvent;
        const contentSize = nativeEvent.contentSize;
        const condition = contentSize.height - nativeEvent.layoutMeasurement.height <= nativeEvent.contentOffset.y;
        if (condition) {
            this.props.onScroll();
        }
    }

    render() {
        return (
            <ScrollView style={Style.bg} onScroll={this.onScroll}>
                <List dataArray={this.props.items}
                      renderRow={(item) =>
                          <Card>
                              <UserDetail onProfile={() => this.props.onProfile(item)}
                                          imageurl={item.user.imageurl}
                                          username={item.user.username}
                                          created_at={item.user.created_at}/>
                              {this.props.isPost &&
                              <CardItem style={{padding: 16}} button onPress={(item) => this.props.onPostDetail(item)}>
                                  <Content>
                                      <Text style={Style.postContent.title}>{item.title}</Text>
                                      <Text style={Style.postContent.detail}>{item.review}</Text>
                                  </Content>
                              </CardItem>}
                              <FavWrapper created_at={item.created_at}/>
                          </Card>
                      }>
                </List>
                {this.props.isItemsEmpty &&
                <Card style={Style.cardContentEmpty}><Text>No More item Has Been Loaded</Text></Card>}
            </ScrollView>
        );
    }
}