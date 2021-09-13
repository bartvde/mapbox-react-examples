import SimpleSelect from '@mapbox/mapbox-gl-draw/src/modes/simple_select';
import { activeStates, geojsonTypes } from '@mapbox/mapbox-gl-draw/src/constants';

const CustomEditPointMode = { ...SimpleSelect };

CustomEditPointMode.toDisplayFeatures = function (state, geojson, display) {
  geojson.properties.active = this.isSelected(geojson.properties.id) ? activeStates.ACTIVE : activeStates.INACTIVE;
  display(geojson);
  this.fireActionable();
  if (geojson.properties.active !== activeStates.ACTIVE || geojson.geometry.type === geojsonTypes.POINT) {
    return;
  }
};

// do not unselect when clicking outside of feature
CustomEditPointMode.clickAnywhere = function (state) {
  this.stopExtendedInteractions(state);
};

CustomEditPointMode.clickOnFeature = function () {
  // do not allow vertex edit
};

CustomEditPointMode.clickOnVertex = function () {
  // do not allow vertex edit
};

export default CustomEditPointMode;
