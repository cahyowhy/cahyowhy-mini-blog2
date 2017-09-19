import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Text, List, ListItem, Card} from 'native-base';
import PostService from '../services/PostService';
import Style from '../style/style';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            offset: 0,
            limit: 9,
            isPostsEmpty: true
        };
        this.onScrollPost = this.onScrollPost.bind(this);
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
        this.doRequest(param)
    }

    render() {
        return (
            <ScrollView onScroll={this.onScrollPost}>
                <List dataArray={this.state.posts}
                      renderRow={(item) =>
                          <ListItem>
                              <Text>{item.title}</Text>
                          </ListItem>
                      }>
                </List>
                {this.state.isPostsEmpty && <Card style={Style.cardContentEmpty}><Text>No More item Has Been Loaded</Text></Card>}
            </ScrollView>
        );
    }
}