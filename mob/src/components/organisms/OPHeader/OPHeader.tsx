import React, {FC, useState, useRef, useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';

import type {RootState, AppDispatch} from '../../../store/reducers/RootReducer';
import {
  getVolunteerActions,
  onSetSearchTerm,
  onClearFilters,
  getVolunteerActionTypes,
} from '../../../store/actions/VolunteerAction';
import Icons from '../../../constants/Icons';
import {styles} from './style';
import OPBadge from '../../atoms/OPBadge/OPBadge';
import OPSearch from '../../atoms/OPSearch/OPSearch';
import OPPrimaryButton from '../../atoms/OPPrimaryButton/OPPrimaryButton';
import OPTagChips from '../../molecules/OPTagChips/OPTagChips';

interface OPHeaderProps {
  filterTitle?: string;
  buttonTitle?: string;
  searchPlaceholder?: string;
}

const LOGO_PATH = require('../../../../assets/images/LogoHoriz1.png');

const OPHeader: FC<OPHeaderProps> = ({
  filterTitle,
  buttonTitle,
  searchPlaceholder,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const {volunteerActionTypes, appliedVolunteerActions, searchTerm} =
    useSelector((state: RootState) => state.volunteerActions);

  const [searchValue, setSearchValue] = useState<string>(searchTerm);
  const badgeValue: number =
    Object.keys(appliedVolunteerActions).length +
    +(searchValue?.length > 0 ? 1 : 0);

  const isOpening: any = useRef<any>(false);

  const height = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  const filterTitleLocal: string = filterTitle ?? t('actionScreen.filter');
  const buttonTitleLocal: string =
    buttonTitle ?? t('actionScreen.searchButton');
  const searchPlaceholderLocal: string =
    searchPlaceholder ?? t('actionScreen.searchPlaceholder');

  const animatedStyles = useAnimatedStyle(() => ({
    height: height.value,
    opacity: opacity.value,
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  const onPressFilterIcon = () => {
    if (!isOpening.current) {
      isOpening.current = true;

      height.value = withTiming(
        height.value === 0
          ? Math.ceil(volunteerActionTypes?.length / 3) * 40 + 200
          : 0,
        {
          duration: 500,
        },
      );
      opacity.value = withTiming(opacity.value === 1 ? 0 : 1, {
        duration: 500,
      });

      const timeout = setTimeout(() => {
        isOpening.current = false;
        clearTimeout(timeout);
      }, 700);
    }
  };

  const onButtonPress = () => {
    dispatch(onSetSearchTerm(searchValue));
    dispatch(getVolunteerActions(1));
    onPressFilterIcon();
  };

  const onClearAll = () => {
    setSearchValue('');
    dispatch(onClearFilters());
  };

  useEffect(() => dispatch(getVolunteerActionTypes()), [dispatch]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.topHeader}>
        <Image source={LOGO_PATH} resizeMode="contain" />
        <TouchableOpacity
          style={styles.filterContainer}
          onPress={onPressFilterIcon}>
          <View>{Icons.FILTER}</View>
          <Text style={styles.filterText}>{t('actionScreen.filter')}</Text>
          {badgeValue ? <OPBadge value={badgeValue} /> : null}
        </TouchableOpacity>
      </View>
      <Animated.View style={[styles.animationWrapper, animatedStyles]}>
        <View style={styles.bottomHeader}>
          <OPSearch
            placeholder={searchPlaceholderLocal}
            value={searchValue}
            onChangeText={setSearchValue}
          />
          {badgeValue ? (
            <View style={styles.clearButton}>
              <TouchableOpacity onPress={onClearAll}>
                <Text style={styles.clearText}>
                  {t('actionScreen.clearAll')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <OPTagChips
            statuses={volunteerActionTypes}
            heading={filterTitleLocal}
          />
        </View>
        <View style={styles.buttonContainer}>
          <OPPrimaryButton
            text={buttonTitleLocal.toUpperCase()}
            onPress={onButtonPress}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default OPHeader;
