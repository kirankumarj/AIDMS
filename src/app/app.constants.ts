export class AppConstants {

  //public static QDMP_URI = 'http://192.168.6.153:3000/api/';
  public static QDMP_URI = 'http://localhost:3000/api/';
  public static ORGANIZATION_URL = AppConstants.QDMP_URI + '/dmorg';
  public static GET_OPEN_INCIDENT_COUNT = AppConstants.QDMP_URI + 'incidents/count';
  public static GET_INPROGESS_INCIDENT_COUNT = AppConstants.QDMP_URI + 'incidents/count';
  public static GET_TOTAL_RESOURCES_COUNT = AppConstants.QDMP_URI + 'incidents/count';
  public static GET_AVAILABLE_RESOURCES_COUNT = AppConstants.QDMP_URI + 'incidents/count';
  public static GET_DEFECTIVE_RESOURCES_COUNT = AppConstants.QDMP_URI + 'incidents/count';
  public static GET_TOTAL_ASSETS = AppConstants.QDMP_URI + 'incidents/count';
  public static GET_AVAILABLE_ASSETS = AppConstants.QDMP_URI + 'incidents/count';
  public static GET_DEFECTIVE_ASSETS = AppConstants.QDMP_URI + 'incidents/count';
  public static GET_LIVE_NEWS_FEED = AppConstants.QDMP_URI + 'livenewsfeeds';
  public static GET_NOTIFICATIONS = AppConstants.QDMP_URI + 'notifications';
  public static RESOURCES_URL = AppConstants.QDMP_URI + '/resources';
  public static DELETE_ORGANIZATION = function (orgId: string) {
    return AppConstants.QDMP_URI + `dmorg/${orgId}`;
  };
  public static CATEGORIES_URI=`${AppConstants.QDMP_URI}/categories`;
  public static ASSETS=`${AppConstants.QDMP_URI}/assets`;
   public static SHELTER_URL = AppConstants.QDMP_URI + 'dmshleter';
  public static DELETE_SHELTER = function (shelterId: string) {
    return AppConstants.QDMP_URI + `dmshleter/${shelterId}`;
  };

  public static DELETE_RESOURCE = function (resourceId: string) {
    return AppConstants.RESOURCES_URL + `/${resourceId}`;
  };
}
