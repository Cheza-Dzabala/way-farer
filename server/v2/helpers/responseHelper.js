export default (res, status, bodyStatus, data) => res.status(status).json({
  status: bodyStatus,
  data,
});
