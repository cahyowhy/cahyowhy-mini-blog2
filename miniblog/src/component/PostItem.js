import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Text, List, Card, Icon, CardItem, Left, Body, Right, Thumbnail, Button} from 'native-base';
import PostService from '../services/PostService';
import Style from '../style/style';

export default class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            offset: 0,
            limit: 9,
            isPostsEmpty: true,
            showUserImage: false
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
        console.log('coba')
        this.props.onMovePostDetail(item)
    }

    async doRequest(param) {
        const {data} = await new PostService(null).get(param)
        if (data) {
            this.setState({
                posts: this.state.posts.concat(data),
                isPostsEmpty: data.length === 0
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
                              <CardItem style={{borderBottomColor: '#c4c4c4', borderBottomWidth: 2}}>
                                  <Left>
                                      <Thumbnail
                                          source={source(item.user.imageurl)}
                                          onLoad={() => this.setState({showUserImage: true})}
                                          onError={() => this.setState({showUserImage: false})}
                                      />
                                  </Left>
                                  <Body>
                                  <Text style={{fontWeight: '700', color: '#000'}}>{item.user.username}</Text>
                                  <Text style={{fontWeight: '300', fontSize: 13, color: '#555'}}>{item.title}</Text>
                                  </Body>
                                  <Right></Right>
                              </CardItem>
                              <CardItem style={{padding: 16}} button onPress={onPress(item)}>
                                  <Text style={{
                                      textAlign: 'justify',
                                      color: '#555',
                                      fontWeight: '300'
                                  }}>{item.review}</Text>
                              </CardItem>
                              <CardItem>
                                  <Left>
                                      <Button style={{backgroundColor: '#FF4181'}} iconLeft>
                                          <Icon name="md-heart-outline"></Icon>
                                          <Text>Favourite</Text>
                                      </Button>
                                  </Left>
                                  <Right><Text>{item.created_at.split(' ')[0]}</Text></Right>
                              </CardItem>
                          </Card>
                      }>
                </List>
                {this.state.isPostsEmpty &&
                <Card style={Style.cardContentEmpty}><Text>No More item Has Been Loaded</Text></Card>}
            </ScrollView>
        );
    }
}