import React, {Component} from 'react';
import PostService from '../services/PostService';
import ContentItems from './concern/ContentItems';
import {onAddPostItem} from '../redux/actions/actions';
import {Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class PostItem extends Component {
    constructor(props) {
        super(props);
        // the props come from profile => add user_id field
        // the props come from no category use no category
        const param = this.props.fromProfile ?
            {offset: 0, limit: 9, user_id: this.props.user_id} :
            this.props.allPost ? {offset: 0, limit: 9} :
                {offset: 0, limit: 9, category: this.props.category};

        const allPosts = this.props.postItems;
        const posts = this.props.fromProfile ? this.props.filterByUser(allPosts, this.props.user_id) :
            this.props.allPost ? allPosts :
                this.props.filterByCategory(allPosts, this.props.category);

        this.state = {
            posts,
            isPostsEmpty: true,
            param
        };
        this.onScrollPost = this.onScrollPost.bind(this);
        this.doRequest = this.doRequest.bind(this);
    }

    async onScrollPost() {
        const param = this.state.param;
        this.setState({param: Object.assign({}, param, {offset: param.offset + param.limit})});
        this.doRequest(this.state.param);
    }

    async doRequest(param) {
        const {data} = await new PostService(null).get(param);
        const context = this;

        if (data) {
            this.setState({
                isPostsEmpty: data.length === 0,
            });
            data.forEach(function (item) {
                item.user.savedDate = new Date();
                item.savedDate = new Date();
                context.props.onAddPostItem(item);
            });
        } else {
            this.setState({
                isPostsEmpty: true
            });
        }
    }

    async componentWillMount() {
        this.doRequest(this.state.param);
    }

    render() {
        return (
            <ContentItems onScroll={() => this.onScrollPost()}
                          items={this.state.posts}
                          isPost={true}
                          onPostDetail={(item) => this.props.onMovePostDetail(item)}
                          onProfile={(item) => this.props.onMoveProfile(item.user.id)}
                          isItemsEmpty={this.state.isPostsEmpty}/>
        );
    }
}

const mapStateToProps = (props, state) => {
    return {
        postItems: props.postItems,
        fromProfile: state.fromProfile,
        user_id: state.user_id,
        allPost: state.allPost,
        category: state.category,
        onMovePostDetail: state.onMovePostDetail,
        onMoveProfile: state.onMoveProfile
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPostItem: (postItem) => bindActionCreators(onAddPostItem(postItem), dispatch),
        filterByCategory: (postItem, category) => postItem.filter((item) => item.category === category),
        filterByUser: (postItem, userId) => postItem.filter((item) => item.user.id === userId),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem)