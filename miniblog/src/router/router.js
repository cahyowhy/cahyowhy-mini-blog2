import {StackNavigator} from 'react-navigation';
import Index from '../pages/Index';
import PostDetail from '../pages/PostDetail';
import {AppRegistry} from 'react-native';

export default Route = StackNavigator({
    Home: {screen: Index},
    PostDetail: {screen: PostDetail}
});