import React, {Component} from 'react';
import NotificationService from '../services/NotificationService';
import ContentItems from './concern/ContentItems';
import Auth from '../storage/Auth';

export default class NotificationItem extends Component {
    constructor(props) {
        super(props);
        const param = {offset: 0, limit: 9, user_id: this.props.user_id};
        this.state = {
            notifications: [],
            isNotificationsEmpty: true,
            param
        };
        this.onScrollImages = this.onScrollImages.bind(this);
        this.doRequest = this.doRequest.bind(this);
    }

    async onScrollImages() {
        const param = this.state.param;
        this.setState({param: Object.assign({}, param, {offset: param.offset + param.limit})});
        this.doRequest(this.state.param)
    }

    async doRequest(param) {
        const context = this;
        Auth.getUser().then((result) => {
            new NotificationService(result.auth_token).get(param).then(({data}) => {
                if (data) {
                    context.setState({
                        notifications: context.state.notifications.concat(data),
                        isNotificationsEmpty: data.length === 0
                    });
                } else {
                    context.setState({
                        isNotificationsEmpty: true
                    });
                }
            });
        });
    }

    async componentWillMount() {
        this.doRequest(this.state.param);
    }

    render() {
        return (
            <ContentItems onScroll={() => this.onScrollImages()}
                          items={this.state.notifications}
                          isNotification={true}
                          onProfile={(item) => this.props.onMoveProfile(item.user.id)}
                          isItemsEmpty={this.state.isNotificationsEmpty}/>
        );
    }
}