import React, {Component} from 'react';
import {Container, Header, Tab, Tabs, ScrollableTab, Text, Body, Left, Right} from 'native-base';
import Style from '../style/style';
import PostService from '../services/PostService';
import Post from  '../pages/Post';

export default class ScrollTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postCategories: []
        };
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
                            <Post category={item.value}/>
                        </Tab>
                    })}
                </Tabs>
            </Container>
        );
    }
}