export class AppConstants {

  //public static QDMP_URI = 'http://192.168.6.153:3000/api/';
  public static QDMP_URI = 'http://localhost:3000/api/';
  public static ORGANIZATION_URL = AppConstants.QDMP_URI + 'dmorg';
  public static GET_OPEN_INCIDENT_COUNT = AppConstants.QDMP_URI + '';
  public static GET_INPROGESS_INCIDENT_COUNT = AppConstants.QDMP_URI + '';
  public static GET_TOTAL_RESOURCES_COUNT = AppConstants.QDMP_URI + 'resources/count';
  public static GET_AVAILABLE_RESOURCES_COUNT = AppConstants.QDMP_URI + '';
  public static GET_ALLOCATED_RESOURCES_COUNT = AppConstants.QDMP_URI + '';
  public static GET_TOTAL_ASSETS = AppConstants.QDMP_URI + 'assets/count';
  public static GET_AVAILABLE_ASSETS = AppConstants.QDMP_URI + '';
  public static GET_DEFECTIVE_ASSETS = AppConstants.QDMP_URI + '';
  public static GET_LIVE_NEWS_FEED = AppConstants.QDMP_URI + 'livenewsfeeds';
  public static GET_NOTIFICATIONS = AppConstants.QDMP_URI + 'notifications';
  public static GET_RSSFEED = 'https://www.reddit.com/.rss';
  public static APPID = '';
  public static SECRET_KEY = '';
  public static FBID = '';
  public static GET_FACEBOOK_ACCESSTOKEN = function (appId: string, secretKey:string) {
    return 'https://graph.facebook.com/oauth/access_token?client_id='+`${appId}`+'&client_secret='+`${secretKey}`+'&grant_type=client_credentials';
  };
  public static GET_FACEBOOKFEED = function (fbId: string, accessToken:string) {
    return 'https://graph.facebook.com/v2.9/'+`${fbId}`+'/posts?access_token='+`${accessToken}`;
  };

  /*
  $ curl --request GET 
 --url 'https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=popular'
 --header 'authorization: OAuth oauth_consumer_key="consumer-key-for-app", 
 oauth_nonce="generated-nonce", oauth_signature="generated-signature", 
 oauth_signature_method="HMAC-SHA1", oauth_timestamp="generated-timestamp", 
 oauth_token="access-token-for-authed-user", oauth_version="1.0"'
 */
  public static TWITTER_NAME = '';
  public static GET_TWITTERFEED = function (name: string) {
    return 'https://api.twitter.com/1.1/search/tweets.json?q='+`${name}`+'&result_type=popular';
  };

  
  public static RESOURCES_URL = AppConstants.QDMP_URI + 'resources';
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
