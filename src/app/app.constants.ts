export class AppConstants {

  // public static QDMP_URI = 'http://192.168.6.153:3000/api/';
  public static QDMP_URI = 'http://localhost:3000/api';
  public static ORGANIZATION_URL = AppConstants.QDMP_URI + '/dmorg';
  public static DELETE_ORGANIZATION = function (orgId: string) {
    return AppConstants.QDMP_URI + `dmorg/${orgId}`;
  };
  public static CATEGORIES_URI=`${AppConstants.QDMP_URI}/categories`;
  public static ASSETS=`${AppConstants.QDMP_URI}/assets`;
}
