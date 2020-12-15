import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from "@screens/Home";
import modules from "@screens";
import { Login, Register, ForgetPassword, EditPage } from "@auth";
import Profile from '@screens/Profile'
import MeetingHistory from '@screens/MeetingHistory'
import SocialLogin from '@screens/SocialLogin'
import Calling from '@screens/common/Calling'
import ScheduleMeeting from '@screens/ScheduleMeeting'
import SelectParticipitant from '@screens/selectParticipitant';
import News from '@screens/News/Index';
import NewsDetails from  '@screens/News/newsDetail';
import NewsCategory from '@screens/News/NewsCategory';

import Videos from '@screens/Videos/Index';
import VideoCategory from '@screens/Videos/VideoCategory'
import VideoDetail from '@screens/Videos/VideoDetail';

import FileShared from '@screens/fileShared';

import facebookLogin  from '@auth/facebook/index';
const AnimationConfigs = {
    screenOptions: {
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gesturesEnabled: false,
        animationEnabled:false//
    },
};
const Stack = createStackNavigator();
function Router() {
    return (
        <NavigationContainer  {...AnimationConfigs}>
            <Stack.Navigator initialRouteName={"modules"} headerMode="none">                
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Edit" component={EditPage} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="MeetingHistory" component={MeetingHistory} />
                <Stack.Screen name="SocialLogin" component={SocialLogin} />
                <Stack.Screen name="modules" component={modules} />
                <Stack.Screen name="Calling" component={Calling} />
                <Stack.Screen name="ScheduleMeeting" component={ScheduleMeeting} />
                <Stack.Screen name="ParticipitantList" component={SelectParticipitant}/>
                <Stack.Screen name="News" component={News}/>
                <Stack.Screen name="NewsDetails" component={NewsDetails}/>
                <Stack.Screen name="NewsCategory" component={NewsCategory}/>
                
                <Stack.Screen name="Videos" component={Videos}/>
                <Stack.Screen name="VideoCategory" component={VideoCategory}/>
                <Stack.Screen name="VideoDetail" component={VideoDetail}/>

                <Stack.Screen name="FileShared" component={FileShared}/>

                {/* facebook login */}
                <Stack.Screen name="facebookLogin" component={facebookLogin}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Router;