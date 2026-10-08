const STORAGE_KEY = "sk_visitor_id";

export const getVisitorId = (): string => {
  let visitorId = localStorage.getItem(STORAGE_KEY);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, visitorId);
  }

  return visitorId;
};