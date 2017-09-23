import React, {Component} from 'react';
import {ScrollView, View, Image} from 'react-native';
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
        const context = this;
        const onMovePostDetail = (item) => {
            return context.props.isPost ? () => context.props.onPostDetail(item) : () => false
        };

        return (
            <ScrollView style={Style.bg} onScroll={this.onScroll}>
                <List dataArray={this.props.items}
                      renderRow={(item) =>
                          <Card>
                              <UserDetail onProfile={() => this.props.onProfile(item)}
                                          imageurl={item.user.imageurl}
                                          username={item.user.username}
                                          created_at={item.user.created_at}
                              />

                              <CardItem cardBody
                                        style={this.props.isPost || this.props.isStatus ? {padding: 16} : {}} button
                                        onPress={onMovePostDetail(item)}>
                                  <Content>
                                      {this.props.isPost ?
                                          <View>
                                              <Text style={Style.postContent.title}>{item.title}</Text>
                                              <Text style={Style.postContent.detail}>{item.review}</Text>
                                          </View> :
                                          this.props.isStatus ?
                                              <Text style={Style.postContent.detail}>{item.statustext}</Text> :
                                              <Image source={{uri: item.path.url}}
                                                     style={Style.images}
                                              />
                                      }
                                  </Content>
                              </CardItem>
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