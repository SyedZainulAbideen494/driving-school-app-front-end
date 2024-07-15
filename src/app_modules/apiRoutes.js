const API_URL = 'https://3ec6953aff09c714794e5ef49752f1f5.serveo.net';

export const API_ROUTES = {
  login: `${API_URL}/login`,
  signup: `${API_URL}/signup`,
  displayImg: `${API_URL}`,
  fetchUserDetails: `${API_URL}/api/user`,
  displayDrivingSchools: `${API_URL}/api/driving-schools`,
  displayPromotions: `${API_URL}/api/promotions`,
  schooldetailsId: `${API_URL}/school`,
  recordedClasses: `${API_URL}/recordedClasses`,
  coursesBySchool: `${API_URL}/courses`,
  bookAppointment: `${API_URL}/api/appointments`,
  requestDrivingSchool: `${API_URL}/api/driving-schools/request`,
  fetchAdminSchools: `${API_URL}/api/user_data_and_schools`,
  getMySchoolsBtn: `${API_URL}/api/user_data/school/btn`,
  appoinemtns: `${API_URL}/api/appointments`,
  checkSchoolOwnership: `${API_URL}/api/checkSchoolOwnership`,
  appoimnetComplete: `${API_URL}/api/appointments/complete`,
  updateSchool: `${API_URL}/updateSchool`,
  addCourses: `${API_URL}/api/add/courses`,
  addClasses: `${API_URL}/api/add/classes`,
  runAds: `${API_URL}/ads/run`,
  fetchNotifications: `${API_URL}/fetchNotifications`,
  fetchAdFunds: `${API_URL}/api/getCurrentFunds`,
  getUserAds: `${API_URL}/api/user/getAds`,
  addFunds: `${API_URL}/create-checkout-session`
};
