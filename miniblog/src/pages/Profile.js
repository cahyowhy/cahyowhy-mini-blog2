import React from 'react';
import {Left, Right, Body, Tabs, Tab, Button, Icon, Content, Row, Grid, TabHeading, Text, Col} from 'native-base';
import UserService from '../services/UserService';
import {ScrollView, View} from 'react-native';
import Style from '../style/style';
import ThumbAvatar from '../component/ThumbAvatar';
import PostItem from  '../component/PostItem';
import NotificationItem from  '../component/NotificationItem';
import StatusItem from  '../component/StatusItem';
import ImageItem from  '../component/ImageItem';
import BaseMethod from './concern/BaseMethod';
import Auth from '../storage/Auth';

export default class Profile extends BaseMethod {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.navigation.state.params.id.toString(),
            isLoaded: false,
            user_data: {},
            isCurrentProfile: false
        };
    }

    async componentWillMount() {
        const {data} = await new UserService(null).get(this.state.user_id);
        const context = this;
        if (data) {
            this.setState({
                isLoaded: true,
                user_data: data
            });
            Auth.getUser().then((result) => context.setState({
                isCurrentProfile: parseInt(result.user.id) === parseInt(data.id)
            }));
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
                        {this.state.isCurrentProfile && <Button small style={Style.profileUser.btnEditProd}>
                            <Text>Edit Profile</Text>
                        </Button>}
                    </Row>
                </Col>
            </Grid>
            <Tabs initialPage={0}>
                <Tab heading={<TabHeading><Icon name="md-text"/></TabHeading>}>
                    <StatusItem user_id={this.state.user_data.id} onMoveProfile={this.onMoveProfile}/>
                </Tab>
                {this.state.isCurrentProfile &&
                <Tab heading={<TabHeading><Icon name="md-information-circle"/></TabHeading>}>
                    <NotificationItem user_id={this.state.user_data.id} onMoveProfile={this.onMoveProfile}/>
                </Tab>
                }
                <Tab heading={<TabHeading><Icon name="md-list-box"/></TabHeading>}>
                    <PostItem fromProfile={true}
                              user_id={this.state.user_data.id}
                              onMoveProfile={this.onMoveProfile}
                              onMovePostDetail={this.onMovePostDetail}/>
                </Tab>
                <Tab heading={<TabHeading><Icon name="md-images"/></TabHeading>}>
                    <ImageItem user_id={this.state.user_data.id} onMoveProfile={this.onMoveProfile}/>
                </Tab>
            </Tabs>
        </View>);

        return (
            <ScrollView style={Style.bg}>
                {this.state.isLoaded ? profileView : <View style={{flex: 1}}/>}
            </ScrollView>
        );
    }
}