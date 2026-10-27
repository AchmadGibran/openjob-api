const service = require('../services/companiesService');

const postCompany = async (req, res) => {
  const id = await service.addCompany(req.body);
  res.status(201).json({ status: 'success', message: 'Company berhasil ditambahkan', data: { id } });
};

const getCompanies = async (req, res) => {
  const companies = await service.getCompanies();
  res.json({ status: 'success', data: { companies } });
};

const getCompanyById = async (req, res) => {
  const company = await service.getCompanyById(req.params.id);
  res.json({ status: 'success', data: company });
};

const putCompanyById = async (req, res) => {
  await service.editCompanyById(req.params.id, req.body);
  res.json({ status: 'success', message: 'Company berhasil diperbarui' });
};

const deleteCompanyById = async (req, res) => {
  await service.deleteCompanyById(req.params.id);
  res.json({ status: 'success', message: 'Company berhasil dihapus' });
};

module.exports = {
  postCompany, getCompanies, getCompanyById, putCompanyById, deleteCompanyById,
};
