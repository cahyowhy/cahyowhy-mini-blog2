import React from 'react';
import {View, WebView, ScrollView} from 'react-native';
import {Button, Icon, Text, Header, List, Left, Body, Right, Card, CardItem} from 'native-base';
import {StackNavigator} from "react-navigation";
import PostService from '../services/PostService';
import CommentPostService from '../services/CommentPostService';
import WebViewBridge from 'react-native-webview-bridge';
import ThumbAvatar from '../component/ThumbAvatar';
import Style from '../style/style';
import {UserDetail, FavWrapper} from '../component/CardItems';
import BaseMethod from './concern/BaseMethod';

let self = null;
const injectScript = `
  (function() {
    if (WebViewBridge) {
        WebViewBridge.onMessage = function(message) {
            WebViewBridge.send(document.body.scrollHeight.toString());
        };
        WebViewBridge.send(document.body.scrollHeight.toString());
    }
}());
`;

export default class PostDetail extends BaseMethod {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            iSPostLoaded: false,
            webViewHeight: 0,
            commentPostParam: {
                offset: 0,
                limit: 9,
                post_id: this.props.navigation.state.params.id.toString()
            },
            commentposts: [],
            isCommentPostsEmpty: false
        };
        this.onBridgeMessage = this.onBridgeMessage.bind(this);
        this.doRequestCommentPost = this.doRequestCommentPost.bind(this);
        this.onScrollCommentPost = this.onScrollCommentPost.bind(this);
        self = this;
    }

    async onScrollCommentPost(event) {
        const nativeEvent = event.nativeEvent;
        const contentSize = nativeEvent.contentSize;
        const condition = contentSize.height - nativeEvent.layoutMeasurement.height <= nativeEvent.contentOffset.y;
        const offset = this.state.commentPostParam.offset;
        const limit = this.state.commentPostParam.limit;
        if (condition) {
            this.setState({
                commentPostParam: {
                    offset: offset + limit,
                    limit: 9,
                    post_id: this.state.commentPostParam.post_id
                }
            });
            await this.doRequestCommentPost(this.state.commentPostParam);
        }
    }

    async doRequestCommentPost(param) {
        const {data} = await new CommentPostService(null).get(param);
        if (data) {
            this.setState({
                commentposts: this.state.commentposts.concat(data),
                isCommentPostsEmpty: data.length === 0
            });
        } else {
            this.setState({
                isCommentPostsEmpty: true
            });
        }
    }

    onBridgeMessage(message) {
        this.setState({webViewHeight: message});
    }

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
        headerRight: (
            <ThumbAvatar
                onProfile={()=>{self.onMoveProfile(navigation.state.params.user.id)}}
                source={navigation.state.params.user.imageurl}/>
        )
    });

    async componentWillMount() {
        const {data} = await new PostService(null).get(this.props.navigation.state.params.id.toString());
        await this.doRequestCommentPost(this.state.commentPostParam);
        if (data) {
            const style = `article {text-align: justify;width: 100%}p, div{text-align: justify;font-size: 13px;color: #111}img{width: 100% !important;height: auto !important;}`;
            this.setState({
                iSPostLoaded: true,
                content: `
                <html>
                <head>
                    <style>${style}</style>
                </head>
                <body>
                    <article>${data.description}</article>
                </body>
                </html>`
            });
        }
    }

    render() {
        return (
            <ScrollView style={Style.bg} onScroll={this.onScrollCommentPost}>
                <WebViewBridge
                    ref="webviewbridge"
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    style={{backgroundColor: '#eaeaea', height: parseInt(this.state.webViewHeight)}}
                    injectedJavaScript={injectScript}
                    startInLoadingState={true}
                    scrollEnabled={false}
                    source={{html: this.state.content}}/>
                <View style={{paddingLeft: 8, paddingRight: 8, marginBottom: 16}}>
                    <Text style={{marginBottom: 8, marginTop: 8}}>Response</Text>
                    <List dataArray={this.state.commentposts}
                          renderRow={(item) =>
                              <Card>
                                  <UserDetail
                                      onProfile={() => this.onMoveProfile(item.user.id)}
                                      imageurl={item.user.imageurl}
                                      username={item.user.username}
                                      created_at={item.user.created_at}/>
                                  <CardItem>
                                      <Text>
                                          {item.comment}
                                      </Text>
                                  </CardItem>
                                  <FavWrapper created_at={item.created_at}/>
                              </Card>
                          }
                    />
                    {this.state.isCommentPostsEmpty &&
                    <Card style={Style.cardContentEmpty}><Text>No More item Has Been Loaded</Text></Card>}
                </View>
            </ScrollView>
        );
    }
}