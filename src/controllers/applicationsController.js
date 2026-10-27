const service = require('../services/applicationsService');

const postApplication = async (req, res) => {
  const id = await service.addApplication(req.user.id, req.body);
  res.status(201).json({ status: 'success', message: 'Lamaran berhasil dikirim', data: { id } });
};

const getApplications = async (req, res) => {
  const applications = await service.getApplications();
  res.json({ status: 'success', data: { applications } });
};

const getApplicationById = async (req, res) => {
  const application = await service.getApplicationById(req.params.id);
  res.json({ status: 'success', data: application });
};

const getApplicationsByUser = async (req, res) => {
  const applications = await service.getApplicationsByUserId(req.params.userId);
  res.json({ status: 'success', data: { applications } });
};

const getApplicationsByJob = async (req, res) => {
  const applications = await service.getApplicationsByJobId(req.params.jobId);
  res.json({ status: 'success', data: { applications } });
};

const putApplicationById = async (req, res) => {
  await service.editApplicationStatusById(req.params.id, req.body.status);
  res.json({ status: 'success', message: 'Status lamaran berhasil diperbarui' });
};

const deleteApplicationById = async (req, res) => {
  await service.deleteApplicationById(req.params.id);
  res.json({ status: 'success', message: 'Lamaran berhasil dihapus' });
};

module.exports = {
  postApplication,
  getApplications,
  getApplicationById,
  getApplicationsByUser,
  getApplicationsByJob,
  putApplicationById,
  deleteApplicationById,
};
