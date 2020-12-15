import { Platform } from 'react-native';

 const fonts = {
    balooRegular: Platform.OS === "android" ? "baloo-regular" : "Baloo-Regular",
    MontserratMedium:
        Platform.OS === "android" ? "montserrat_medium" : "Montserrat-Medium",
    MontserratRegular:
        Platform.OS === "android" ? "montserrat_regular" : "Montserrat-Regular",
    MontserratBold:
        Platform.OS === "android" ? "montserrat_bold" : "Montserrat-Bold",
    MontserratLight:
        Platform.OS === "android" ? "montserrat_light" : "Montserrat-Light",
    MontserratSemiBold:
        Platform.OS === "android" ? "montserrat_semibold" : "Montserrat-SemiBold"
};

export { fonts } ;