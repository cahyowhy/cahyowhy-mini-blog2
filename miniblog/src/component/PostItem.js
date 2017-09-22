import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Text, List, Card, Icon, CardItem, Left, Body, Right, Button, Content} from 'native-base';
import PostService from '../services/PostService';
import Style from '../style/style';
import {UserDetail, FavWrapper} from './CardItems';

export default class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            offset: 0,
            limit: 9,
            isPostsEmpty: true,
            showUserImage: true
        };
        this.onScrollPost = this.onScrollPost.bind(this);
        this.onMovePostDetail = this.onMovePostDetail.bind(this);
        this.doRequest = this.doRequest.bind(this);
    }

    async onScrollPost(event) {
        const nativeEvent = event.nativeEvent;
        const contentSize = nativeEvent.contentSize;
        const condition = contentSize.height - nativeEvent.layoutMeasurement.height <= nativeEvent.contentOffset.y;
        if (condition) {
            this.setState({
                offset: this.state.offset + this.state.limit
            });
            const param = {
                offset: this.state.offset,
                limit: this.state.limit,
                category: this.props.category
            };
            this.doRequest(param)
        }
    }

    onMovePostDetail(item) {
        this.props.onMovePostDetail(item)
    }

    async doRequest(param) {
        const {data} = await new PostService(null).get(param)
        if (data) {
            this.setState({
                posts: this.state.posts.concat(data),
                isPostsEmpty: data.length === 0
            });
        } else {
            this.setState({
                isPostsEmpty: true
            });
        }
    }

    async componentWillMount() {
        const param = {
            offset: this.state.offset,
            limit: this.state.limit,
            category: this.props.category
        };
        this.doRequest(param);
    }

    render() {
        const onPress = (item) => {
            return () => this.onMovePostDetail(item)
        };
        const source = (imageurl) => {
            return this.state.showUserImage ? {uri: `http://res.cloudinary.com/dxdelmsib/${imageurl}`} : require('../assets/user.png')
        };

        return (
            <ScrollView style={{backgroundColor: '#eaeaea'}} onScroll={this.onScrollPost}>
                <List dataArray={this.state.posts}
                      renderRow={(item) =>
                          <Card>
                              <UserDetail imageurl={item.user.imageurl}
                                          username={item.user.username}
                                          created_at={item.user.created_at}/>
                              <CardItem style={{padding: 16}} button onPress={onPress(item)}>
                                  <Content>
                                      <Text style={{
                                          color: '#111',
                                          marginBottom: 8,
                                          fontSize: 18,
                                          fontWeight: '700'
                                      }}>
                                          {item.title}
                                      </Text>
                                      <Text style={{
                                          textAlign: 'justify',
                                          color: '#555',
                                          fontWeight: '300'
                                      }}>{item.review}</Text>
                                  </Content>
                              </CardItem>
                              <FavWrapper created_at={item.created_at}/>
                          </Card>
                      }>
                </List>
                {this.state.isPostsEmpty &&
                <Card style={Style.cardContentEmpty}><Text>No More item Has Been Loaded</Text></Card>}
            </ScrollView>
        );
    }
}