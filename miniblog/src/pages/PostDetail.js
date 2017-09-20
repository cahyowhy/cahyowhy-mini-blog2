import React, {Component} from 'react';
import {View, WebView} from 'react-native';
import {Button, Icon, Text, Header, Left, Body, Right, Thumbnail} from 'native-base';
import {StackNavigator} from "react-navigation";
import PostService from '../services/PostService';
import CommentPostService from '../services/CommentPostService';

export default class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }

    static navigationOptions = ({navigation}) => ({
        // title: navigation.state.params.title,
        header: () => {
            return (
                <Header style={{backgroundColor: '#fff'}}>
                    <Left>
                        <Button transparent><Icon style={{color: '#555'}} name="md-arrow-round-back"></Icon></Button>
                    </Left>
                    <Body><Text style={{color: '#000'}}>{navigation.state.params.title}</Text></Body>
                    <Right>
                        <Thumbnail style={{paddingTop: 8, paddingBottom: 8}} source={{uri: `http://res.cloudinary.com/dxdelmsib/${navigation.state.params.user.imageurl}`}}/>
                    </Right>
                </Header>
            );
        }
    });

    async componentWillMount() {
        const {data} = await new PostService(null).get(this.props.navigation.state.params.id.toString());
        if (data) {
            const style = `article {text-align: justify; width:100%; position:relative; img{width:100% !important;max-width:100% !important;};p {text-align:justify;position: relative;> img {width:100%;max-width:100%;position: relative;top: 50%;left: 50%;transform: translate(-50%);}}`;
            this.setState({
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
            <View style={{flex: 1, backgroundColor: '#eaeaea'}}>
                <WebView style={{backgroundColor: '#eaeaea'}} source={{html: this.state.content}}/>
            </View>
        );
    }
}