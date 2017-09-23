import React from 'react';
import {Left, Right, Body, Tabs, Tab, Button, Icon, Content, Row, Grid, TabHeading, Text, Col} from 'native-base';
import UserService from '../services/UserService';
import {ScrollView, View} from 'react-native';
import Style from '../style/style';
import ThumbAvatar from '../component/ThumbAvatar';
import PostItem from  '../component/PostItem';
import BaseMethod from './concern/BaseMethod';

export default class Profile extends BaseMethod {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.navigation.state.params.id.toString(),
            isLoaded: false,
            user_data: {},
        };
    }

    async componentWillMount() {
        const {data} = await new UserService(null).get(this.state.user_id);
        if (data) {
            this.setState({
                isLoaded: true,
                user_data: data
            });
        }
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Mini Blog',
        headerRight: (
            <Button icon transparent><Icon name="md-more"/></Button>
        )
    });

    render() {
        const profileView = (<View>
            <Grid style={[Style.profileUser.detail, {backgroundColor: '#fff'}]}>
                <Col style={Style.profileUser.colLeft}>
                    <ThumbAvatar source={this.state.user_data.imageurl}/>
                    <Text style={Style.profileUser.username}>{this.state.user_data.username}</Text>
                    <Text style={Style.fontCreatedAt}>{this.state.user_data.name}</Text>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <View style={Style.profileUser.folWrapper}>
                                <Text
                                    style={Style.profileUser.folTextTotal}>{this.state.user_data.total_follower}</Text>
                                <Text style={Style.profileUser.folTextDet}>Followers</Text>
                            </View>
                        </Col>
                        <Col>
                            <View style={Style.profileUser.folWrapper}>
                                <Text
                                    style={Style.profileUser.folTextTotal}>{this.state.user_data.total_follower}</Text>
                                <Text style={Style.profileUser.folTextDet}>Followers</Text>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        <Button small style={Style.profileUser.btnEditProd}><Text>Edit Profile</Text></Button>
                    </Row>
                </Col>
            </Grid>
            <Tabs initialPage={0}>
                <Tab heading={<TabHeading><Icon name="md-text"/></TabHeading>}></Tab>
                <Tab heading={<TabHeading><Icon name="md-list-box"/></TabHeading>}>
                    <PostItem fromProfile={true} user_id={this.state.user_data.id}
                              onMoveProfile={this.onMoveProfile}
                              onMovePostDetail={this.onMovePostDetail}/>
                </Tab>
                <Tab heading={<TabHeading><Icon name="md-images"/></TabHeading>}></Tab>
            </Tabs>
        </View>);

        return (
            <ScrollView style={Style.bg}>
                {this.state.isLoaded ? profileView : <View style={{flex: 1}}></View>}
            </ScrollView>
        );
    }
}