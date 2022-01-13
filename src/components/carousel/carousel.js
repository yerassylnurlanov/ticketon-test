import React, { Component } from 'react';
import RnsCarousel, { Pagination } from 'react-native-snap-carousel';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { ticketon } from '../../consts/urls';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Spinner from '../spinner';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  root: {
    flex: 0
  },
  slide: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: wp(133),
    aspectRatio: 3.23,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0,
  }
});

export default class Carousel extends Component {
  state = {
    activeSlide: 0
  };

  _renderItem = ({ item }) => {
    const { handleEventSelect } = this.props;
    return (
      <TouchableOpacity
        style={styles.slide}
        onPress={() => handleEventSelect(item)}
      >
        <View style={{
          flex: 0,
          marginLeft: -wp(33)
        }}>
        <Image
          defaultSource={require('../../assets/img/default-image-slider.png')}
          style={styles.image}
          source={{ uri: `${ticketon + item.cover_slider}?h=${Math.round(width)}` }}
        />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { activeSlide } = this.state;
    const { data } = this.props;

    if (!data) {
      return (
        <Spinner/>
      );
    }

    return (
      <View style={styles.root}>
        <RnsCarousel
          inactiveSlideShift={200}
          layout="default"
          loop
          autoplay
          activeAnimationType="timing"
          autoplayInterval={10000}
          ref={(c) => { this._carousel = c; }}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.pagination}
          dotColor="orange"
          dotStyle={styles.paginationDot}
          inactiveDotColor="black"
          inactiveDotOpacity={0.1}
          inactiveDotScale={1}
          carouselRef={this._carousel}
          tappableDots={!!this._carousel}
        />
      </View>
    );
  }
}
