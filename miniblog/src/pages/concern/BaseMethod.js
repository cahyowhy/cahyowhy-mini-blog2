import React, {Component} from 'react';
export default class BaseMethod extends Component {
    constructor(props) {
        super(props);
        this.onMoveProfile = this.onMoveProfile.bind(this);
        this.onMovePostDetail = this.onMovePostDetail.bind(this);
    }

    onMoveProfile(id) {
        this.props.navigation.navigate('Profile', {id});
    }

    onMovePostDetail(item) {
        this.props.navigation.navigate('PostDetail', item);
    }
}