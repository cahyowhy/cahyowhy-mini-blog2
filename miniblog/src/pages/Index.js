import React, {Component} from 'react';
import {Container, Header, Tab, Tabs, ScrollableTab, Text, Body, Left, Right} from 'native-base';
import Style from '../style/style';
import PostService from '../services/PostService';
import PostItem from  '../component/PostItem';
import {StackNavigator} from "react-navigation";

export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postCategories: []
        };
        this.onMovePostDetail = this.onMovePostDetail.bind(this);
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
        return (
            <Container>
                <Header hasTabs>
                    <Left/>
                    <Body>
                    <Text style={Style.textHeader}>Mini Blog</Text>
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
            </Container>
        );
    }
}

Index.navigationOptions = ({navigation}) => ({
    header: null
});