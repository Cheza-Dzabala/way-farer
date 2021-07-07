export default (res, status, bodyStatus, data) => res.status(status).json({
  status,
  message: bodyStatus,
  data,
});
