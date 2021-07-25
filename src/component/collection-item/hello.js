import React from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import Button from "../Components/atoms/Button";
import Illustration from "../Components/molecules/Illustration";
// import icon_bank from "../../assets/images/large/icon_bank.png";
import Text from "../Components/atoms/Text";
import AppIntroSlider from "react-native-app-intro-slider";
import colors from "../../assets/resources/colors";
import { useTranslation } from "../context/LanguageContext";

// Images for Illustration
import intro1 from "../../../../../assets/images/large/intro1.png";
import intro2 from "../../../../../assets/images/large/intro2.png";
import intro3 from "../../../../../assets/images/large/intro3.png";

const OnboardingScreen = () => {
  // Will change the type later
  let sliderRef = null;

  // Will change the type later
  const t = useTranslation();

  const slides = [
    {
      key: "intro1",
      title: t.value.textRegisMudah,
      text: t.value.textRegisMudahDesc,
      image: intro1,
      colors: [colors.primary, colors.primary1],
      number: 1,
    },
    {
      key: "intro2",
      title: t.value.textBuatKirim,
      text: t.value.textBuatKirimDesc,
      image: intro2,
      colors: [colors.primary, colors.primary1],
      number: 2,
    },
    {
      key: "intro3",
      title: t.value.textNotifPembayaran,
      text: t.value.textNotifPembayaranDesc,
      image: intro3,
      colors: [colors.primary, colors.primary1],
      number: 3,
    },
  ];

  // type SlideType = {
  //   item: { key: string, title: string, text: string, image: ImageSourcePropType, colors: [], number: number },
  // };

  const _renderItem = ({ item }) => {
    return (
      <>
        <Illustration source={item.image} />
        <View style={styles.textContainer}>
          <Text.h1 color={colors.primary90}>
            #{item.number} {item.title}
          </Text.h1>
          <View style={{ marginTop: 10 }}>
            <Text.p1 color="black">{item.text}</Text.p1>
          </View>
        </View>
      </>
    );
  };

  const _renderNextButton = activeIndex => {
    return (
      <View style={[styles.buttonStyle]}>
        <Button
          mode="contained"
          onPress={() => {
            sliderRef.goToSlide(activeIndex + 1, true);
          }}
        >
          Next
        </Button>
      </View>
    );
  };

  const _renderBackButton = activeIndex => {
    return (
      <View style={[styles.buttonStyle]}>
        <Button mode="outlined" onPress={() => sliderRef.goToSlide(activeIndex - 1, true)}>
          Back
        </Button>
      </View>
    );
  };

  const _renderDoneButton = activeIndex => {
    return (
      <View style={[styles.buttonStyle]}>
        <Button
          mode="contained"
          onPress={() => {
            sliderRef.goToSlide(activeIndex - 2, true);
          }}
        >
          Done
        </Button>
      </View>
    );
  };

  // const _onDone = () => {
  //   console.log("Untung");
  // };

  const _renderPagination = activeIndex => {
    const isFirstSlide = activeIndex === 0;
    const isLastSlide = activeIndex === slides.length - 1;

    const isBackButtonShown = isFirstSlide ? null : _renderBackButton(activeIndex);
    const isNextButtonShown = isLastSlide ? _renderDoneButton(activeIndex) : _renderNextButton(activeIndex);

    return (
      <View style={styles.paginationContainer}>
        <SafeAreaView>
          <View style={styles.paginationDots}>
            {slides.length > 1 &&
              slides.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.dot, i === activeIndex ? styles.activeDotStyle : styles.dotStyle]}
                  onPress={() => sliderRef.goToSlide(i, true)}
                />
              ))}
          </View>
          <View style={styles.buttonContainer}>
            {isNextButtonShown}
            {isBackButtonShown}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <AppIntroSlider
        showPrevButton={true}
        activeDotStyle={styles.activeDotStyle}
        data={slides}
        renderItem={_renderItem}
        ref={ref => (sliderRef = ref)}
        renderPagination={_renderPagination}
      />
    </>
  );
};

const styles = StyleSheet.create({
  activeDotStyle: {
    backgroundColor: colors.primary60,
    width: 48,
    height: 8,
  },
  dotStyle: {
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    marginHorizontal: 15,
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 15,
  },
  buttonStyle: {
    width: "48%",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  paginationContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },

  textContainer: {
    paddingLeft: 15,
    paddingTop: 15,
  },
});

export default OnboardingScreen;
