export const cleanDomain = (domain) => {
  if (!domain) {
    return domain;
  }
  return domain
    ?.replace(" ", "")
    ?.replace("https://", "")
    ?.replace("http://", "")
    ?.replace("www.", "");
};
export const getDomain = (host) => {
  let domain = "hellospace.us";
  if (
    host &&
    !host.includes("localhost") &&
    !host.includes("vercel") &&
    !host.includes("amplifyapp.com") &&
    !host.includes("amplifytest")
  ) {
    domain = cleanDomain(host);
  }
  return domain;
};
const checkDomain = (domain) => {
  if (
    domain &&
    !domain.includes("localhost") &&
    !domain.includes("vercel") &&
    !domain.includes("amplifyapp.com") &&
    !domain.includes("amplifytest")
  ) {
    return true;
  } else {
    return false;
  }
};

export const getProjectId = (obj) => {
  if (!obj || (Object.keys(obj).length === 0 && obj.constructor === Object)) {
    return null;
  }
  const emptyKey = Object.keys(obj).find((key) => obj[key] === "");
  if (emptyKey) {
    return emptyKey;
  }
  return null;
};

export const callBackendApi = async ({ domain, query = null, type = "" }) => {
  const isTestLink = checkDomain(domain);
  const project_id = getProjectId(query);
  let baseURL = null;
  if (isTestLink && project_id) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/project_data/${project_id}/data`;
  } else if (isTestLink && !project_id) {
    baseURL = `${process.env.NEXT_PUBLIC_SITE_MANAGER}/api/public/industry_template_data/${process.env.NEXT_PUBLIC_INDUSTRY_ID}/${process.env.NEXT_PUBLIC_TEMPLATE_ID}/data`;
  } else if (!isTestLink && !project_id) {
    return (baseURL = null);
  }
  try {
    const response = await fetch(`${baseURL}/${type}`);
    if (!response.ok) {
      const status = response.status;
      const statusText = response.statusText;
      const responseBody = await response.text();
      const error = new Error(`HTTP Error: ${status} - ${statusText}`);
      error.status = status;
      error.statusText = statusText;
      error.requestedURL = response?.url;
      error.responseBody = responseBody;
      error.stack = error.stack;
      if (
        status === 400 &&
        statusText === "Bad Request" &&
        error.responseBody?.includes("check your parameter")
      ) {
        return {
          error: {
            status: status,
            statusText: statusText,
            responseBody: responseBody,
          },
        };
      }
      throw error;
    }
    const responseData = await response.json();

    return await responseData;
  } catch (err) {
    console.log("🚀 ~ callBakendApi ~ err:", err);
    return {
      error: {
        status: err?.status,
        statusText: err?.statusText,
        responseBody: err?.responseBody,
      },
    };
  }
};
export const getImagePath = ({ domain, query = null }) => {
  const isTestLink = checkDomain(domain);
  const project_id = getProjectId(query);
  let image_path = null;
  if (isTestLink && project_id) {
    image_path = `project_images/${project_id}`;
  } else if (isTestLink && !project_id) {
    image_path = `industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
  } else if (!isTestLink && !project_id) {
    image_path = null;
  }
  return image_path;
};
