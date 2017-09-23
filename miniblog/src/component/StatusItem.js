import React, {Component} from 'react';
import StatusService from '../services/StatusService';
import ContentItems from './concern/ContentItems';

export default class StatusItem extends Component {
    constructor(props) {
        super(props);
        const param = {offset: 0, limit: 9, user_id: this.props.user_id};
        this.state = {
            statuses: [],
            isStatusesEmpty: true,
            param
        };
        this.onScrollStatus = this.onScrollStatus.bind(this);
        this.doRequest = this.doRequest.bind(this);
    }

    async onScrollStatus() {
        const param = this.state.param;
        this.setState({param: Object.assign({}, param, {offset: param.offset + param.limit})});
        this.doRequest(this.state.param)
    }

    async doRequest(param) {
        const {data} = await new StatusService(null).get(param);
        if (data) {
            this.setState({
                statuses: this.state.statuses.concat(data),
                isStatusesEmpty: data.length === 0
            });
        } else {
            this.setState({
                isStatusesEmpty: true
            });
        }
    }

    async componentWillMount() {
        this.doRequest(this.state.param);
    }

    render() {
        return (
            <ContentItems onScroll={() => this.onScrollStatus()}
                          items={this.state.statuses}
                          isStatus={true}
                          onProfile={(item) => this.props.onMoveProfile(item.user.id)}
                          isItemsEmpty={this.state.isStatusesEmpty}/>
        );
    }
}