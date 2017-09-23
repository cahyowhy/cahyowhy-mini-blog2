import {StackNavigator} from 'react-navigation';
import Index from '../pages/Index';
import PostDetail from '../pages/PostDetail';
import {AppRegistry} from 'react-native';
import Profile from '../pages/Profile';

export default Route = StackNavigator({
    Home: {screen: Index},
    PostDetail: {screen: PostDetail},
    Profile: {screen: Profile}
});