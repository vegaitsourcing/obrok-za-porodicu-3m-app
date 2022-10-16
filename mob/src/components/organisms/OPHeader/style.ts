import {Platform, StyleSheet} from 'react-native';
import {Colors} from '../../../constants/Colors';
import {TextStyles} from '../../../constants/TextStyles';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.BACKGROUND,
  },
  topHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND,
  },
  bottomHeader: {
    padding: Platform.OS === 'ios' ? 16 : 0,
    marginHorizontal: Platform.OS === 'android' ? 16 : 0,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterText: {
    ...TextStyles.DOSIS_REGULAR,
    alignSelf: 'center',
    marginLeft: 2,
    marginRight: 4,
    fontSize: 18,
  },
  animationWrapper: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
  clearButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
    marginTop: Platform.OS === 'android' ? 5 : 0,
    top: 82,
    right: 20,
    zIndex: 10,
  },
  clearText: {
    ...TextStyles.DOSIS_BOLD,
    color: Colors.LIGHT_GRAY,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
