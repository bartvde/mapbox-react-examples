import DrawPoint from '@mapbox/mapbox-gl-draw/src/modes/draw_point';
import { cursors, events, geojsonTypes, types, modes } from '@mapbox/mapbox-gl-draw/src/constants';

const CustomPointMode = { ...DrawPoint };

CustomPointMode.onSetup = function () {
  const point = this.newFeature({
    geometry: {
      coordinates: [],
      type: geojsonTypes.POINT,
    },
    id: 'centroid_fid',
    properties: {},
    type: geojsonTypes.FEATURE,
  });

  this.addFeature(point);

  this.clearSelectedFeatures();
  this.updateUIClasses({ mouse: cursors.ADD });
  this.activateUIButton(types.POINT);

  this.setActionableState({
    trash: true,
  });

  return { point };
};

CustomPointMode.onTap = CustomPointMode.onClick = function (state, e) {
  this.updateUIClasses({ mouse: cursors.MOVE });
  state.point.updateCoordinate('', e.lngLat.lng, e.lngLat.lat);

  /*const box = this.newFeature({
    geometry: {
      coordinates: [[]],
      type: geojsonTypes.POLYGON,
    },
    id: 'box_fid',
    properties: {},
    type: geojsonTypes.FEATURE,
  });

  this.addFeature(box);*/
  this.map.fire(events.CREATE, {
    features: [state.point.toGeoJSON()],
  });
  this.changeMode('edit_mode_point', { featureIds: [state.point.id] });
};

export default CustomPointMode;
