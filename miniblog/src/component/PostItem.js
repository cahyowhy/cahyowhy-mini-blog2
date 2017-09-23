import React, {Component} from 'react';
import PostService from '../services/PostService';
import ContentItems from './concern/ContentItems';

export default class PostItem extends Component {
    constructor(props) {
        super(props);
        const param = this.props.fromProfile ?
            {offset: 0, limit: 9, user_id: this.props.user_id} :
            {offset: 0, limit: 9, category: this.props.category};

        this.state = {
            posts: [],
            isPostsEmpty: true,
            showUserImage: true,
            param
        };
        this.onScrollPost = this.onScrollPost.bind(this);
        this.doRequest = this.doRequest.bind(this);
    }

    async onScrollPost() {
        const param = this.state.param;
        this.setState({param: Object.assign({}, param, {offset: param.offset + param.limit})});
        this.doRequest(this.state.param)
    }

    async doRequest(param) {
        const {data} = await new PostService(null).get(param);
        if (data) {
            this.setState({
                posts: this.state.posts.concat(data),
                isPostsEmpty: data.length === 0
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