const service = require('../services/jobsService');

const postJob = async (req, res) => {
  const id = await service.addJob(req.body);
  res.status(201).json({ status: 'success', message: 'Job berhasil ditambahkan', data: { id } });
};

const getJobs = async (req, res) => {
  const jobs = await service.getJobs({
    title: req.query.title,
    companyName: req.query['company-name'],
  });
  res.json({ status: 'success', data: { jobs } });
};

const getJobById = async (req, res) => {
  const job = await service.getJobById(req.params.id);
  res.json({ status: 'success', data: job });
};

const getJobsByCompany = async (req, res) => {
  const jobs = await service.getJobsByCompanyId(req.params.companyId);
  res.json({ status: 'success', data: { jobs } });
};

const getJobsByCategory = async (req, res) => {
  const jobs = await service.getJobsByCategoryId(req.params.categoryId);
  res.json({ status: 'success', data: { jobs } });
};

const putJobById = async (req, res) => {
  await service.editJobById(req.params.id, req.body);
  res.json({ status: 'success', message: 'Job berhasil diperbarui' });
};

const deleteJobById = async (req, res) => {
  await service.deleteJobById(req.params.id);
  res.json({ status: 'success', message: 'Job berhasil dihapus' });
};

module.exports = {
  postJob,
  getJobs,
  getJobById,
  getJobsByCompany,
  getJobsByCategory,
  putJobById,
  deleteJobById,
};
