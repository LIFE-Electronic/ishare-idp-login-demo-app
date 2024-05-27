import getBaseUrl from "./getBaseUrl";

const getRedirectUrl = () => {
  return getBaseUrl() + "/code";
};

export default getRedirectUrl;
