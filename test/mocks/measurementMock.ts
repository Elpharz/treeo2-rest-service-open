import { faker } from '@faker-js/faker';
import { activity } from './activityMock';

export const measurement = {
  id: faker.datatype.uuid(),
  activityID: activity.activity.id,
  dateTime: '2021-09-13 14:11:26.942',
  treeDBHmm: 600,
  treeHealth: 'growing',
  treeHeightMm: 72,
  stepsSinceLastMeasurement: 3,
  measurement_type: 'tree_measurement_auto',
  gpsLocation: '0.3476, 32.5825',
  gpsAccuracy: 4,
  additionalData: null,
};

export const measurement2 = {
  id: faker.datatype.uuid(),
  activityID: activity.activity.id,
  dateTime: '2021-09-13 14:11:26.942',
  treeDBHmm: 600,
  treeHealth: 'growing',
  treeHeightMm: 72,
  stepsSinceLastMeasurement: 3,
  measurement_type: 'tree_measurement_auto',
  gpsLocation: '0.3476, 32.5825',
  gpsAccuracy: 4,
  additionalData: null,
};

export const measurement3 = {
  id: faker.datatype.uuid(),
  activityID: activity.activity.id,
  dateTime: '2021-09-13 14:11:26.942',
  treeDBHmm: 600,
  treeHealth: 'growing',
  treeHeightMm: 72,
  stepsSinceLastMeasurement: 3,
  measurement_type: 'tree_measurement_auto',
  gpsLocation: '0.3476, 32.5825',
  gpsAccuracy: 4,
  additionalData: null,
};

export const measurementMock = () => ({
  id: faker.datatype.uuid(),
  activityID: activity.activity.id,
  dateTime: '2021-09-13 14:11:26.942',
  treeDBHmm: 600,
  treeHealth: 'growing',
  treeHeightMm: 72,
  stepsSinceLastMeasurement: 3,
  measurement_type: 'tree_measurement_auto',
  gpsLocation: '0.3476, 32.5825',
  gpsAccuracy: 4,
  additionalData: null,
});
