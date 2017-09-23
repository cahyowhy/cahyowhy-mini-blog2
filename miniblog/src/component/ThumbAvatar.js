import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Thumbnail} from 'native-base';

/**
 * always use this on thumbnail avatar
 */
export default class ThumbAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            useDefaultImg: true
        };
    }

    render() {
        const source = (imageurl) => {
            return this.state.useDefaultImg ? {uri: `http://res.cloudinary.com/dxdelmsib/${imageurl}`} :
                require('../assets/user.png')
        };

        return (
        <TouchableOpacity onPress={() => this.props.onProfile()}>
            <Thumbnail
                source={source(this.props.source)}
                onError={() => this.setState({useDefaultImg: false})}
            />
        </TouchableOpacity>
        );
    }
}