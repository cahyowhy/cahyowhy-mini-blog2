import React, {Component} from 'react';
import ImageService from '../services/ImageService';
import ContentItems from './concern/ContentItems';

export default class ImageItem extends Component {
    constructor(props) {
        super(props);
        const param = {offset: 0, limit: 9, user_id: this.props.user_id};
        this.state = {
            images: [],
            isImagesEmpty: true,
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
        const {data} = await new ImageService(null).get(param);
        if (data) {
            this.setState({
                images: this.state.images.concat(data),
                isImagesEmpty: data.length === 0
            });
        } else {
            this.setState({
                isImagesEmpty: true
            });
        }
    }

    async componentWillMount() {
        this.doRequest(this.state.param);
    }

    render() {
        return (
            <ContentItems onScroll={() => this.onScrollImages()}
                          items={this.state.images}
                          onProfile={(item) => this.props.onMoveProfile(item.user.id)}
                          isItemsEmpty={this.state.isImagesEmpty}/>
        );
    }
}